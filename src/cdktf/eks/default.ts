export const EksTerraformVariables: any = {
    createVpc: {
        dev: true,
        staging: true,
        prod: true,
    },
    createIgw: {
        dev: true,
        staging: true,
        prod: true,
    },
    azs: {
        dev: ["us-east-1a", "us-east-1b", "us-east-1c"],
        staging: ["us-east-1a", "us-east-1b", "us-east-1c"],
        prod: ["us-east-1a", "us-east-1b", "us-east-1c"],
    },
    intraSubnetNames: {
        dev: ["dev-eks-intra-subnet-1", "dev-eks-intra-subnet-2", "dev-eks-intra-subnet-3"],
        staging: ["staging-eks-intra-subnet-1", "staging-eks-intra-subnet-2", "staging-eks-intra-subnet-3"],
        prod: ["prod-eks-intra-subnet-1", "prod-eks-intra-subnet-2", "prod-eks-intra-subnet-3"],
    },
    privateSubnetNames: {
        dev: ["dev-eks-private-subnet-1", "dev-eks-private-subnet-2", "dev-eks-private-subnet-3"],
        staging: ["staging-eks-private-subnet-1", "staging-eks-private-subnet-2", "staging-eks-private-subnet-3"],
        prod: ["prod-eks-private-subnet-1", "prod-eks-private-subnet-2", "prod-eks-private-subnet-3"],
    },
    publicSubnets: {
        dev: ["dev-eks-public-subnet-1", "dev-eks-public-subnet-2", "dev-eks-public-subnet-3"],
        staging: ["staging-eks-public-subnet-1", "staging-eks-public-subnet-2", "staging-eks-public-subnet-3"],
        prod: ["prod-eks-public-subnet-1", "prod-eks-public-subnet-2", "prod-eks-public-subnet-3"],
    },
    enableNatGateway: {
        dev: true,
        staging: true,
        prod: true,
    },
    vpcName: {
        dev: "dev-eks-vpc",
        staging: "staging-eks-vpc",
        prod: "prod-eks-vpc",
    },
    clusterName: {
        dev: "dev-eks-cluster",
        staging: "staging-eks-cluster",
        prod: "prod-eks-cluster",
    },
    createAwsAuthConfigmap: {
        dev: true,
        staging: true,
        prod: true,
    },
    manageAwsAuthConfigmap: {
        dev: true,
        staging: true,
        prod: true,
    },
    createNodeSecurityGroup: {
        dev: true,
        staging: true,
        prod: true,
    },
    createClusterSecurityGroup: {
        dev: true,
        staging: true,
        prod: true,
    },
    createCloudwatchLogGroup: {
        dev: true,
        staging: true,
        prod: true,
    },
    createIamRoles: {
        dev: true,
        staging: true,
        prod: true,
    },
    iamRoleName: {
        dev: "dev-eks-iam-role",
        staging: "staging-eks-iam-role",
        prod: "prod-eks-iam-role",
    },
    managedNodeGroupName: {
        dev: "dev-eks-managed-node-group",
        staging: "staging-eks-managed-node-group",
        prod: "prod-eks-managed-node-group",
    },
    managedNodeGroupInstanceType: {
        dev: "t3.medium",
        staging: "t3.medium",
        prod: "t3.medium",
    },
    managedNodeGroupMinSize: {
        dev: 2,
        staging: 2,
        prod: 2,
    },
    managedNodeGroupMaxSize: {
        dev: 2,
        staging: 2,
        prod: 2,
    },
    managedNodeGroupDesiredSize: {
        dev: 2,
        staging: 2,
        prod: 2,
    },
    managedNodeGroupCustomLaunchTemplate: {
        dev: false,
        staging: false,
        prod: false,
    },
    tags: {
        dev: {
            "environment": "dev",
            "managed-by": "cdktf",
            "provider": "aws",
            "cluster": "dev-eks-cluster"
        },
        staging: {
            "environment": "staging",
            "managed-by": "cdktf",
            "provider": "aws",
            "cluster": "staging-eks-cluster"
        },
        prod: {
            "environment": "prod",
            "managed-by": "cdktf",
            "provider": "aws",
            "cluster": "prod-eks-cluster"
        }
    },
};