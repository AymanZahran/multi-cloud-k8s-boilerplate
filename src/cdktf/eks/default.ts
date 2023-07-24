import { KubernetesDir, RepoURL } from "../../const";

export const EksTerraformVariables: any = {
  eksCreateVpc: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCreateIgw: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksAzs: {
    dev: ["us-east-1a", "us-east-1b", "us-east-1c"],
    staging: ["us-east-1a", "us-east-1b", "us-east-1c"],
    prod: ["us-east-1a", "us-east-1b", "us-east-1c"],
  },
  eksPrivateSubnetNames: {
    dev: [
      "dev-eks-private-subnet-1",
      "dev-eks-private-subnet-2",
      "dev-eks-private-subnet-3",
    ],
    staging: [
      "staging-eks-private-subnet-1",
      "staging-eks-private-subnet-2",
      "staging-eks-private-subnet-3",
    ],
    prod: [
      "prod-eks-private-subnet-1",
      "prod-eks-private-subnet-2",
      "prod-eks-private-subnet-3",
    ],
  },
  eksPublicSubnetNames: {
    dev: [
      "dev-eks-public-subnet-1",
      "dev-eks-public-subnet-2",
      "dev-eks-public-subnet-3",
    ],
    staging: [
      "staging-eks-public-subnet-1",
      "staging-eks-public-subnet-2",
      "staging-eks-public-subnet-3",
    ],
    prod: [
      "prod-eks-public-subnet-1",
      "prod-eks-public-subnet-2",
      "prod-eks-public-subnet-3",
    ],
  },
  eksEnableNatGateway: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCidr: {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  },
  eksVpcName: {
    dev: "dev-eks-vpc",
    staging: "staging-eks-vpc",
    prod: "prod-eks-vpc",
  },
  eksClusterName: {
    dev: "dev-eks-cluster",
    staging: "staging-eks-cluster",
    prod: "prod-eks-cluster",
  },
  eksCreateAwsAuthConfigmap: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksManageAwsAuthConfigmap: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCreateNodeSecurityGroup: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCreateClusterSecurityGroup: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCreateCloudwatchLogGroup: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksCreateIamRole: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksIamRoleName: {
    dev: "dev-eks-iam-role",
    staging: "staging-eks-iam-role",
    prod: "prod-eks-iam-role",
  },
  eksManagedNodeGroupName: {
    dev: "dev-eks-managed-node-group",
    staging: "staging-eks-managed-node-group",
    prod: "prod-eks-managed-node-group",
  },
  eksManagedNodeGroupInstanceType: {
    dev: "t3.medium",
    staging: "t3.medium",
    prod: "t3.medium",
  },
  eksManagedNodeGroupMinSize: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  eksManagedNodeGroupMaxSize: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  eksManagedNodeGroupDesiredSize: {
    dev: 2,
    staging: 2,
    prod: 2,
  },
  eksTags: {
    dev: {
      environment: "dev",
      "managed-by": "cdktf",
      provider: "aws",
      cluster: "dev-eks-cluster",
    },
    staging: {
      environment: "staging",
      "managed-by": "cdktf",
      provider: "aws",
      cluster: "staging-eks-cluster",
    },
    prod: {
      environment: "prod",
      "managed-by": "cdktf",
      provider: "aws",
      cluster: "prod-eks-cluster",
    },
  },
  eksInstallArgoCd: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksArgoCdNamespace: {
    dev: "argocd",
    staging: "argocd",
    prod: "argocd",
  },
  eksArgoCdCreateNamespace: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksArgoCdReleaseName: {
    dev: "argocd",
    staging: "argocd",
    prod: "argocd",
  },
  eksArgoCdChartVersion: {
    dev: "5.39.0",
    staging: "5.39.0",
    prod: "5.39.0",
  },
  eksArgoCdTargetRepoUrl: {
    dev: RepoURL,
    staging: RepoURL,
    prod: RepoURL,
  },
  eksArgoCdProjectName: {
    dev: "default",
    staging: "default",
    prod: "default",
  },
  eksArgoCdApplicationName: {
    dev: "dev-eks-argocd",
    staging: "staging-eks-argocd",
    prod: "prod-eks-argocd",
  },
  eksArgoCdApplicationNamespace: {
    dev: "dev-eks-argocd",
    staging: "staging-eks-argocd",
    prod: "prod-eks-argocd",
  },
  eksArgoCdApplicationSourcePath: {
    dev: KubernetesDir + "/eks/" + "dev",
    staging: KubernetesDir + "/eks/" + "staging",
    prod: KubernetesDir + "/eks/" + "prod",
  },
};
