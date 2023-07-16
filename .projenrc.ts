import { typescript } from "projen";
import { PackageVersions, CI_Versions } from "./const";
import { ConfigureTasks } from "./projenrc/ConfigureTasks";
import { CdktfWorkflows } from "./projenrc/workflows/CdktfWorkflows";
import { K8sValidate } from "./projenrc/workflows/K8sValidate";
import { UpdateCharts } from "./projenrc/workflows/UpdateCharts";
import { UpdatePackages } from "./projenrc/workflows/UpdatePackages";

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
    dirs: ["src", "projen"],
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

ConfigureTasks(project);

// Add workflows
UpdatePackages(project);
UpdateCharts(project);
K8sValidate(project);
CdktfWorkflows(project);

project.synth();
