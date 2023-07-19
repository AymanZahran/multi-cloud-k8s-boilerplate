import {TerraformStack, TerraformVariable} from "cdktf";
import {Environment} from "../../const";
import {EksTerraformVariables} from "./default";

export function DefineEksVariables(
    stack: TerraformStack,
    environment: Environment,
) {
    const createVpc = new TerraformVariable(stack, "create_vpc", {
        type: "bool",
        default: EksTerraformVariables.createVpc[environment],
        description: "A boolean flag to create a new VPC",
    });
    const createIgw = new TerraformVariable(stack, "create_igw", {
        type: "bool",
        default: EksTerraformVariables.createIgw[environment],
        description: "A boolean flag to create a new Internet Gateway",
    });
    const azs = new TerraformVariable(stack, "azs", {
        type: "list(string)",
        default: EksTerraformVariables.azs[environment],
        description: "A list of availability zones",
    });
    const intraSubnetNames = new TerraformVariable(stack, "intra_subnet_names", {
        type: "list(string)",
        default: EksTerraformVariables.intraSubnetNames[environment],
        description: "A list of intra subnet names",
    });
    const privateSubnetNames = new TerraformVariable(stack, "private_subnet_names", {
        type: "list(string)",
        default: EksTerraformVariables.privateSubnetNames[environment],
        description: "A list of private subnet names",
    });
    const publicSubnets = new TerraformVariable(stack, "public_subnets", {
        type: "list(string)",
        default: EksTerraformVariables.publicSubnets[environment],
        description: "A list of public subnet names",
    });
    const enableNatGateway = new TerraformVariable(stack, "enable_nat_gateway", {
        type: "bool",
        default: EksTerraformVariables.enableNatGateway[environment],
        description: "A boolean flag to enable NAT Gateway",
    });
    const vpcName = new TerraformVariable(stack, "vpc_name", {
        type: "string",
        default: EksTerraformVariables.vpcName[environment],
        description: "The name of the VPC",
    });
    const eksClusterName = new TerraformVariable(stack, "eks_cluster_name", {
        type: "string",
        default: EksTerraformVariables.eksClusterName[environment],
        description: "The name of the EKS cluster",
    });
    const createAwsAuthConfigmap = new TerraformVariable(stack, "create_aws_auth_configmap", {
        type: "bool",
        default: EksTerraformVariables.createAwsAuthConfigmap[environment],
        description: "A boolean flag to create aws-auth configmap",
    });
    const manageAwsAuthConfigmap = new TerraformVariable(stack, "manage_aws_auth_configmap", {
        type: "bool",
        default: EksTerraformVariables.manageAwsAuthConfigmap[environment],
        description: "A boolean flag to manage aws-auth configmap",
    });
    const createNodeSecurityGroup = new TerraformVariable(stack, "create_node_security_group", {
        type: "bool",
        default: EksTerraformVariables.createNodeSecurityGroup[environment],
        description: "A boolean flag to create node security group",
    });
    const createClusterSecurityGroup = new TerraformVariable(stack, "create_cluster_security_group", {
        type: "bool",
        default: EksTerraformVariables.createClusterSecurityGroup[environment],
        description: "A boolean flag to create cluster security group",
    });
    const createCloudwatchLogGroup = new TerraformVariable(stack, "create_cloudwatch_log_group", {
        type: "bool",
        default: EksTerraformVariables.createCloudwatchLogGroup[environment],
        description: "A boolean flag to create cloudwatch log group",
    });
    const createIamRole = new TerraformVariable(stack, "create_iam_role", {
        type: "bool",
        default: EksTerraformVariables.createIamRoles[environment],
        description: "A boolean flag to create iam role",
    });
    const iamRoleName = new TerraformVariable(stack, "iam_role_name", {
        type: "string",
        default: EksTerraformVariables.iamRoleName[environment],
        description: "The name of the IAM role",
    });
    const managedNodeGroupName = new TerraformVariable(stack, "managed_node_group_name", {
        type: "string",
        default: EksTerraformVariables.managedNodeGroupName[environment],
        description: "The name of the managed node group",
    });
    const managedNodeGroupInstanceType = new TerraformVariable(stack, "managed_node_group_instance_type", {
        type: "string",
        default: EksTerraformVariables.managedNodeGroupInstanceType[environment],
        description: "The instance type of the managed node group",
    });
    const managedNodeGroupMinSize = new TerraformVariable(stack, "managed_node_group_min_size", {
        type: "number",
        default: EksTerraformVariables.managedNodeGroupMinSize[environment],
        description: "The minimum size of the managed node group",
    });
    const managedNodeGroupMaxSize = new TerraformVariable(stack, "managed_node_group_max_size", {
        type: "number",
        default: EksTerraformVariables.managedNodeGroupMaxSize[environment],
        description: "The maximum size of the managed node group",
    });
    const managedNodeGroupDesiredSize = new TerraformVariable(stack, "managed_node_group_desired_size", {
        type: "number",
        default: EksTerraformVariables.managedNodeGroupDesiredSize[environment],
        description: "The desired size of the managed node group",
    });
    const managedNodeGroupCustomLaunchTemplate = new TerraformVariable(stack, "managed_node_group_custom_launch_template", {
        type: "bool",
        default: EksTerraformVariables.managedNodeGroupCustomLaunchTemplate[environment],
        description: "A boolean flag to use custom launch template for the managed node group",
    });
    const tags = new TerraformVariable(stack, "tags", {
        type: "map(string)",
        default: EksTerraformVariables.tags[environment],
        description: "A map of tags",
    });

    return {
        createVpc,
        createIgw,
        azs,
        intraSubnetNames,
        privateSubnetNames,
        publicSubnets,
        enableNatGateway,
        vpcName,
        eksClusterName,
        createAwsAuthConfigmap,
        manageAwsAuthConfigmap,
        createNodeSecurityGroup,
        createClusterSecurityGroup,
        createCloudwatchLogGroup,
        createIamRole,
        iamRoleName,
        managedNodeGroupName,
        managedNodeGroupInstanceType,
        managedNodeGroupMinSize,
        managedNodeGroupMaxSize,
        managedNodeGroupDesiredSize,
        managedNodeGroupCustomLaunchTemplate,
        tags
    };
}
