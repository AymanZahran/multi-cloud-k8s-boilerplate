import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";
import {
  CI_Versions,
  Environment,
  AzureTerraformClientId,
  AzureSubscriptionId,
  AzureTenantId,
  AwsAccessKey, FreezeFlag,
} from "../../src/const";

export function CdktfWorkflows(project: typescript.TypeScriptAppProject) {
  for (const context of ["build", "deploy"]) {
    for (const env of Object.values(Environment)) {
      const cdktf_workflow = new GithubWorkflow(
        project.github!,
        "cdktf-" + env + "-" + context,
      );
      if (context === "build") {
        cdktf_workflow.on({
          pullRequest: {
            branches: ["master"],
          },
        });
      } else {
        cdktf_workflow.on({
          push: {
            branches: ["master"],
          },
        });
      }
      cdktf_workflow.addJob(context, {
        name: "cdktf-" + env + "-" + context,
        runsOn: ["ubuntu-latest"],
        permissions: {
          contents: JobPermission.READ,
        },
        env: {
          TF_API_TOKEN: "${{ secrets.TF_API_TOKEN }}",
          AWS_ACCESS_KEY_ID: AwsAccessKey[env],
          AWS_SECRET_ACCESS_KEY:
            "${{ secrets." + env + "_AWS_SECRET_ACCESS_KEY }}",
          ARM_CLIENT_ID: AzureTerraformClientId[env],
          ARM_CLIENT_SECRET: "${{ secrets." + env + "_AZURE_CLIENT_SECRET }}",
          ARM_TENANT_ID: AzureTenantId[env],
          ARM_SUBSCRIPTION_ID: AzureSubscriptionId[env],
          stack: env,
          context: context,
          FREEZE: FreezeFlag,
        },
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
          {
            name: "Use Node.js " + CI_Versions.node,
            uses: "actions/setup-node@v3",
            with: {
              "node-version": CI_Versions.node,
              cache: "npm",
            },
          },
          {
            name: "Install cdktf-cli v" + CI_Versions.cdktf_cli,
            run: "npm install -g cdktf-cli@" + CI_Versions.cdktf_cli,
          },
          {
            name: "Install Terraform v" + CI_Versions.terraform,
            uses: "hashicorp/setup-terraform@v2",
            with: {
              terraform_version: CI_Versions.terraform,
            },
          },
          {
            name: "Install dependencies",
            run: "npx projen install:ci",
          },
          {
            name: "Install Terraform Providers and Modules",
            run: "npx projen cdktf-get",
          },
          {
            name: "Set Terraform Token",
            run:
              "mkdir -p ~/.terraform.d\n" +
              "echo '{\n" +
              '  "credentials": {\n' +
              '    "app.terraform.io": {\n' +
              '      "token": "${{ secrets.TF_API_TOKEN }}"\n' +
              "    }\n" +
              "  }\n" +
              "}' > ~/.terraform.d/credentials.tfrc.json",
          },
          {
            name: "AZ Login",
            run:
              "az login --service-principal -u " +
              AzureTerraformClientId[env] +
              " -p " +
              "${{ secrets." +
              env +
              "_AZURE_CLIENT_SECRET }}" +
              " --tenant " +
              AzureTenantId[env] +
              "\n" +
              "az account set --subscription " +
              AzureSubscriptionId[env],
          },
          {
            if: "env.context == 'build'",
            name: "Terraform Plan",
            run: 'cdktf plan ${{ env.stack }};'
          },
          {
            if: "env.context == 'deploy'",
            name: "Terraform Apply",
            run: 'if [ "${{ env.FREEZE }}" == "true" ]; then echo "Freeze Period.. Deployment will be cancelled" && exit 1; \n' +
                 // 'else cdktf deploy ${{ env.stack }} --auto-approve; fi',
                 'else echo "cdktf deploy will be applied here"; fi',
          },
          {
            name: "Comment on the PR",
            uses: "actions/github-script@0.9.0",
            if: "github.event_name == 'pull_request'",
            env: {
              PLAN: "terraform\\n${{ steps.plan.outputs.stdout }}",
            },
            with: {
              "github-token": "${{ secrets.GH_COMMENT_TOKEN }}",
              script:
                "const output = `#### Terraform Plan 📖\\`${{ steps.plan.outcome }}\\`\n" +
                "<details><summary>Show Plan</summary>\n" +
                "\\`\\`\\`${process.env.PLAN}\\`\\`\\`\n" +
                "</details>\n" +
                "*Pusher: @${{ github.actor }}, Action: \\`${{ github.event_name }}\\`, Working Directory: \\`${{ env.tf_actions_working_dir }}\\`, Workflow: \\`${{ github.workflow }}\\`*`;\n" +
                "github.issues.createComment({\n" +
                "  issue_number: context.issue.number,\n" +
                "  owner: context.repo.owner,\n" +
                "  repo: context.repo.repo,\n" +
                "  body: output\n" +
                "})",
            },
          },
        ],
      });
    }
  }
}
