import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { App, Fn, RemoteBackend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { config } from "dotenv";
import { AksCluster } from "./cdktf/aks/aks";

import { DefineAksVariables } from "./cdktf/aks/vars";
import { EksCluster } from "./cdktf/eks/eks";
import { DefineEksVariables } from "./cdktf/eks/vars";
import { AwsRegion, AzureRegion, Environment, StackConfig } from "./const";

config(); // Load the values from the .env file into process.env

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, configuration: StackConfig) {
    super(scope, id);

    // Create AWS Providers
    new AwsProvider(this, "AWS", {
      accessKey: process.env.AWS_ACCESS_KEY_ID || "",
      secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: configuration.region.aws,
    });

    // Create Azure Provider
    new AzurermProvider(this, "AZURE", {
      features: {},
      subscriptionId: process.env.ARM_SUBSCRIPTION_ID || "",
      tenantId: process.env.ARM_TENANT_ID || "",
      clientId: process.env.ARM_CLIENT_ID || "",
      clientSecret: process.env.ARM_CLIENT_SECRET || "",
    });

    const EksVariables = DefineEksVariables(this, configuration.environment);
    const eksCluster = new EksCluster(this, "eks", {
      eksRegion: configuration.region.aws,
      eksCreateVpc: EksVariables.eksCreateVpc.value,
      eksCreateIgw: EksVariables.eksCreateIgw.value,
      eksAzs: EksVariables.eksAzs.value,
      eksPrivateSubnetNames: EksVariables.eksPrivateSubnetNames.value,
      eksPublicSubnets: EksVariables.eksPublicSubnets.value,
      eksEnableNatGateway: EksVariables.eksEnableNatGateway.value,
      eksVpcName: EksVariables.eksVpcName.value,
      eksClusterName: EksVariables.eksClusterName.value,
      eksCreateAwsAuthConfigmap: EksVariables.eksCreateAwsAuthConfigmap.value,
      eksManageAwsAuthConfigmap: EksVariables.eksManageAwsAuthConfigmap.value,
      eksCreateNodeSecurityGroup: EksVariables.eksCreateNodeSecurityGroup.value,
      eksCreateClusterSecurityGroup:
        EksVariables.eksCreateClusterSecurityGroup.value,
      eksCreateCloudwatchLogGroup:
        EksVariables.eksCreateCloudwatchLogGroup.value,
      eksCreateIamRole: EksVariables.eksCreateIamRole.value,
      eksIamRoleName: EksVariables.eksIamRoleName.value,
      eksManagedNodeGroupName: EksVariables.eksManagedNodeGroupName.value,
      eksManagedNodeGroupInstanceType:
        EksVariables.eksManagedNodeGroupInstanceType.value,
      eksManagedNodeGroupMinSize: EksVariables.eksManagedNodeGroupMinSize.value,
      eksManagedNodeGroupMaxSize: EksVariables.eksManagedNodeGroupMaxSize.value,
      eksManagedNodeGroupDesiredSize:
        EksVariables.eksManagedNodeGroupDesiredSize.value,
      eksManagedNodeGroupCustomLaunchTemplate:
        EksVariables.eksManagedNodeGroupCustomLaunchTemplate.value,
      eksTags: EksVariables.eksTags.value,
    });

    const AksVariables = DefineAksVariables(this, configuration.environment);
    const aksCluster = new AksCluster(this, "aks", {
      aksLocation: configuration.region.azure,
      aksVnetName: AksVariables.aksVnetName.value,
      aksResourceGroupName: AksVariables.aksResourceGroupName.value,
      aksSubnetNames: AksVariables.aksSubnetNames.value,
      aksAddressSpace: AksVariables.aksAddressSpace.value,
      aksClusterName: AksVariables.aksClusterName.value,
      aksAgentsSize: AksVariables.aksAgentsSize.value,
      aksAgentsCount: AksVariables.aksAgentsCount.value,
      aksAgentsMinCount: AksVariables.aksAgentsMinCount.value,
      aksAgentsMaxCount: AksVariables.aksAgentsMaxCount.value,
      aksAgentsType: AksVariables.aksAgentsType.value,
      aksEnableAutoScaling: AksVariables.aksEnableAutoScaling.value,
      aksAutoScalerProfileEnabled:
        AksVariables.aksAutoScalerProfileEnabled.value,
      aksStorageProfileEnabled: AksVariables.aksStorageProfileEnabled.value,
      aksStorageProfileBlobDriverEnabled:
        AksVariables.aksStorageProfileBlobDriverEnabled.value,
      aksStorageProfileDiskDriverEnabled:
        AksVariables.aksStorageProfileDiskDriverEnabled.value,
      aksStorageProfileFileDriverEnabled:
        AksVariables.aksStorageProfileFileDriverEnabled.value,
      aksStorageProfileSnapshotControllerEnabled:
        AksVariables.aksStorageProfileSnapshotControllerEnabled.value,
      aksKeyVaultSecretsProviderEnabled:
        AksVariables.aksKeyVaultSecretsProviderEnabled.value,
      aksAgentsPoolName: AksVariables.aksAgentsPoolName.value,
      aksNetworkPlugin: AksVariables.aksNetworkPlugin.value,
      aksTags: AksVariables.aksTags.value,
    });

    // Create EKS Kubernetes Provider
    const eks_provider = new KubernetesProvider(this, "EKS_KUBERNETES", {
      host: eksCluster.getEksEndpoint,
      clusterCaCertificate: Fn.base64decode(
        eksCluster.getEksCertificateAutothority,
      ),
      alias: "eks-kubernetes",
    });

    // Create AKS Kubernetes Provider
    const aks_provider = new KubernetesProvider(this, "AKS_KUBERNETES", {
      host: aksCluster.getAksEndpoint,
      clusterCaCertificate: aksCluster.getEksCertificateAutothority,
      alias: "aks-kubernetes",
    });

    eks_provider.host = eksCluster.getEksEndpoint;
    aks_provider.host = aksCluster.getAksEndpoint;

    // Terraform Outputs
    new TerraformOutput(this, "eks_provider_endpoint", {
      value: eksCluster.getEksEndpoint,
      description: "The EKS provider endpoint",
    });
    new TerraformOutput(this, "aks_provider_endpoint", {
      value: aksCluster.getAksEndpoint,
      description: "The AKS provider endpoint",
    });
  }
}

const app = new App();

const environments: any = [
  Environment.dev,
  Environment.staging,
  Environment.prod,
];
const aws_region: AwsRegion = AwsRegion.us_east_1;
const azure_region: AzureRegion = AzureRegion.east_us;

for (const env of environments) {
  const stack = new MyStack(app, `${env}`, {
    environment: env,
    region: {
      aws: aws_region,
      azure: azure_region,
    },
  });
  new RemoteBackend(stack, {
    hostname: "app.terraform.io",
    organization: "multi-cloud-pipelines",
    workspaces: {
      name: env,
    },
  });
}

app.synth();
