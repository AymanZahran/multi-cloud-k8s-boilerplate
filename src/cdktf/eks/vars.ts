import { TerraformStack, TerraformVariable } from "cdktf";
import { EksTerraformVariables } from "./default";
import { Environment } from "../../const";

export function DefineEksVariables(
  stack: TerraformStack,
  environment: Environment,
) {
  const eksCreateVpc = new TerraformVariable(stack, "eks_create_vpc", {
    type: "bool",
    default: EksTerraformVariables.eksCreateVpc[environment],
    description: "A boolean flag to create a new VPC",
  });
  const eksCreateIgw = new TerraformVariable(stack, "eks_create_igw", {
    type: "bool",
    default: EksTerraformVariables.eksCreateIgw[environment],
    description: "A boolean flag to create a new Internet Gateway",
  });
  const eksAzs = new TerraformVariable(stack, "eks_azs", {
    type: "list(string)",
    default: EksTerraformVariables.eksAzs[environment],
    description: "A list of availability zones",
  });
  const eksPrivateSubnetNames = new TerraformVariable(
    stack,
    "eks_private_subnet_names",
    {
      type: "list(string)",
      default: EksTerraformVariables.eksPrivateSubnetNames[environment],
      description: "A list of private subnet names",
    },
  );
  const eksPublicSubnets = new TerraformVariable(
    stack,
    "eks_public_subnet_names",
    {
      type: "list(string)",
      default: EksTerraformVariables.eksPublicSubnets[environment],
      description: "A list of public subnet names",
    },
  );
  const eksEnableNatGateway = new TerraformVariable(
    stack,
    "enable_nat_gateway",
    {
      type: "bool",
      default: EksTerraformVariables.eksEnableNatGateway[environment],
      description: "A boolean flag to enable NAT Gateway",
    },
  );
  const eksCidr = new TerraformVariable(stack, "eks_cidr", {
    type: "string",
    default: EksTerraformVariables.eksCidr[environment],
    description: "The CIDR block for the VPC",
  });
  const eksVpcName = new TerraformVariable(stack, "eks_vpc_name", {
    type: "string",
    default: EksTerraformVariables.eksVpcName[environment],
    description: "The name of the VPC",
  });
  const eksClusterName = new TerraformVariable(stack, "eks_cluster_name", {
    type: "string",
    default: EksTerraformVariables.eksClusterName[environment],
    description: "The name of the EKS cluster",
  });
  const eksCreateAwsAuthConfigmap = new TerraformVariable(
    stack,
    "eks_create_aws_auth_configmap",
    {
      type: "bool",
      default: EksTerraformVariables.eksCreateAwsAuthConfigmap[environment],
      description: "A boolean flag to create aws-auth configmap",
    },
  );
  const eksManageAwsAuthConfigmap = new TerraformVariable(
    stack,
    "eks_manage_aws_auth_configmap",
    {
      type: "bool",
      default: EksTerraformVariables.eksManageAwsAuthConfigmap[environment],
      description: "A boolean flag to manage aws-auth configmap",
    },
  );
  const eksCreateNodeSecurityGroup = new TerraformVariable(
    stack,
    "eks_create_node_security_group",
    {
      type: "bool",
      default: EksTerraformVariables.eksCreateNodeSecurityGroup[environment],
      description: "A boolean flag to create node security group",
    },
  );
  const eksCreateClusterSecurityGroup = new TerraformVariable(
    stack,
    "eks_create_cluster_security_group",
    {
      type: "bool",
      default: EksTerraformVariables.eksCreateClusterSecurityGroup[environment],
      description: "A boolean flag to create cluster security group",
    },
  );
  const eksCreateCloudwatchLogGroup = new TerraformVariable(
    stack,
    "eks_create_cloudwatch_log_group",
    {
      type: "bool",
      default: EksTerraformVariables.eksCreateCloudwatchLogGroup[environment],
      description: "A boolean flag to create cloudwatch log group",
    },
  );
  const eksCreateIamRole = new TerraformVariable(stack, "eks_create_iam_role", {
    type: "bool",
    default: EksTerraformVariables.eksCreateIamRole[environment],
    description: "A boolean flag to create iam role",
  });
  const eksIamRoleName = new TerraformVariable(stack, "eks_iam_role_name", {
    type: "string",
    default: EksTerraformVariables.eksIamRoleName[environment],
    description: "The name of the IAM role",
  });
  const eksManagedNodeGroupName = new TerraformVariable(
    stack,
    "eks_managed_node_group_name",
    {
      type: "string",
      default: EksTerraformVariables.eksManagedNodeGroupName[environment],
      description: "The name of the managed node group",
    },
  );
  const eksManagedNodeGroupInstanceType = new TerraformVariable(
    stack,
    "eks_managed_node_group_instance_type",
    {
      type: "string",
      default:
        EksTerraformVariables.eksManagedNodeGroupInstanceType[environment],
      description: "The instance type of the managed node group",
    },
  );
  const eksManagedNodeGroupMinSize = new TerraformVariable(
    stack,
    "eks_managed_node_group_min_size",
    {
      type: "number",
      default: EksTerraformVariables.eksManagedNodeGroupMinSize[environment],
      description: "The minimum size of the managed node group",
    },
  );
  const eksManagedNodeGroupMaxSize = new TerraformVariable(
    stack,
    "eks_managed_node_group_max_size",
    {
      type: "number",
      default: EksTerraformVariables.eksManagedNodeGroupMaxSize[environment],
      description: "The maximum size of the managed node group",
    },
  );
  const eksManagedNodeGroupDesiredSize = new TerraformVariable(
    stack,
    "eks_managed_node_group_desired_size",
    {
      type: "number",
      default:
        EksTerraformVariables.eksManagedNodeGroupDesiredSize[environment],
      description: "The desired size of the managed node group",
    },
  );
  const eksManagedNodeGroupCustomLaunchTemplate = new TerraformVariable(
    stack,
    "eks_managed_node_group_custom_launch_template",
    {
      type: "bool",
      default:
        EksTerraformVariables.eksManagedNodeGroupCustomLaunchTemplate[
          environment
        ],
      description:
        "A boolean flag to use custom launch template for the managed node group",
    },
  );
  const eksTags = new TerraformVariable(stack, "eks_tags", {
    type: "map(string)",
    default: EksTerraformVariables.eksTags[environment],
    description: "A map of tags",
  });

  return {
    eksCreateVpc,
    eksCreateIgw,
    eksAzs,
    eksPrivateSubnetNames,
    eksPublicSubnets,
    eksEnableNatGateway,
    eksCidr,
    eksVpcName,
    eksClusterName,
    eksCreateAwsAuthConfigmap,
    eksManageAwsAuthConfigmap,
    eksCreateNodeSecurityGroup,
    eksCreateClusterSecurityGroup,
    eksCreateCloudwatchLogGroup,
    eksCreateIamRole,
    eksIamRoleName,
    eksManagedNodeGroupName,
    eksManagedNodeGroupInstanceType,
    eksManagedNodeGroupMinSize,
    eksManagedNodeGroupMaxSize,
    eksManagedNodeGroupDesiredSize,
    eksManagedNodeGroupCustomLaunchTemplate,
    eksTags,
  };
}
