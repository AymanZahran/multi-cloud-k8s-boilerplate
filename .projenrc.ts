import { typescript } from "projen";
import { PackageVersions } from "./const";

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
  "cdktf-cli-install": "npm i -g cdktf-cli --force",
  "cdktf-get": "cdktf get",
  "cdktf-synth": "cdktf synth",
  "cdktf-deploy": "cdktf deploy",
  "cdktf-upgrade": "npm i cdktf@latest cdktf-cli@latest",
  "cdktf-upgrade:next": "npm i cdktf@next cdktf-cli@next",

  "cdk8s-cli-install": "npm i -g cdk8s-cli --force",
  "cdk8s-synth": "cdk8s synth",
  "cdk8s-diff": "cdk8s diff",
  "cdk8s-import": "cdk8s import",
  "cdk8s-upgrade": "npm i cdk8s@latest cdk8s-cli@latest",
  "cdk8s-upgrade:next": "npm i cdk8s@next cdk8s-cli@next",
};
for (const [key, value] of Object.entries(scripts)) {
  project.addTask(key, {
    exec: value,
    description: key,
  });
}

project.compileTask.exec("npx projen cdktf-get && npx projen cdktf-synth");
project.compileTask.exec(
  "./scripts/add_helm_repos.sh && npx projen cdk8s-synth",
);

project.synth();
