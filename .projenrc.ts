import { typescript } from "projen";

const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "master",
  name: "multi-cloud",
  projenrcTs: true,
  authorName: "Ayman Zahran",
  authorEmail: "ayman@aymanzahran.com",
  gitpod: true,
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
    "constructs@^10.2.52",
    "cdktf@^0.17.0",
    "@cdktf/provider-aws@^15.0.0",
    "@cdktf/provider-azurerm@^8.0.0",
    "@cdktf/provider-google@^7.0.11",
    "@cdktf/provider-kubernetes@^7.0.0",
    "cdk8s@^2.7.77",
    "cdk8s-plus@0.33.0",
    "dotenv@^16.1.4",
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

project.compileTask.exec("npx projen cdktf-cli-install");
project.compileTask.exec("npx projen cdk8s-cli-install");
project.compileTask.exec("yarn install --check-files --frozen-lockfile");
project.compileTask.exec("npx projen cdktf-synth");
project.compileTask.exec("npx projen cdk8s-synth");

project.synth();
