export const Scripts: any = {
  cdktf_cli_install: "npm i -g cdktf-cli --force",
  cdktf_get: "cdktf get",
  cdktf_synth: "cdktf synth",
  cdktf_deploy: "cdktf deploy",
  cdktf_upgrade: "npm i cdktf@latest cdktf-cli@latest",
  cdktf_upgrade_next: "npm i cdktf@next cdktf-cli@next",
  cdk8s_add_helm_repos: "./scripts/add_helm_repos.sh",
  cdk8s_cli_install: "npm i -g cdk8s-cli --force",
  cdk8s_synth: "cdk8s synth",
  cdk8s_get: "rm -rf kubernetes/* && cp -rf dist/* kubernetes/",
  cdk8s_diff: "cdk8s diff",
  cdk8s_import: "cdk8s import",
  cdk8s_upgrade: "npm i cdk8s@latest cdk8s-cli@latest",
  cdk8s_upgrade_next: "npm i cdk8s@next cdk8s-cli@next",
};

export const PackageVersions: any = {
  // Readonly static constants
  constructs: "10.2.52",
  cdktf: "0.17.1",
  provider_aws: "16.0.3",
  provider_azurerm: "9.0.3",
  provider_kubernetes: "8.0.0",
  cdk8s: "2.7.77",
  cdk8s_plus: "0.33.0",
  dotenv: "16.1.4",
};

export const CI_Versions: any = {
  terraform: "1.5.3",
  node: "19.x",
  cdktf_cli: "0.17.0",
  cdk8s_cli: "2.2.110",
};

export enum Providers {
  eks = "eks",
  aks = "aks",
}

export enum Environment {
  dev = "dev",
  staging = "staging",
  prod = "prod",
}

export enum AwsRegion {
  us_east_1 = "us-east-1",
  us_east_2 = "us-east-2",
}

export enum AzureRegion {
  east_us = "eastus",
  east_us_2 = "eastus2",
}

export interface StackConfig {
  environment: Environment;
  region: {
    aws?: AwsRegion;
    azure?: AzureRegion;
  };
}

export const RepoURL = "https://github.com/AymanZahran/multi-cloud-boilerplate";
export const KubernetesDir = "kubernetes";
