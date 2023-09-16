import { typescript } from "projen";
import { ConfigureTasks } from "./projenrc/ConfigureTasks";
import { CdktfWorkflows } from "./projenrc/workflows/CdktfWorkflows";
import { K8sValidateWorkflows } from "./projenrc/workflows/K8sValidate";
import { UpgradeCharts } from "./projenrc/workflows/UpgradeCharts";
import { Upgradepackages } from "./projenrc/workflows/UpgradePackages";
import { PackageVersions, CI_Versions } from "./src/properties/const";

const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "master",
  name: "multi-cloud",
  projenrcTs: true,
  authorName: "Ayman Zahran",
  authorEmail: "ayman@aymanzahran.com",
  gitpod: true,
  licensed: true,
  license: "Apache-2.0",
  readme: {
    filename: "README.md",
  },
  release: false,
  vscode: true,
  depsUpgrade: true,
  autoApproveOptions: {
    label: "auto-approve",
  },
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

  tsconfig: {
    compilerOptions: {
      rootDir: ".",
    },
  },

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
    "@cdktf/provider-kubernetes@^" + PackageVersions.provider_kubernetes,
    "@cdktf/provider-helm@^" + PackageVersions.provider_helm,
    "@cdktf/provider-null@^" + PackageVersions.provider_null,
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
    ".env",
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
    "!/kubernetes",
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
K8sValidateWorkflows(project);
CdktfWorkflows(project);

project.synth();
