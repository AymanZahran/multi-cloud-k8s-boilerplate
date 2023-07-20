import { Construct } from "constructs";
import { Aks } from "../../../.gen/modules/aks";
import { Vnet } from "../../../.gen/modules/vnet";
import { AzureRegion } from "../../const";

export interface AksClusterProps {
  readonly aksLocation: AzureRegion | undefined;
  readonly aksVnetName: string;
  readonly aksResourceGroupName: string;
  readonly aksSubnetNames: string[];
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
  readonly aksAgentsPoolName: string;
  readonly aksNetworkPlugin: string;
  readonly aksTags?: { [key: string]: string };
}

export class AksCluster extends Construct {
  private readonly vnet?: Vnet;
  private readonly aks?: Aks;

  constructor(scope: Construct, name: string, props: AksClusterProps) {
    super(scope, name);

    this.vnet = new Vnet(this, "vnet", {
      vnetName: props.aksVnetName,
      resourceGroupName: props.aksResourceGroupName,
      vnetLocation: `${props.aksLocation}`,
      useForEach: true,
      subnetNames: props.aksSubnetNames,
      subnetPrefixes: props.aksSubnetPrefixes,
      tags: props.aksTags,
    });

    this.aks = new Aks(this, "aks", {
      dependsOn: [this.vnet],
      vnetSubnetId: this.vnet.vnetSubnetsOutput,
      apiServerSubnetId: this.vnet.vnetSubnetsOutput,
      podSubnetId: this.vnet.vnetSubnetsOutput,
      clusterName: props.aksClusterName,
      resourceGroupName: props.aksResourceGroupName,
      location: props.aksLocation,
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
      agentsPoolName: props.aksAgentsPoolName,
      networkPlugin: props.aksNetworkPlugin,
      agentsLabels: props.aksTags,
      agentsTags: props.aksTags,
      tags: props.aksTags,
    });
  }

  public get getAksEndpoint(): string | undefined {
    return this.aks?.hostOutput as string | undefined;
  }

  public get getEksCertificateAutothority(): string {
    return this.aks?.kubeAdminConfigRawOutput as string;
  }
}
