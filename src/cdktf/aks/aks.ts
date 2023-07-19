import {Construct} from "constructs";
import {Aks} from "../../../.gen/modules/aks";
import {Vnet} from "../../../.gen/modules/vnet";
import {AzureRegion} from "../../const";

export interface AksClusterProps {
    readonly location: AzureRegion | undefined;
    readonly environment: string;
    readonly vnetName: string;
    readonly resourceGroupName: string;
    readonly subnetNames: string[];
    readonly subnetPrefixes: string[];
    readonly aksClusterName: string;
    readonly agentsSize: string;
    readonly agentsCount: number;
    readonly agentsMinCount: number;
    readonly agentsMaxCount: number;
    readonly agentsType: string;
    readonly enableAutoScaling: boolean;
    readonly autoScalerProfileEnabled: boolean;
    readonly storageProfileEnabled: boolean;
    readonly storageProfileBlobDriverEnabled: boolean;
    readonly storageProfileDiskDriverEnabled: boolean;
    readonly storageProfileFileDriverEnabled: boolean;
    readonly storageProfileSnapshotControllerEnabled: boolean;
    readonly keyVaultSecretsProviderEnabled: boolean;
    readonly agentsPoolName: string;
    readonly networkPlugin: string;
    readonly tags?: { [key: string]: string };
}

export class AksCluster extends Construct {
    private readonly vnet?: Vnet;
    private readonly aks?: Aks;

    constructor(scope: Construct, name: string, props: AksClusterProps) {
        super(scope, name);

        this.vnet = new Vnet(this, "vnet", {
            vnetName: props.vnetName,
            resourceGroupName: props.resourceGroupName,
            vnetLocation: `${props.location}`,
            useForEach: true,
            subnetNames: props.subnetNames,
            subnetPrefixes: props.subnetPrefixes,
            tags: props.tags,
        });

        this.aks = new Aks(this, "aks", {
            dependsOn: [this.vnet],
            vnetSubnetId: this.vnet.vnetSubnetsOutput,
            apiServerSubnetId: this.vnet.vnetSubnetsOutput,
            podSubnetId: this.vnet.vnetSubnetsOutput,
            clusterName: props.aksClusterName,
            resourceGroupName: props.resourceGroupName,
            location: props.location,
            agentsSize: props.agentsSize,
            agentsCount: props.agentsCount,
            agentsMinCount: props.agentsMinCount,
            agentsMaxCount: props.agentsMaxCount,
            agentsType: props.agentsType,
            enableAutoScaling: props.enableAutoScaling,
            autoScalerProfileEnabled: props.autoScalerProfileEnabled,
            storageProfileEnabled: props.storageProfileEnabled,
            storageProfileBlobDriverEnabled: props.storageProfileBlobDriverEnabled,
            storageProfileDiskDriverEnabled: props.storageProfileDiskDriverEnabled,
            storageProfileFileDriverEnabled: props.storageProfileFileDriverEnabled,
            storageProfileSnapshotControllerEnabled: props.storageProfileSnapshotControllerEnabled,
            keyVaultSecretsProviderEnabled: props.keyVaultSecretsProviderEnabled,
            agentsPoolName: props.agentsPoolName,
            networkPlugin: props.networkPlugin,
            agentsLabels: props.tags,
            agentsTags: props.tags,
            tags: props.tags,
        });
    }

    public get getAksEndpoint(): string | undefined {
        return this.aks?.hostOutput as string | undefined;
    }

    public get getEksCertificateAutothority(): string {
        return this.aks?.kubeAdminConfigRawOutput as string;
    }
}
