import {TerraformStack, TerraformVariable} from "cdktf";
import {Environment} from "../../const";
import {AksTerraformVariables} from "./default";

export function DefineAksVariables(
    stack: TerraformStack,
    environment: Environment,
) {
    const resourceGroupName = new TerraformVariable(
        stack,
        "resource_group_name",
        {
            type: "string",
            default: AksTerraformVariables.resource_group_name[environment],
            description: "The name of the AKS resource group",
        },
    );
    const vnetName = new TerraformVariable(stack, "vnet_name", {
        type: "string",
        default: AksTerraformVariables.vnetName[environment],
        description: "The name of the AKS VNet",
    });
    const subnetNames = new TerraformVariable(stack, "subnet_names", {
        type: "list(string)",
        default: AksTerraformVariables.subnetNames[environment],
        description: "The names of the AKS subnets",
    });
    const subnetPrefixes = new TerraformVariable(
        stack,
        "subnet_prefixes",
        {
            type: "list(string)",
            default: AksTerraformVariables.subnetPrefixes[environment],
            description: "The CIDR blocks for the AKS subnets",
        }
    );
    const aksClusterName = new TerraformVariable(stack, "aks_cluster_name", {
        type: "string",
        default: AksTerraformVariables.aksClusterName[environment],
        description: "The name of the AKS cluster",
    });
    const agentsSize = new TerraformVariable(stack, "agents_size", {
        type: "string",
        default: AksTerraformVariables.agentsSize[environment],
        description: "The size of the AKS agents",
    });
    const agentsCount = new TerraformVariable(stack, "agents_count", {
        type: "number",
        default: AksTerraformVariables.agentsCount[environment],
        description: "The number of AKS agents",
    });
    const agentsMinCount = new TerraformVariable(
        stack,
        "agents_min_count",
        {
            type: "number",
            default: AksTerraformVariables.agentsMinCount[environment],
            description: "The minimum number of AKS agents",
        }
    );
    const agentsMaxCount = new TerraformVariable(
        stack,
        "agents_max_count",
        {
            type: "number",
            default: AksTerraformVariables.agentsMaxCount[environment],
            description: "The maximum number of AKS agents",
        }
    );
    const agentsType = new TerraformVariable(stack, "agents_type", {
        type: "string",
        default: AksTerraformVariables.agentsType[environment],
        description: "The type of AKS agents",
    });
    const enableAutoScaling = new TerraformVariable(stack, "enable_auto_scaling", {
        type: "bool",
        default: AksTerraformVariables.enableAutoScaling[environment],
        description: "Whether to enable auto scaling for AKS agents",
    });
    const autoScalerProfileEnabled = new TerraformVariable(stack, "auto_scaler_profile_enabled", {
        type: "bool",
        default: AksTerraformVariables.autoScalerProfileEnabled[environment],
        description: "Whether to enable auto scaler profile for AKS agents",
    });
    const storageProfileEnabled = new TerraformVariable(stack, "storage_profile_enabled", {
        type: "bool",
        default: AksTerraformVariables.storageProfileEnabled[environment],
        description: "Whether to enable storage profile for AKS agents",
    });
    const storageProfileBlobDriverEnabled = new TerraformVariable(stack, "storage_profile_blob_driver_enabled", {
        type: "bool",
        default: AksTerraformVariables.storageProfileBlobDriverEnabled[environment],
        description: "Whether to enable blob driver for AKS agents",
    });
    const storageProfileDiskDriverEnabled = new TerraformVariable(stack, "storage_profile_disk_driver_enabled", {
        type: "bool",
        default: AksTerraformVariables.storageProfileDiskDriverEnabled[environment],
        description: "Whether to enable disk driver for AKS agents",
    });
    const storageProfileFileDriverEnabled = new TerraformVariable(stack, "storage_profile_file_driver_enabled", {
        type: "bool",
        default: AksTerraformVariables.storageProfileFileDriverEnabled[environment],
        description: "Whether to enable file driver for AKS agents",
    });
    const storageProfileSnapshotControllerEnabled = new TerraformVariable(stack, "storage_profile_snapshot_controller_enabled", {
        type: "bool",
        default: AksTerraformVariables.storageProfileSnapshotControllerEnabled[environment],
        description: "Whether to enable snapshot controller for AKS agents",
    });
    const keyVaultSecretsProviderEnabled = new TerraformVariable(stack, "key_vault_secrets_provider_enabled", {
        type: "bool",
        default: AksTerraformVariables.keyVaultSecretsProviderEnabled[environment],
        description: "Whether to enable key vault secrets provider for AKS agents",
    });
    const agentsPoolName = new TerraformVariable(stack, "agents_pool_name", {
        type: "string",
        default: AksTerraformVariables.agentsPoolName[environment],
        description: "The name of the AKS agents pool",
    });
    const networkPlugin = new TerraformVariable(stack, "network_plugin", {
        type: "string",
        default: AksTerraformVariables.networkPlugin[environment],
        description: "The network plugin to use for AKS",
    });
    const tags = new TerraformVariable(stack, "tags", {
        type: "map(string)",
        default: AksTerraformVariables.tags[environment],
        description: "The tags to apply to AKS",
    });


    return {
        resourceGroupName,
        vnetName,
        subnetNames,
        subnetPrefixes,
        aksClusterName,
        agentsSize,
        agentsCount,
        agentsMinCount,
        agentsMaxCount,
        agentsType,
        enableAutoScaling,
        autoScalerProfileEnabled,
        storageProfileEnabled,
        storageProfileBlobDriverEnabled,
        storageProfileDiskDriverEnabled,
        storageProfileFileDriverEnabled,
        storageProfileSnapshotControllerEnabled,
        keyVaultSecretsProviderEnabled,
        agentsPoolName,
        networkPlugin,
        tags,
    };
}
