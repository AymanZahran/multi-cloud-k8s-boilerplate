import { TerraformStack, TerraformVariable } from "cdktf";
import { AksTerraformVariables } from "./default";
import { Environment } from "../../const";

export function DefineAksVariables(
  stack: TerraformStack,
  environment: Environment,
) {
  const aksResourceGroupName = new TerraformVariable(
    stack,
    "resource_group_name",
    {
      type: "string",
      default: AksTerraformVariables.aksResource_group_name[environment],
      description: "The name of the AKS resource group",
    },
  );
  const aksVnetName = new TerraformVariable(stack, "vnet_name", {
    type: "string",
    default: AksTerraformVariables.aksVnetName[environment],
    description: "The name of the AKS VNet",
  });
  const aksSubnetNames = new TerraformVariable(stack, "subnet_names", {
    type: "list(string)",
    default: AksTerraformVariables.aksSubnetNames[environment],
    description: "The names of the AKS subnets",
  });
  const aksSubnetPrefixes = new TerraformVariable(stack, "subnet_prefixes", {
    type: "list(string)",
    default: AksTerraformVariables.aksSubnetPrefixes[environment],
    description: "The CIDR blocks for the AKS subnets",
  });
  const aksClusterName = new TerraformVariable(stack, "aks_cluster_name", {
    type: "string",
    default: AksTerraformVariables.aksClusterName[environment],
    description: "The name of the AKS cluster",
  });
  const aksAgentsSize = new TerraformVariable(stack, "agents_size", {
    type: "string",
    default: AksTerraformVariables.aksAgentsSize[environment],
    description: "The size of the AKS agents",
  });
  const aksAgentsCount = new TerraformVariable(stack, "agents_count", {
    type: "number",
    default: AksTerraformVariables.aksAgentsCount[environment],
    description: "The number of AKS agents",
  });
  const aksAgentsMinCount = new TerraformVariable(stack, "agents_min_count", {
    type: "number",
    default: AksTerraformVariables.aksAgentsMinCount[environment],
    description: "The minimum number of AKS agents",
  });
  const aksAgentsMaxCount = new TerraformVariable(stack, "agents_max_count", {
    type: "number",
    default: AksTerraformVariables.aksAgentsMaxCount[environment],
    description: "The maximum number of AKS agents",
  });
  const aksAgentsType = new TerraformVariable(stack, "agents_type", {
    type: "string",
    default: AksTerraformVariables.aksAgentsType[environment],
    description: "The type of AKS agents",
  });
  const aksEnableAutoScaling = new TerraformVariable(
    stack,
    "enable_auto_scaling",
    {
      type: "bool",
      default: AksTerraformVariables.aksEnableAutoScaling[environment],
      description: "Whether to enable auto scaling for AKS agents",
    },
  );
  const aksAutoScalerProfileEnabled = new TerraformVariable(
    stack,
    "auto_scaler_profile_enabled",
    {
      type: "bool",
      default: AksTerraformVariables.aksAutoScalerProfileEnabled[environment],
      description: "Whether to enable auto scaler profile for AKS agents",
    },
  );
  const aksStorageProfileEnabled = new TerraformVariable(
    stack,
    "storage_profile_enabled",
    {
      type: "bool",
      default: AksTerraformVariables.aksStorageProfileEnabled[environment],
      description: "Whether to enable storage profile for AKS agents",
    },
  );
  const aksStorageProfileBlobDriverEnabled = new TerraformVariable(
    stack,
    "storage_profile_blob_driver_enabled",
    {
      type: "bool",
      default:
        AksTerraformVariables.aksStorageProfileBlobDriverEnabled[environment],
      description: "Whether to enable blob driver for AKS agents",
    },
  );
  const aksStorageProfileDiskDriverEnabled = new TerraformVariable(
    stack,
    "storage_profile_disk_driver_enabled",
    {
      type: "bool",
      default:
        AksTerraformVariables.aksStorageProfileDiskDriverEnabled[environment],
      description: "Whether to enable disk driver for AKS agents",
    },
  );
  const aksStorageProfileFileDriverEnabled = new TerraformVariable(
    stack,
    "storage_profile_file_driver_enabled",
    {
      type: "bool",
      default:
        AksTerraformVariables.aksStorageProfileFileDriverEnabled[environment],
      description: "Whether to enable file driver for AKS agents",
    },
  );
  const aksStorageProfileSnapshotControllerEnabled = new TerraformVariable(
    stack,
    "storage_profile_snapshot_controller_enabled",
    {
      type: "bool",
      default:
        AksTerraformVariables.aksStorageProfileSnapshotControllerEnabled[
          environment
        ],
      description: "Whether to enable snapshot controller for AKS agents",
    },
  );
  const aksKeyVaultSecretsProviderEnabled = new TerraformVariable(
    stack,
    "key_vault_secrets_provider_enabled",
    {
      type: "bool",
      default:
        AksTerraformVariables.aksKeyVaultSecretsProviderEnabled[environment],
      description:
        "Whether to enable key vault secrets provider for AKS agents",
    },
  );
  const aksAgentsPoolName = new TerraformVariable(stack, "agents_pool_name", {
    type: "string",
    default: AksTerraformVariables.aksAgentsPoolName[environment],
    description: "The name of the AKS agents pool",
  });
  const aksNetworkPlugin = new TerraformVariable(stack, "network_plugin", {
    type: "string",
    default: AksTerraformVariables.aksNetworkPlugin[environment],
    description: "The network plugin to use for AKS",
  });
  const aksTags = new TerraformVariable(stack, "aks_tags", {
    type: "map(string)",
    default: AksTerraformVariables.aksTags[environment],
    description: "The tags to apply to AKS",
  });

  return {
    aksResourceGroupName,
    aksVnetName,
    aksSubnetNames,
    aksSubnetPrefixes,
    aksClusterName,
    aksAgentsSize,
    aksAgentsCount,
    aksAgentsMinCount,
    aksAgentsMaxCount,
    aksAgentsType,
    aksEnableAutoScaling,
    aksAutoScalerProfileEnabled,
    aksStorageProfileEnabled,
    aksStorageProfileBlobDriverEnabled,
    aksStorageProfileFileDriverEnabled,
    aksStorageProfileDiskDriverEnabled,
    aksStorageProfileSnapshotControllerEnabled,
    aksKeyVaultSecretsProviderEnabled,
    aksAgentsPoolName,
    aksNetworkPlugin,
    aksTags,
  };
}
