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
  provider_helm: "7.0.0",
  provider_null: "7.0.0",
  cdk8s: "2.7.77",
  cdk8s_plus: "0.33.0",
  dotenv: "16.1.4",
};

export const CI_Versions: any = {
  terraform: "1.5.3",
  node: "19.x",
  cdktf_cli: "0.17.0",
  cdk8s_cli: "2.3.0",
};

export const TerraformRemoteBackendHostName = "app.terraform.io";
export const TerraformRemoteBackendOrganization = "multi-cloud-pipelines";

export enum Providers {
  eks = "eks",
  aks = "aks",
}

export const AwsAccountId: any = {
  dev: "903664048601",
  staging: "903664048601",
  prod: "903664048601",
};
export const AwsAccessKey: any = {
  dev: "AKIA5EZUTDHMR45HQYKA",
  staging: "AKIA5EZUTDHMR45HQYKA",
  prod: "AKIA5EZUTDHMR45HQYKA",
};
export const AzureTenantId: any = {
  dev: "3e5e67ad-2e8c-4a0a-b170-8fe996eebec0",
  staging: "3e5e67ad-2e8c-4a0a-b170-8fe996eebec0",
  prod: "3e5e67ad-2e8c-4a0a-b170-8fe996eebec0",
};
export const AzureSubscriptionId: any = {
  dev: "7feba40e-3797-4714-bffd-788ab08a6cde",
  staging: "de40a960-a7dd-4c03-ad60-9a6c07c93ed2",
  prod: "65d113fc-bfd6-4cdb-a308-06fce27d592a",
};
export const AzureTerraformClientId: any = {
  dev: "ff9f2cd0-a91d-4f34-97ac-6670bb08cc05",
  staging: "ff9f2cd0-a91d-4f34-97ac-6670bb08cc05",
  prod: "ff9f2cd0-a91d-4f34-97ac-6670bb08cc05",
};
export const AzureCrossPlaneClientId: any = {
  dev: "b266af97-6923-4d9a-b754-3dc573a6dbdc",
  staging: "b266af97-6923-4d9a-b754-3dc573a6dbdc",
  prod: "b266af97-6923-4d9a-b754-3dc573a6dbdc",
};

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
  west_us = "westus",
}

export const RepoURL =
  "https://github.com/AymanZahran/multi-cloud-k8s-boilerplate";
export const KubernetesDir = "kubernetes";
export const KubernetesManagementDir = KubernetesDir + "/management/";
