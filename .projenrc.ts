import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";
import { PackageVersions, Scripts, CI_Versions } from "./const";

const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "master",
  name: "multi-cloud",
  projenrcTs: true,
  authorName: "Ayman Zahran",
  authorEmail: "ayman@aymanzahran.com",
  gitpod: true,
  release: true,
  releaseToNpm: true,
  npmRegistryUrl: "https://www.npmjs.com/~ayman.zahran",
  vscode: true,
  depsUpgrade: true,
  autoApproveUpgrades: false, // Set false to manually approve upgrades
  buildWorkflow: true, // Enable build workflow
  mutableBuild: true, // Automatically update files modified by build
  pullRequestTemplate: true,
  pullRequestTemplateContents: [
    "---",
    "## What is the goal of this PR?",
    "",
    "## What are the changes?",
    "",
    "## How can this be tested?",
    "",
    "## Related issues: ",
    "",
    "## Checklist",
    "- [ ] I have added tests to cover my changes.",
    "- [ ] All new and existing tests passed.",
    "- [ ] My code follows the code style of this project.",
    "- [ ] I have updated the documentation accordingly.",
    "- [ ] I have read the **CONTRIBUTING** document.",
    "",
  ],

  githubOptions: {
    mergify: false,
    mergifyOptions: {},
    workflows: true,
    pullRequestLint: true,
    pullRequestLintOptions: {
      semanticTitle: true,
      semanticTitleOptions: {
        types: ["feat", "fix", "chore"],
      },
    },
  },

  eslint: true,
  eslintOptions: {
    prettier: true,
    dirs: ["src"],
  },

  deps: [
    "constructs@^" + PackageVersions.constructs,
    "cdktf@^" + PackageVersions.cdktf,
    "cdktf-cli@^" + CI_Versions.cdktf_cli,
    "@cdktf/provider-aws@^" + PackageVersions.provider_aws,
    "@cdktf/provider-azurerm@^" + PackageVersions.provider_azurerm,
    "@cdktf/provider-google@^" + PackageVersions.provider_google,
    "@cdktf/provider-kubernetes@^" + PackageVersions.provider_kubernetes,
    "cdk8s@^" + PackageVersions.cdk8s,
    "cdk8s-cli@^" + CI_Versions.cdk8s_cli,
    "cdk8s-plus@^" + PackageVersions.cdk8s_plus,
    "dotenv@^" + PackageVersions.dotenv,
  ],
  description: "This is a multi-cloud project",
  devDeps: [] /* Build dependencies for this module. */,
  packageName: "multi-cloud" /* The "name" in package.json. */,
  gitignore: [
    ".DS_Store",
    ".idea",
    ".vscode",
    "*.d.ts",
    "*.js,",
    "cdktf.log",
    "*terraform.*.tfstate*",
    ".gen",
    ".terraform",
    "tsconfig.tsbuildinfo",
    "!jest.config.js",
    "!setup.js",
    "!/dist/",
    "!/cdk8s.yaml",
  ],
});

// Add cdktf and cdk8s Tasks
const scripts = {
  "cdktf-cli-install": Scripts.cdktf_cli_install,
  "cdktf-get": Scripts.cdktf_get,
  "cdktf-synth": Scripts.cdktf_synth,
  "cdktf-deploy": Scripts.cdktf_deploy,
  "cdktf-upgrade": Scripts.cdktf_upgrade,
  "cdktf-upgrade:next": Scripts.cdktf_upgrade_next,
  "cdk8s-add-helm-repos": Scripts.cdk8s_add_helm_repos,
  "cdk8s-cli-install": Scripts.cdk8s_cli_install,
  "cdk8s-synth": Scripts.cdk8s_synth,
  "cdk8s-diff": Scripts.cdk8s_diff,
  "cdk8s-import": Scripts.cdk8s_import,
  "cdk8s-upgrade": Scripts.cdk8s_upgrade,
  "cdk8s-upgrade:next": Scripts.cdk8s_upgrade_next,
};

const tasks: any = {};
for (const [key, value] of Object.entries(scripts)) {
  tasks[key] = project.addTask(key, {
    exec: value,
    description: key,
  });
}

