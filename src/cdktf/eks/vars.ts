import {TerraformStack, TerraformVariable} from "cdktf";
import {EksTerraformVariables} from "./default";
import {Environment} from "../../const";

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
    const eksPublicSubnetNames = new TerraformVariable(
        stack,
        "eks_public_subnet_names",
        {
            type: "list(string)",
            default: EksTerraformVariables.eksPublicSubnetNames[environment],
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
    const eksTags = new TerraformVariable(stack, "eks_tags", {
        type: "map(string)",
        default: EksTerraformVariables.eksTags[environment],
        description: "A map of tags",
    });
    const eksInstallArgoCd = new TerraformVariable(stack, "eks_install_argo_cd", {
        type: "bool",
        default: EksTerraformVariables.eksInstallArgoCd[environment],
        description: "A boolean flag to install Argo CD",
    });
    const eksArgoCdNamespace = new TerraformVariable(
        stack,
        "eks_argo_cd_namespace",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdNamespace[environment],
            description: "The namespace for Argo CD",
        },
    );
    const eksArgoCdCreateNamespace = new TerraformVariable(
        stack,
        "eks_argo_cd_create_namespace",
        {
            type: "bool",
            default: EksTerraformVariables.eksArgoCdCreateNamespace[environment],
            description: "A boolean flag to create Argo CD namespace",
        },
    );
    const eksArgoCdReleaseName = new TerraformVariable(
        stack,
        "eks_argo_cd_release_name",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdReleaseName[environment],
            description: "The release name for Argo CD",
        },
    );
    const eksArgoCdChartVersion = new TerraformVariable(
        stack,
        "eks_argo_cd_chart_version",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdChartVersion[environment],
            description: "The chart version for Argo CD",
        },
    );
    const eksArgoCdTargetRepoUrl = new TerraformVariable(
        stack,
        "eks_argo_cd_target_repo_url",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdTargetRepoUrl[environment],
            description: "The target repo url for Argo CD",
        },
    );
    const eksArgoCdProjectName = new TerraformVariable(
        stack,
        "eks_argo_cd_project_name",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdProjectName[environment],
            description: "The project name for Argo CD",
        },
    );
    const eksArgoCdApplicationName = new TerraformVariable(
        stack,
        "eks_argo_cd_application_name",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdApplicationName[environment],
            description: "The application name for Argo CD",
        },
    );
    const eksArgoCdApplicationNamespace = new TerraformVariable(
        stack,
        "eks_argo_cd_application_namespace",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdApplicationNamespace[environment],
            description: "The application namespace for Argo CD",
        },
    );
    const eksArgoCdApplicationSourcePath = new TerraformVariable(
        stack,
        "eks_argo_cd_application_source_path",
        {
            type: "string",
            default: EksTerraformVariables.eksArgoCdApplicationSourcePath[environment],
            description: "The application source path for Argo CD",
        });

    return {
        eksCreateVpc,
        eksCreateIgw,
        eksAzs,
        eksPrivateSubnetNames,
        eksPublicSubnetNames,
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
        eksTags,
        eksInstallArgoCd,
        eksArgoCdNamespace,
        eksArgoCdCreateNamespace,
        eksArgoCdReleaseName,
        eksArgoCdChartVersion,
        eksArgoCdTargetRepoUrl,
        eksArgoCdProjectName,
        eksArgoCdApplicationName,
        eksArgoCdApplicationNamespace,
        eksArgoCdApplicationSourcePath,
    };
}
