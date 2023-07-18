import { TerraformStack, TerraformVariable } from "cdktf";
import { TerraformVariables, Environment } from "../const";

export function DefineEksVariables(
  stack: TerraformStack,
  environment: Environment,
) {
  const eksClusterName = new TerraformVariable(stack, "eks_cluster_name", {
    type: "string",
    default: TerraformVariables.eks_cluster_name[environment],
    description: "The name of the EKS cluster",
  });
  const eksVpcCidrBlock = new TerraformVariable(stack, "vpc_cidr", {
    type: "string",
    default: TerraformVariables.eks_vpc_cidr_block[environment],
    description: "The CIDR block for the VPC",
  });
  const eksEnableDnsHostnames = new TerraformVariable(
    stack,
    "enable_dns_hostnames",
    {
      type: "string",
      default: TerraformVariables.eks_enable_dns_hostnames[environment],
      description: "A boolean flag to enable/disable DNS hostnames in the VPC",
    },
  );
  const eksNumberOfSubnets = new TerraformVariable(stack, "number_of_subnets", {
    type: "number",
    default: TerraformVariables.eks_number_of_subnets[environment],
    description: "The number of subnets to create in the VPC",
  });
  const eksControlPlaneVersion = new TerraformVariable(
    stack,
    "eks_control_plane_version",
    {
      type: "string",
      default: TerraformVariables.eks_control_plane_version[environment],
      description: "The version of the EKS control plane",
    },
  );
  const eksDataPlaneVersion = new TerraformVariable(
    stack,
    "eks_data_plane_version",
    {
      type: "string",
      default: TerraformVariables.eks_data_plane_version[environment],
      description: "The version of the EKS data plane",
    },
  );
  const eksControlPlaneRoleArn = new TerraformVariable(
    stack,
    "eks_control_plane_role_arn",
    {
      type: "string",
      default: TerraformVariables.eks_control_plane_role_arn[environment],
      description: "The ARN of the IAM role for the EKS control plane",
    },
  );
  const eksDataPlaneRoleArn = new TerraformVariable(
    stack,
    "eks_data_plane_role_arn",
    {
      type: "string",
      default: TerraformVariables.eks_data_plane_role_arn[environment],
      description: "The ARN of the IAM role for the EKS data plane",
    },
  );
  const eksNodeGroupName = new TerraformVariable(stack, "eks_node_group_name", {
    type: "string",
    default: TerraformVariables.eks_node_group_name[environment],
    description: "The name of the EKS node group",
  });
  const eksNodeGroupMinSize = new TerraformVariable(
    stack,
    "eks_node_group_min_size",
    {
      type: "number",
      default: TerraformVariables.eks_node_group_min_size[environment],
      description: "The minimum size of the EKS node group",
    },
  );
  const eksNodeGroupMaxSize = new TerraformVariable(
    stack,
    "eks_node_group_max_size",
    {
      type: "number",
      default: TerraformVariables.eks_node_group_max_size[environment],
      description: "The maximum size of the EKS node group",
    },
  );
  const eksNodeGroupDesiredSize = new TerraformVariable(
    stack,
    "eks_node_group_desired_size",
    {
      type: "number",
      default: TerraformVariables.eks_node_group_desired_size[environment],
      description: "The desired size of the EKS node group",
    },
  );

  return {
    eksClusterName,
    eksVpcCidrBlock,
    eksEnableDnsHostnames,
    eksNumberOfSubnets,
    eksControlPlaneVersion,
    eksDataPlaneVersion,
    eksControlPlaneRoleArn,
    eksDataPlaneRoleArn,
    eksNodeGroupName,
    eksNodeGroupMinSize,
    eksNodeGroupMaxSize,
    eksNodeGroupDesiredSize,
  };
}