project.compileTask.reset();
const compile_tasks = [
  tasks["cdktf-get"],
  tasks["cdktf-synth"],
  tasks["cdk8s-add-helm-repos"],
  tasks["cdk8s-synth"],
];
for (const task of compile_tasks) project.compileTask.spawn(task);

// Create K8s Validate Workflow
const k8s_validate = new GithubWorkflow(project.github!, "k8s-validate");
k8s_validate.on({
  pullRequest: {
    branches: ["master"],
  },
});
k8s_validate.addJob("build", {
  runsOn: ["ubuntu-latest"],
  permissions: {
    pullRequests: JobPermission.WRITE,
    actions: JobPermission.WRITE,
    contents: JobPermission.WRITE,
  },
  steps: [
    {
      name: "Checkout",
      uses: "actions/checkout@v3",
    },
    {
      name: "Install Kubeval",
      run:
        "wget https://github.com/instrumenta/kubeval/releases/latest/download/kubeval-linux-amd64.tar.gz\n" +
        "tar xf kubeval-linux-amd64.tar.gz\n" +
        "cp kubeval /usr/local/bin",
    },
    {
      name: "Validate K8s Manifests",
      run:
        'echo "Running kubeval validations..."\n' +
        'if ! [ -x "$(command -v kubeval)" ]; then\n' +
        "  echo 'Error: kubeval is not installed.' >&2\n" +
        "  exit 1\n" +
        "fi\n" +
        "if kubeval --ignore-missing-schemas dist/*; then\n" +
        '  echo "Static analysis found no problems."\n' +
        "  exit 0\n" +
        "else\n" +
        '  echo 1>&2 "Static analysis found violations that need to be fixed."\n' +
        "  exit 1\n" +
        "fi",
    },
  ],
});

// Create cdktf build and deploy for dev, staging and prod
for (const context of ["build", "deploy"]) {
  for (const env of ["dev", "staging", "prod"]) {
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
    cdktf_workflow.addJob("build", {
      runsOn: ["ubuntu-latest"],
      permissions: {
        pullRequests: JobPermission.WRITE,
        actions: JobPermission.WRITE,
        contents: JobPermission.WRITE,
      },
      env: {
        TF_API_TOKEN: "${{ secrets.TF_API_TOKEN }}",
        AWS_ACCESS_KEY_ID: "${{ secrets.AWS_ACCESS_KEY_ID }}",
        AWS_SECRET_ACCESS_KEY: "${{ secrets.AWS_SECRET_ACCESS_KEY }}",
        stack: env,
        context: context,
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
          run: "yarn install",
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
          name: "Terraform Plan",
          run: 'if [ "${{ env.context }}" == "build" ]; then cdktf plan ${{ env.stack }}; fi',
          // Uncomment this line to deploy after merge to master
          // run: 'if [ "${{ env.context }}" == "build" ]; then cdktf plan ${{ env.stack }}; else cdktf deploy ${{ env.stack }} --auto-approve; fi',
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

// Create charts update workflow
const update_charts = new GithubWorkflow(project.github!, "update-charts");
update_charts.on({
  schedule: [
    {
      cron: "0 0 * * *",
    },
  ],
});
update_charts.addJob("build", {
  runsOn: ["ubuntu-latest"],
  permissions: {
    pullRequests: JobPermission.WRITE,
    actions: JobPermission.WRITE,
    contents: JobPermission.WRITE,
  },
  steps: [
    {
      name: "Checkout",
      uses: "actions/checkout@v3",
    },
    {
      name: "Add and update repos",
      run: "./scripts/add_helm_repos.sh",
    },
    {
      name: "Get latest chart versions",
      run: "./scripts/update_helm_charts.sh",
    },
  ],
});

// Create package update workflow
const update_packages = new GithubWorkflow(project.github!, "update-packages");
update_packages.on({
  schedule: [
    {
      cron: "0 0 * * *",
    },
  ],
});
update_packages.addJob("build", {
  runsOn: ["ubuntu-latest"],
  permissions: {
    pullRequests: JobPermission.WRITE,
    actions: JobPermission.WRITE,
    contents: JobPermission.WRITE,
  },
  steps: [
    {
      name: "Checkout",
      uses: "actions/checkout@v3",
    },
    {
      name: "Get latest chart versions",
      run: "./scripts/update_packages.sh",
    },
  ],
});

project.synth();
