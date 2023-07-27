import { NullProvider } from "@cdktf/provider-null/lib/provider";
import { Resource } from "@cdktf/provider-null/lib/resource";
import { Construct } from "constructs";
import { Aks } from "../../../.gen/modules/aks";
import { Vnet } from "../../../.gen/modules/vnet";
import { AzureRegion } from "../../const";

export interface AksClusterProps {
  readonly aksLocation: AzureRegion | undefined;
  readonly aksPrefix: string;
  readonly aksVnetName: string;
  readonly aksResourceGroupName: string;
  readonly aksSubnetNames: string[];
  readonly aksAddressSpace: string[];
  readonly aksSubnetPrefixes: string[];
  readonly aksClusterName: string;
  readonly aksAgentsSize: string;
  readonly aksAgentsCount: number;
  readonly aksAgentsMinCount: number;
  readonly aksAgentsMaxCount: number;
  readonly aksAgentsType: string;
  readonly aksEnableAutoScaling: boolean;
  readonly aksAutoScalerProfileEnabled: boolean;
  readonly aksStorageProfileEnabled: boolean;
  readonly aksStorageProfileBlobDriverEnabled: boolean;
  readonly aksStorageProfileDiskDriverEnabled: boolean;
  readonly aksStorageProfileFileDriverEnabled: boolean;
  readonly aksStorageProfileSnapshotControllerEnabled: boolean;
  readonly aksKeyVaultSecretsProviderEnabled: boolean;
  readonly aksRbacAadAzureRbacEnabled: boolean;
  readonly aksRoleBasedAccessControlEnabled: boolean;
  readonly aksAgentsPoolName: string;
  readonly aksNetworkPlugin: string;
  readonly aksLogAnalyticsWorkspaceEnabled: boolean;
  readonly aksLogAnalyticsWorkspaceName: string;
  readonly aksIngressApplicationGatewayEnabled: boolean;
  readonly aksIngressApplicationGatewayName: string;
  readonly aksIngressApplicationGatewaySubnetCidr: string;
  readonly aksTags?: { [key: string]: string };
  readonly aksInstallArgoCd: boolean;
  readonly aksInstallArgoCdPath: string;
}

export class AksCluster extends Construct {
  private readonly vnet?: Vnet;
  private readonly aks?: Aks;

  constructor(scope: Construct, name: string, props: AksClusterProps) {
    super(scope, name);

    // Create Vnet
    this.vnet = new Vnet(this, "vnet", {
      vnetName: props.aksVnetName,
      resourceGroupName: props.aksResourceGroupName,
      vnetLocation: `${props.aksLocation}`,
      useForEach: true,
      subnetNames: props.aksSubnetNames,
      addressSpace: props.aksAddressSpace,
      subnetPrefixes: props.aksSubnetPrefixes,
      tags: props.aksTags,
    });

    // Create AKS cluster
    this.aks = new Aks(this, "aks", {
      dependsOn: [this.vnet],
      location: props.aksLocation,
      prefix: props.aksPrefix,
      // vnetSubnetId: this.vnet.vnetSubnetsOutput,
      // apiServerSubnetId: this.vnet.vnetSubnetsOutput,
      // podSubnetId: this.vnet.vnetSubnetsOutput,
      clusterName: props.aksClusterName,
      resourceGroupName: props.aksResourceGroupName,
      agentsSize: props.aksAgentsSize,
      agentsCount: props.aksAgentsCount,
      agentsMinCount: props.aksAgentsMinCount,
      agentsMaxCount: props.aksAgentsMaxCount,
      agentsType: props.aksAgentsType,
      enableAutoScaling: props.aksEnableAutoScaling,
      autoScalerProfileEnabled: props.aksAutoScalerProfileEnabled,
      storageProfileEnabled: props.aksStorageProfileEnabled,
      storageProfileBlobDriverEnabled: props.aksStorageProfileBlobDriverEnabled,
      storageProfileDiskDriverEnabled: props.aksStorageProfileDiskDriverEnabled,
      storageProfileFileDriverEnabled: props.aksStorageProfileFileDriverEnabled,
      storageProfileSnapshotControllerEnabled:
        props.aksStorageProfileSnapshotControllerEnabled,
      keyVaultSecretsProviderEnabled: props.aksKeyVaultSecretsProviderEnabled,
      rbacAadAzureRbacEnabled: props.aksRbacAadAzureRbacEnabled,
      roleBasedAccessControlEnabled: props.aksRoleBasedAccessControlEnabled,
      agentsPoolName: props.aksAgentsPoolName,
      networkPlugin: props.aksNetworkPlugin,
      logAnalyticsWorkspaceEnabled: props.aksLogAnalyticsWorkspaceEnabled,
      clusterLogAnalyticsWorkspaceName: props.aksLogAnalyticsWorkspaceName,
      logAnalyticsWorkspaceResourceGroupName: props.aksResourceGroupName,
      ingressApplicationGatewayEnabled:
        props.aksIngressApplicationGatewayEnabled,
      ingressApplicationGatewayName: props.aksIngressApplicationGatewayName,
      ingressApplicationGatewaySubnetCidr:
        props.aksIngressApplicationGatewaySubnetCidr,
      agentsLabels: props.aksTags,
      agentsTags: props.aksTags,
      tags: props.aksTags,
    });

    // Install ArgoCD on AKS Cluster
    if (props.aksInstallArgoCd) {
      // TODO Currently, we are using null provider to install ArgoCD on Kubernetes Cluster
      //  Use Terraform Kubernetes Provider or cdktf Kubernetes Provider when there is a version
      //  which supports applying mainifests on Kubernetes Cluster that's not exists
      //  To avoid the `Cannot create REST client: no client config` error during the terraform plan
      //  OR Use kubectl terraform provider when it is officially trusted by Hashicorp'
      const aks_null_provider = new NullProvider(this, "aks-null-provider", {
        alias: "aks_null",
      });
      new Resource(this, "argo-cd-aks-install-null", {
        dependsOn: [this.aks],
        provider: aks_null_provider,
        provisioners: [
          {
            type: "local-exec",
            when: "create",
            interpreter: ["bash", "-c"],
            workingDir: "./",
            environment: {
              CLUSTER_PROVIDER: "aks",
              AKS_CLUSTER_NAME: props.aksClusterName,
              AKS_RESOURCE_GROUP_NAME: props.aksResourceGroupName,
              MANIFEST_PATH: props.aksInstallArgoCdPath,
            },
            command: "./scripts/InstallConfigureArgoCD.sh",
          },
        ],
      });
    }
  }
}
