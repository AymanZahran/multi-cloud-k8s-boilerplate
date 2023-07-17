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
    "rm -rf kubernetes/dev/* && cp dist/* kubernetes/dev/ " +
    "&& rm -rf kubernetes/staging/* && cp dist/* kubernetes/staging/ " +
    "&& rm -rf kubernetes/prod/* && cp dist/* kubernetes/prod/";
  public static readonly cdk8s_diff = "cdk8s diff";
  public static readonly cdk8s_import = "cdk8s import";
  public static readonly cdk8s_upgrade = "npm i cdk8s@latest cdk8s-cli@latest";
  public static readonly cdk8s_upgrade_next = "npm i cdk8s@next cdk8s-cli@next";
}

export class HelmChartVersions {
  // Readonly static constants
  public static readonly argo_cd = "5.39.0";
  public static readonly argocd_image_updater = "0.9.1";
  public static readonly argo_notifications = "1.8.1";
  public static readonly argo_rollouts = "2.31.0";
  public static readonly argo_workflows = "0.31.0";
  public static readonly cert_manager = "1.12.2";
  public static readonly cluster_autoscaler = "9.29.1";
  public static readonly consul = "1.1.2";
  public static readonly crossplane = "1.12.2";
  public static readonly kube_state_metrics = "5.9.0";
  public static readonly metrics_server = "3.10.0";
  public static readonly kube_prometheus_stack = "48.1.1";
  public static readonly secrets_store_csi_driver = "1.3.4";
  public static readonly tekton_pipeline = "0.6.4";
  public static readonly vault = "0.25.0";
}

export class PackageVersions {
  // Readonly static constants
  public static readonly constructs = "10.2.52";
  public static readonly cdktf = "0.17.0";
  public static readonly provider_aws = "15.0.0";
  public static readonly provider_azurerm = "8.0.0";
  public static readonly provider_google = "7.0.11";
  public static readonly provider_kubernetes = "7.0.0";
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
