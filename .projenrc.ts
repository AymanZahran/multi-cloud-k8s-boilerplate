import { typescript } from "projen";
import { PackageVersions, Scripts } from "./const";

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
  mutableBuild: false, // Automatically update files modified by build()
  pullRequestTemplate: true,
  pullRequestTemplateContents: [
    "---",
    "## What is the goal of this PR?",
    "",
    "## What are the changes?",
    "",
    "## How can this be tested?",
    "",
    "## Related issues",
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

  eslintOptions: {
    prettier: true,
    dirs: ["src"],
  },

  deps: [
    "constructs@^" + PackageVersions.constructs,
    "cdktf@^" + PackageVersions.cdktf,
    "cdktf-cli@^" + PackageVersions.cdktf_cli,
    "@cdktf/provider-aws@^" + PackageVersions.provider_aws,
    "@cdktf/provider-azurerm@^" + PackageVersions.provider_azurerm,
    "@cdktf/provider-google@^" + PackageVersions.provider_google,
    "@cdktf/provider-kubernetes@^" + PackageVersions.provider_kubernetes,
    "cdk8s@^" + PackageVersions.cdk8s,
    "cdk8s-cli@^" + PackageVersions.cdk8s_cli,
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

// Add scripts for cdktf and cdk8s
const scripts = {
  "cdktf-cli-install": Scripts.cdktf_cli_install,
  "cdktf-get": Scripts.cdktf_get,
  "cdktf-synth": Scripts.cdktf_synth,
  "cdktf-deploy": Scripts.cdktf_deploy,
  "cdktf-upgrade": Scripts.cdktf_upgrade,
  "cdktf-upgrade:next": Scripts.cdktf_upgrade_next,

  "cdk8s-cli-install": Scripts.cdk8s_cli_install,
  "cdk8s-synth": Scripts.cdk8s_synth,
  "cdk8s-diff": Scripts.cdk8s_diff,
  "cdk8s-import": Scripts.cdk8s_import,
  "cdk8s-upgrade": Scripts.cdk8s_upgrade,
  "cdk8s-upgrade:next": Scripts.cdk8s_upgrade_next,
};

// create array of objects called tasks
const tasks: any = {};
for (const [key, value] of Object.entries(scripts)) {
    tasks[key] = project.addTask(key, {
      exec: value,
      description: key,
    });
}

project.compileTask.spawn(tasks["cdktf-get"]);
project.compileTask.spawn(tasks["cdktf-synth"]);
project.compileTask.exec(
  "./scripts/add_helm_repos.sh"
);
project.compileTask.spawn(tasks["cdk8s-synth"]);

project.synth();
