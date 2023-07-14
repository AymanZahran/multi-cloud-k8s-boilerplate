import { typescript } from "projen";

const project = new typescript.TypeScriptAppProject({
  defaultReleaseBranch: "master",
  name: "multi-cloud",
  projenrcTs: true,
  authorName: "Ayman Zahran",
  authorEmail: "ayman@aymanzahran.com",
  gitpod: true,
  vscode: true,
  buildWorkflow: true,
  mutableBuild: false /* Automatically update files modified by build() */,

  githubOptions: {
    mergify: false,
    mergifyOptions: {},
    pullRequestLint: true,
    pullRequestLintOptions: {},
    workflows: true,
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

  scripts: {
    "cdktf get": "cdktf get",
    "cdktf synth": "cdktf synth",
    "cdktf deploy": "cdktf deploy",
    "cdktf upgrade": "npm i cdktf@latest cdktf-cli@latest",
    "cdktf upgrade:next": "npm i cdktf@next cdktf-cli@next",

    "cdk8s synth": "cdk8s synth",
    "cdk8s diff": "cdk8s diff",
    "cdk8s import": "cdk8s import",
    "cdk8s upgrade": "npm i cdk8s@latest cdk8s-cli@latest",
    "cdk8s upgrade:next": "npm i cdk8s@next cdk8s-cli@next",
  },
});

project.synth();
