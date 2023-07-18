import { TerraformStack, TerraformVariable } from "cdktf";
import { TerraformVariables, Environment } from "../const";

export function DefineAksVariables(
  stack: TerraformStack,
  environment: Environment,
) {
  const aksClusterName = new TerraformVariable(stack, "aks_cluster_name", {
    type: "string",
    default: TerraformVariables.aks_cluster_name[environment],
    description: "The name of the AKS cluster",
  });
  const aksResourceGroupName = new TerraformVariable(
    stack,
    "aks_resource_group_name",
    {
      type: "string",
      default: TerraformVariables.aks_resource_group_name[environment],
      description: "The name of the AKS resource group",
    },
  );
  const aksVnetCidrBlock = new TerraformVariable(stack, "aks_vnet_cidr_block", {
    type: "string",
    default: TerraformVariables.aks_vnet_cidr_block[environment],
    description: "The CIDR block for the AKS VNet",
  });
  const aksSubnetCidrBlock = new TerraformVariable(
    stack,
    "aks_subnet_cidr_block",
    {
      type: "string",
      default: TerraformVariables.aks_subnet_cidr_block[environment],
      description: "The CIDR block for the AKS Subnet",
    },
  );
  const aksVnetName = new TerraformVariable(stack, "aks_vnet_name", {
    type: "string",
    default: TerraformVariables.aks_vnet_name[environment],
    description: "The name of the AKS VNet",
  });
  const aksSubnetName = new TerraformVariable(stack, "aks_subnet_name", {
    type: "string",
    default: TerraformVariables.aks_subnet_name[environment],
    description: "The name of the AKS Subnet",
  });
  const aksControlPlaneVersion = new TerraformVariable(
    stack,
    "aks_control_plane_version",
    {
      type: "string",
      default: TerraformVariables.aks_control_plane_version[environment],
      description: "The version of the AKS control plane",
    },
  );
  const aksDataPlaneVersion = new TerraformVariable(
    stack,
    "aks_data_plane_version",
    {
      type: "string",
      default: TerraformVariables.aks_data_plane_version[environment],
      description: "The version of the AKS data plane",
    },
  );
  const aksNodePoolName = new TerraformVariable(stack, "aks_node_pool_name", {
    type: "string",
    default: TerraformVariables.aks_node_pool_name[environment],
    description: "The name of the AKS node pool",
  });
  const aksNodePoolVmSize = new TerraformVariable(
    stack,
    "aks_node_pool_vm_size",
    {
      type: "string",
      default: TerraformVariables.aks_node_pool_vm_size[environment],
      description: "The VM size of the AKS node pool",
    },
  );
  const aksNodePoolMinCount = new TerraformVariable(
    stack,
    "aks_node_pool_min_count",
    {
      type: "number",
      default: TerraformVariables.aks_node_pool_min_count[environment],
      description: "The minimum size of the AKS node pool",
    },
  );
  const aksNodePoolMaxCount = new TerraformVariable(
    stack,
    "aks_node_pool_max_count",
    {
      type: "number",
      default: TerraformVariables.aks_node_pool_max_count[environment],
      description: "The maximum size of the AKS node pool",
    },
  );
  const aksNodePoolCount = new TerraformVariable(stack, "aks_node_pool_count", {
    type: "number",
    default: TerraformVariables.aks_node_pool_count[environment],
    description: "The size of the AKS node pool",
  });

  return {
    aksClusterName,
    aksResourceGroupName,
    aksVnetName,
    aksSubnetName,
    aksVnetCidrBlock,
    aksSubnetCidrBlock,
    aksControlPlaneVersion,
    aksDataPlaneVersion,
    aksNodePoolName,
    aksNodePoolVmSize,
    aksNodePoolMinCount,
    aksNodePoolMaxCount,
    aksNodePoolCount,
  };
}
