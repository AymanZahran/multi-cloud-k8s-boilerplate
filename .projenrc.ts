import { typescript } from "projen";
import { ConfigureTasks } from "./projenrc/ConfigureTasks";
import { CdktfWorkflows } from "./projenrc/workflows/CdktfWorkflows";
import { K8sValidate } from "./projenrc/workflows/K8sValidate";
import { UpgradeCharts } from "./projenrc/workflows/UpgradeCharts";
import { Upgradepackages } from "./projenrc/workflows/UpgradePackages";
import { PackageVersions, CI_Versions } from "./src/const";

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
    "!/cdk8s.yaml",
    "!dist/argo-cd.k8s.yaml",
    "!dist/argo-image-updater.k8s.yaml",
    "!dist/argo-notifications.k8s.yaml",
    "!dist/argo-rollouts.k8s.yaml",
    "!dist/argo-workflows.k8s.yaml",
    "!dist/cert-manager.k8s.yaml",
    "!dist/cluster-autoscaler.k8s.yaml",
    "!dist/consul.k8s.yaml",
    "!dist/crossplane.k8s.yaml",
    "!dist/kube-state-metrics.k8s.yaml",
    "!dist/metrics-server.k8s.yaml",
    "!dist/prometheus.k8s.yaml",
    "!dist/secret-store-driver.k8s.yaml",
    "!dist/tekton.k8s.yaml",
    "!dist/vault.k8s.yaml",
  ],
  gitIgnoreOptions: {
    filterEmptyLines: true,
    filterCommentLines: true,
  },
});

ConfigureTasks(project);

// Add workflows
Upgradepackages(project);
UpgradeCharts(project);
K8sValidate(project);
CdktfWorkflows(project);

project.synth();
