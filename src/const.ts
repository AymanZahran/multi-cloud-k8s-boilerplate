export class Scripts {
  // Readonly static constants
  public static readonly cdktf_cli_install = "npm i -g cdktf-cli --force";
  public static readonly cdktf_get = "cdktf get";
  public static readonly cdktf_synth = "cdktf synth";
  public static readonly cdktf_deploy = "cdktf deploy";
  public static readonly cdktf_upgrade = "npm i cdktf@latest cdktf-cli@latest";
  public static readonly cdktf_upgrade_next = "npm i cdktf@next cdktf-cli@next";
  public static readonly cdk8s_add_helm_repos = "./scripts/add_helm_repos.sh";
  public static readonly cdk8s_cli_install = "npm i -g cdk8s-cli --force";
  public static readonly cdk8s_synth = "cdk8s synth";
  public static readonly cdk8s_get =
    "rm -rf kubernetes/dev/* && cp dist/dev/* kubernetes/dev/ " +
    "&& rm -rf kubernetes/staging/* && cp dist/staging/* kubernetes/staging/ " +
    "&& rm -rf kubernetes/prod/* && cp dist/prod/* kubernetes/prod/";
  public static readonly cdk8s_diff = "cdk8s diff";
  public static readonly cdk8s_import = "cdk8s import";
  public static readonly cdk8s_upgrade = "npm i cdk8s@latest cdk8s-cli@latest";
  public static readonly cdk8s_upgrade_next = "npm i cdk8s@next cdk8s-cli@next";
}

export class HelmChartVersions {
  public static readonly argo_cd = {
    dev: "5.39.0",
    staging: "5.39.0",
    prod: "5.39.0",
  };
  public static readonly argocd_image_updater = {
    dev: "0.9.1",
    staging: "0.9.1",
    prod: "0.9.1",
  };
  public static readonly argo_notifications = {
    dev: "1.8.1",
    staging: "1.8.1",
    prod: "1.8.1",
  };
  public static readonly argo_rollouts = {
    dev: "2.31.0",
    staging: "2.31.0",
    prod: "2.31.0",
  };
  public static readonly argo_workflows = {
    dev: "0.31.0",
    staging: "0.31.0",
    prod: "0.31.0",
  };
  public static readonly cert_manager = {
    dev: "1.12.2",
    staging: "1.12.2",
    prod: "1.12.2",
  };
  public static readonly cluster_autoscaler = {
    dev: "9.29.1",
    staging: "9.29.1",
    prod: "9.29.1",
  };
  public static readonly consul = {
    dev: "1.1.2",
    staging: "1.1.2",
    prod: "1.1.2",
  };
  public static readonly crossplane = {
    dev: "1.12.2",
    staging: "1.12.2",
    prod: "1.12.2",
  };
  public static readonly kube_state_metrics = {
    dev: "5.9.0",
    staging: "5.9.0",
    prod: "5.9.0",
  };
  public static readonly metrics_server = {
    dev: "3.10.0",
    staging: "3.10.0",
    prod: "3.10.0",
  };
  public static readonly kube_prometheus_stack = {
    dev: "48.1.1",
    staging: "48.1.1",
    prod: "48.1.1",
  };
  public static readonly secrets_store_csi_driver = {
    dev: "1.3.4",
    staging: "1.3.4",
    prod: "1.3.4",
  };
  public static readonly tekton_pipeline = {
    dev: "0.6.4",
    staging: "0.6.4",
    prod: "0.6.4",
  };
  public static readonly vault = {
    dev: "0.25.0",
    staging: "0.25.0",
    prod: "0.25.0",
  };
}

export class HelmChartValues {
  public static readonly argo_cd = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly argocd_image_updater = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly argo_notifications = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly argo_rollouts = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly argo_workflows = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly cert_manager = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly cluster_autoscaler = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly consul = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly crossplane = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly kube_state_metrics = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly metrics_server = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly kube_prometheus_stack = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly secrets_store_csi_driver = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly tekton_pipeline = {
    dev: {},
    staging: {},
    prod: {},
  };
  public static readonly vault = {
    dev: {},
    staging: {},
    prod: {},
  };
}

