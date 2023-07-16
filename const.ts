export class PackageVersions {
    // Readonly static constants
    public static readonly constructs = "10.2.52";
    public static readonly cdktf = "0.17.0";
    public static readonly cdktf_cli = "0.17.0";
    public static readonly provider_aws = "15.0.0";
    public static readonly provider_azurerm = "8.0.0";
    public static readonly provider_google = "7.0.11";
    public static readonly provider_kubernetes = "7.0.0";
    public static readonly cdk8s = "2.7.77";
    public static readonly cdk8s_cli = "2.2.110";
    public static readonly cdk8s_plus = "0.33.0";
    public static readonly dotenv = "16.1.4";
}

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
    public static readonly cdk8s_diff = "cdk8s diff";
    public static readonly cdk8s_import = "cdk8s import";
    public static readonly cdk8s_upgrade = "npm i cdk8s@latest cdk8s-cli@latest";
    public static readonly cdk8s_upgrade_next = "npm i cdk8s@next cdk8s-cli@next";
}
