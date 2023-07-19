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
  cdk8s_get:
    "rm -rf kubernetes/dev/* && cp dist/dev/* kubernetes/dev/ " +
    "&& rm -rf kubernetes/staging/* && cp dist/staging/* kubernetes/staging/ " +
    "&& rm -rf kubernetes/prod/* && cp dist/prod/* kubernetes/prod/",
  cdk8s_diff: "cdk8s diff",
  cdk8s_import: "cdk8s import",
  cdk8s_upgrade: "npm i cdk8s@latest cdk8s-cli@latest",
  cdk8s_upgrade_next: "npm i cdk8s@next cdk8s-cli@next",
};

export const HelmChartFeatureFlags: any = {
  argo_cd: true,
  argo_image_updater: true,
  argo_notifications: true,
  argo_rollouts: true,
  argo_workflows: true,
  cert_manager: true,
  cluster_autoscaler: true,
  consul: true,
  crossplane: true,
  kube_state_metrics: true,
  metrics_server: true,
  kube_prometheus_stack: true,
  secrets_store_csi_driver: true,
  tekton_pipeline: true,
  vault: true,
};

export const HelmChartVersions: any = {
  argo_cd: {
    dev: "5.39.0",
    staging: "5.39.0",
    prod: "5.39.0",
  },
  argocd_image_updater: {
    dev: "0.9.1",
    staging: "0.9.1",
    prod: "0.9.1",
  },
  argo_notifications: {
    dev: "1.8.1",
    staging: "1.8.1",
    prod: "1.8.1",
  },
  argo_rollouts: {
    dev: "2.31.0",
    staging: "2.31.0",
    prod: "2.31.0",
  },
  argo_workflows: {
    dev: "0.31.0",
    staging: "0.31.0",
    prod: "0.31.0",
  },
  cert_manager: {
    dev: "1.12.2",
    staging: "1.12.2",
    prod: "1.12.2",
  },
  cluster_autoscaler: {
    dev: "9.29.1",
    staging: "9.29.1",
    prod: "9.29.1",
  },
  consul: {
    dev: "1.1.2",
    staging: "1.1.2",
    prod: "1.1.2",
  },
  crossplane: {
    dev: "1.12.2",
    staging: "1.12.2",
    prod: "1.12.2",
  },
  kube_state_metrics: {
    dev: "5.9.0",
    staging: "5.9.0",
    prod: "5.9.0",
  },
  metrics_server: {
    dev: "3.10.0",
    staging: "3.10.0",
    prod: "3.10.0",
  },
  kube_prometheus_stack: {
    dev: "48.1.1",
    staging: "48.1.1",
    prod: "48.1.1",
  },
  secrets_store_csi_driver: {
    dev: "1.3.4",
    staging: "1.3.4",
    prod: "1.3.4",
  },
  tekton_pipeline: {
    dev: "0.6.4",
    staging: "0.6.4",
    prod: "0.6.4",
  },
  vault: {
    dev: "0.25.0",
    staging: "0.25.0",
    prod: "0.25.0",
  },
};

export const HelmChartValues: any = {
  argo_cd: {
    dev: {},
    staging: {},
    prod: {},
  },
  argocd_image_updater: {
    dev: {},
    staging: {},
    prod: {},
  },
  argo_notifications: {
    dev: {},
    staging: {},
    prod: {},
  },
  argo_rollouts: {
    dev: {},
    staging: {},
    prod: {},
  },
  argo_workflows: {
    dev: {},
    staging: {},
    prod: {},
  },
  cert_manager: {
    dev: {},
    staging: {},
    prod: {},
  },
  cluster_autoscaler: {
    dev: {},
    staging: {},
    prod: {},
  },
  consul: {
    dev: {},
    staging: {},
    prod: {},
  },
  crossplane: {
    dev: {},
    staging: {},
    prod: {},
  },
  kube_state_metrics: {
    dev: {},
    staging: {},
    prod: {},
  },
  metrics_server: {
    dev: {},
    staging: {},
    prod: {},
  },
  kube_prometheus_stack: {
    dev: {},
    staging: {},
    prod: {},
  },
  secrets_store_csi_driver: {
    dev: {},
    staging: {},
    prod: {},
  },
  tekton_pipeline: {
    dev: {},
    staging: {},
    prod: {},
  },
  vault: {
    dev: {},
    staging: {},
    prod: {},
  },
};

export const PackageVersions: any = {
  // Readonly static constants
  constructs: "10.2.52",
  cdktf: "0.17.1",
  provider_aws: "16.0.3",
  provider_azurerm: "9.0.3",
  provider_google: "7.0.11",
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

export const TerraformVariables: any = {
  eks_vpc_name: {
    dev: "dev-eks-vpc",
    staging: "staging-eks-vpc",
    prod: "prod-eks-vpc",
  },
  eks_vpc_cidr_block: {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  },
  eks_cluster_name: {
    dev: "dev-eks-cluster",
    staging: "staging-eks-cluster",
    prod: "prod-eks-cluster",
  },
  eks_enable_dns_hostnames: {
    dev: true,
    staging: true,
    prod: true,
  },
  eks_number_of_subnets: {
    dev: 3,
    staging: 3,
    prod: 3,
  },
  eks_control_plane_version: {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  },
  eks_data_plane_version: {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  },
  eks_control_plane_role_arn: {
    dev: "arn:aws:iam::123456789012:role/eks-control-plane-role",
    staging: "arn:aws:iam::123456789012:role/eks-control-plane-role",
    prod: "arn:aws:iam::123456789012:role/eks-control-plane-role",
  },
  eks_data_plane_role_arn: {
    dev: "arn:aws:iam::123456789012:role/eks-data-plane-role",
    staging: "arn:aws:iam::123456789012:role/eks-data-plane-role",
    prod: "arn:aws:iam::123456789012:role/eks-data-plane-role",
  },
  eks_node_group_name: {
    dev: "dev-eks-node-group",
    staging: "staging-eks-node-group",
    prod: "prod-eks-node-group",
  },
  eks_node_group_min_size: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  eks_node_group_max_size: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  eks_node_group_desired_size: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  aks_cluster_name: {
    dev: "dev-aks-cluster",
    staging: "staging-aks-cluster",
    prod: "prod-aks-cluster",
  },
  aks_resource_group_name: {
    dev: "dev-aks-cluster",
    staging: "staging-aks-cluster",
    prod: "prod-aks-cluster",
  },
  aks_vnet_cidr_block: {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  },
  aks_subnet_cidr_block: {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  },
  aks_vnet_name: {
    dev: "dev-vnet-aks-cluster",
    staging: "staging-vnet-aks-cluster",
    prod: "prod-vnet-aks-cluster",
  },
  aks_subnet_name: {
    dev: "dev-subnet-aks-cluster",
    staging: "staging-subnet-aks-cluster",
    prod: "prod-subnet-aks-cluster",
  },
  aks_control_plane_version: {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  },
  aks_data_plane_version: {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  },
  aks_node_pool_name: {
    dev: "dev-aks-node-pool",
    staging: "staging-aks-node-pool",
    prod: "prod-aks-node-pool",
  },
  aks_node_pool_vm_size: {
    dev: "Standard_D2_v2",
    staging: "Standard_D2_v2",
    prod: "Standard_D2_v2",
  },
  aks_node_pool_min_count: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  aks_node_pool_max_count: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  aks_node_pool_count: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
};
