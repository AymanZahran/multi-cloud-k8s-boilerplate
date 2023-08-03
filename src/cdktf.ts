import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { App, RemoteBackend, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { config } from "dotenv";
import { AksClusterTerraform } from "./cdktf/aks/aksClusterTerraform";
import { AksClusterTerraformVars } from "./cdktf/aks/aksClusterTerraformVars";
import { EksClusterTerraform } from "./cdktf/eks/eksClusterTerraform";
import { EksClusterTerraformVars } from "./cdktf/eks/eksClusterTerraformVars";
import {
  AwsAccessKey,
  AwsAccountId,
  AwsRegion,
  AzureRegion,
  AzureSubscriptionId,
  AzureTenantId,
  AzureTerraformClientId,
  Environment,
  TerraformRemoteBackendHostName,
  TerraformRemoteBackendOrganization,
} from "./properties/const";

config(); // Load the values from the .env file into process.env

interface MultiCloudBoilerPlateProps {
  environment: Environment;
  region: {
    aws?: AwsRegion;
    azure?: AzureRegion;
  };
}

class MultiCloudBoilerPlate extends TerraformStack {
  constructor(scope: Construct, id: string, props: MultiCloudBoilerPlateProps) {
    super(scope, id);

    // Create AWS Providers
    new AwsProvider(this, "AWS", {
      accessKey: AwsAccessKey[props.environment],
      secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: props.region.aws,
    });

    // Create Azure Provider
    new AzurermProvider(this, "AZURE", {
      features: {},
      subscriptionId: AzureSubscriptionId[props.environment],
      tenantId: AzureTenantId[props.environment],
      clientId: AzureTerraformClientId[props.environment],
      clientSecret: process.env.ARM_CLIENT_SECRET || "",
    });

    // Create EKS Cluster
    const EksVariables = EksClusterTerraformVars(this, props.environment);
    new EksClusterTerraform(this, "eks", {
      AccountId: AwsAccountId[props.environment],
      eksRegion: props.region.aws,
      eksCreateVpc: EksVariables.eksCreateVpc.value,
      eksCreateIgw: EksVariables.eksCreateIgw.value,
      eksAzs: EksVariables.eksAzs.value,
      eksPrivateSubnetNames: EksVariables.eksPrivateSubnetNames.value,
      eksPublicSubnetNames: EksVariables.eksPublicSubnetNames.value,
      eksEnableNatGateway: EksVariables.eksEnableNatGateway.value,
      eksCidr: EksVariables.eksCidr.value,
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
      eksTags: EksVariables.eksTags.value,
      eksInstallArgoCd: EksVariables.eksInstallArgoCd.value,
      eksInstallArgoCdPath: EksVariables.eksInstallArgoCdPath.value,
      eksCrossPlaneIamRoleArn:
        "arn:aws:iam::" +
        AwsAccountId[props.environment] +
        ":role/" +
        EksVariables.eksCrossPlaneIamRoleName,
      eksCrossPlaneServiceAccountName:
        EksVariables.eksCrossPlaneServiceAccountName.value,
      eksCrossPlaneNamespace: EksVariables.eksCrossPlaneNamespace.value,
    });

    // Create AKS Cluster
    const AksVariables = AksClusterTerraformVars(this, props.environment);
    new AksClusterTerraform(this, "aks", {
      aksLocation: props.region.azure,
      aksPrefix: AksVariables.aksPrefix.value,
      aksVnetName: AksVariables.aksVnetName.value,
      aksResourceGroupName: AksVariables.aksResourceGroupName.value,
      aksSubnetNames: AksVariables.aksSubnetNames.value,
      aksAddressSpace: AksVariables.aksAddressSpace.value,
      aksSubnetPrefixes: AksVariables.aksSubnetPrefixes.value,
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
      aksRbacAadAzureRbacEnabled: AksVariables.aksRbacAadAzureRbacEnabled.value,
      aksRoleBasedAccessControlEnabled:
        AksVariables.aksRoleBasedAccessControlEnabled.value,
      aksAgentsPoolName: AksVariables.aksAgentsPoolName.value,
      aksNetworkPlugin: AksVariables.aksNetworkPlugin.value,
      aksLogAnalyticsWorkspaceEnabled:
        AksVariables.aksLogAnalyticsWorkspaceEnabled.value,
      aksLogAnalyticsWorkspaceName:
        AksVariables.aksLogAnalyticsWorkspaceName.value,
      aksIngressApplicationGatewayEnabled:
        AksVariables.aksIngressApplicationGatewayEnabled.value,
      aksIngressApplicationGatewayName:
        AksVariables.aksIngressApplicationGatewayName.value,
      aksIngressApplicationGatewaySubnetCidr:
        AksVariables.aksIngressApplicationGatewaySubnetCidr.value,
      aksTags: AksVariables.aksTags.value,
      aksInstallArgoCd: AksVariables.aksInstallArgoCd.value,
      aksInstallArgoCdPath: AksVariables.aksInstallArgoCdPath.value,
    });
  }
}

const app = new App();

const aws_region: AwsRegion = AwsRegion.us_east_1;
const azure_region: AzureRegion = AzureRegion.east_us;

for (const env of Object.values(Environment)) {
  const stack = new MultiCloudBoilerPlate(app, `${env}`, {
    environment: env,
    region: {
      aws: aws_region,
      azure: azure_region,
    },
  });
  new RemoteBackend(stack, {
    hostname: TerraformRemoteBackendHostName,
    organization: TerraformRemoteBackendOrganization,
    workspaces: {
      name: env,
    },
  });
}

app.synth();