export class PackageVersions {
  // Readonly static constants
  public static readonly constructs = "10.2.52";
  public static readonly cdktf = "0.17.1";
  public static readonly provider_aws = "16.0.3";
  public static readonly provider_azurerm = "9.0.3";
  public static readonly provider_google = "7.0.11";
  public static readonly provider_kubernetes = "8.0.0";
  public static readonly cdk8s = "2.7.77";
  public static readonly cdk8s_plus = "0.33.0";
  public static readonly dotenv = "16.1.4";
}

export class CI_Versions {
  public static readonly terraform = "1.5.3";
  public static readonly node = "19.x";
  public static readonly cdktf_cli = "0.17.0";
  public static readonly cdk8s_cli = "2.2.110";
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

export class TerraformVariables {
  // AWS / EKS
  public static readonly eks_vpc_name = {
    dev: "dev-eks-vpc",
    staging: "staging-eks-vpc",
    prod: "prod-eks-vpc",
  };
  public static readonly eks_vpc_cidr_block = {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  };
  public static readonly eks_cluster_name = {
    dev: "dev-eks-cluster",
    staging: "staging-eks-cluster",
    prod: "prod-eks-cluster",
  };
  public static readonly eks_enable_dns_hostnames = {
    dev: true,
    staging: true,
    prod: true,
  };
  public static readonly eks_number_of_subnets = {
    dev: 3,
    staging: 3,
    prod: 3,
  };
  public static readonly eks_control_plane_version = {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  };
  public static readonly eks_data_plane_version = {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  };
  public static readonly eks_control_plane_role_arn = {
    dev: "arn:aws:iam::123456789012:role/eks-control-plane-role",
    staging: "arn:aws:iam::123456789012:role/eks-control-plane-role",
    prod: "arn:aws:iam::123456789012:role/eks-control-plane-role",
  };
  public static readonly eks_data_plane_role_arn = {
    dev: "arn:aws:iam::123456789012:role/eks-data-plane-role",
    staging: "arn:aws:iam::123456789012:role/eks-data-plane-role",
    prod: "arn:aws:iam::123456789012:role/eks-data-plane-role",
  };
  public static readonly eks_node_group_name = {
    dev: "dev-eks-node-group",
    staging: "staging-eks-node-group",
    prod: "prod-eks-node-group",
  };
  public static readonly eks_node_group_min_size = {
    dev: 2,
    staging: 2,
    prod: 2,
  };
  public static readonly eks_node_group_max_size = {
    dev: 2,
    staging: 2,
    prod: 2,
  };
  public static readonly eks_node_group_desired_size = {
    dev: 2,
    staging: 2,
    prod: 2,
  };

  // Azure / AKS
  public static readonly aks_cluster_name = {
    dev: "dev-aks-cluster",
    staging: "staging-aks-cluster",
    prod: "prod-aks-cluster",
  };
  public static readonly aks_resource_group_name = {
    dev: "dev-aks-cluster",
    staging: "staging-aks-cluster",
    prod: "prod-aks-cluster",
  };
  public static readonly aks_vnet_cidr_block = {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  };
  public static readonly aks_subnet_cidr_block = {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  };
  public static readonly aks_vnet_name = {
    dev: "dev-vnet-aks-cluster",
    staging: "staging-vnet-aks-cluster",
    prod: "prod-vnet-aks-cluster",
  };
  public static readonly aks_subnet_name = {
    dev: "dev-subnet-aks-cluster",
    staging: "staging-subnet-aks-cluster",
    prod: "prod-subnet-aks-cluster",
  };
  public static readonly aks_control_plane_version = {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  };
  public static readonly aks_data_plane_version = {
    dev: "1.24",
    staging: "1.24",
    prod: "1.24",
  };
  public static readonly aks_node_pool_name = {
    dev: "dev-aks-node-pool",
    staging: "staging-aks-node-pool",
    prod: "prod-aks-node-pool",
  };
  public static readonly aks_node_pool_vm_size = {
    dev: "Standard_D2_v2",
    staging: "Standard_D2_v2",
    prod: "Standard_D2_v2",
  };
  public static readonly aks_node_pool_min_count = {
    dev: 2,
    staging: 2,
    prod: 2,
  };
  public static readonly aks_node_pool_max_count = {
    dev: 2,
    staging: 2,
    prod: 2,
  };
  public static readonly aks_node_pool_count = {
    dev: 2,
    staging: 2,
    prod: 2,
  };
}
