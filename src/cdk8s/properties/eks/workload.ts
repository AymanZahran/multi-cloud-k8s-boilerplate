export const EksWorkloadClusterVars: any = {
  eksVpcName: {
    dev: "dev-eks-vpc",
    staging: "staging-eks-vpc",
    prod: "prod-eks-vpc",
  },
  eksRegion: {
    dev: "us-east-1",
    staging: "us-east-1",
    prod: "us-east-1",
  },
  eksCidrBlock: {
    dev: "10.0.0.0/16",
    staging: "10.0.0.0/16",
    prod: "10.0.0.0/16",
  },
  eksEnableDnsHostNames: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksEnableDnsSupport: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksInstanceTenancy: {
    dev: "default",
    staging: "default",
    prod: "default",
  },
  eksProviderConfigRef: {
    dev: "aws-provider",
    staging: "aws-provider",
    prod: "aws-provider",
  },
  eksSubnetName: {
    dev: "dev-eks-subnet",
    staging: "staging-eks-subnet",
    prod: "prod-eks-subnet",
  },
  eksAvailabilityZone: {
    dev: ["us-east-1a", "us-east-1b", "us-east-1c"],
    staging: ["us-east-1a", "us-east-1b", "us-east-1c"],
    prod: ["us-east-1a", "us-east-1b", "us-east-1c"],
  },
  eksSubnetCidrBlock: {
    dev: ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"],
    staging: ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"],
    prod: ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"],
  },
  eksClusterName: {
    dev: "dev-eks-cluster",
    staging: "staging-eks-cluster",
    prod: "prod-eks-cluster",
  },
  eksEndpointPrivateAccess: {
    dev: false,
    staging: false,
    prod: false,
  },
  eksEndpointPublicAccess: {
    dev: true,
    staging: true,
    prod: true,
  },
  eksSecurityGroupIdRefs: {
    dev: ["dev-eks-security-group"],
    staging: ["staging-eks-security-group"],
    prod: ["prod-eks-security-group"],
  },
  eksSubnetIdRefs: {
    dev: ["dev-eks-subnet"],
    staging: ["staging-eks-subnet"],
    prod: ["prod-eks-subnet"],
  },
  eksRoleArnRef: {
    dev: "dev-eks-role",
    staging: "staging-eks-role",
    prod: "prod-eks-role",
  },
  eksVersion: {
    dev: "1.18",
    staging: "1.18",
    prod: "1.18",
  },
  eksWriteConnectionSecretToRef: {
    dev: "dev-eks-connection-secret",
    staging: "staging-eks-connection-secret",
    prod: "prod-eks-connection-secret",
  },
  eksWriteConnectionSecretToRefNamespace: {
    dev: "dev",
    staging: "staging",
    prod: "prod",
  },
};
