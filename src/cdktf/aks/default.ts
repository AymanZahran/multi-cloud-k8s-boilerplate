import { KubernetesManagementDir, RepoURL } from "../../const";

export const AksTerraformVariables: any = {
  aksResource_group_name: {
    dev: "dev-aks-rg",
    staging: "staging-aks-rg",
    prod: "prod-aks-rg",
  },
  aksPrefix: {
    dev: "dev",
    staging: "staging",
    prod: "prod",
  },
  aksVnetName: {
    dev: "dev-aks-vnet",
    staging: "staging-aks-vnet",
    prod: "prod-aks-vnet",
  },
  aksSubnetNames: {
    dev: ["dev-aks-subnet"],
    staging: ["staging-aks-subnet"],
    prod: ["prod-aks-subnet"],
  },
  aksSubnetPrefixes: {
    dev: ["10.0.0.0/24"],
    staging: ["10.0.0.0/24"],
    prod: ["10.0.0.0/24"],
  },
  aksAddressSpace: {
    dev: ["10.0.0.0/16"],
    staging: ["10.0.0.0/16"],
    prod: ["10.0.0.0/16"],
  },
  aksClusterName: {
    dev: "dev-aks-cluster",
    staging: "staging-aks-cluster",
    prod: "prod-aks-cluster",
  },
  aksAgentsSize: {
    dev: "Standard_B2s",
    staging: "Standard_B2s",
    prod: "Standard_B2s",
  },
  aksAgentsCount: {
    dev: 3,
    staging: 3,
    prod: 3,
  },
  aksAgentsMinCount: {
    dev: 3,
    staging: 3,
    prod: 3,
  },
  aksAgentsMaxCount: {
    dev: 3,
    staging: 3,
    prod: 3,
  },
  aksAgentsType: {
    dev: "VirtualMachineScaleSets",
    staging: "VirtualMachineScaleSets",
    prod: "VirtualMachineScaleSets",
  },
  aksEnableAutoScaling: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksAutoScalerProfileEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksStorageProfileEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksStorageProfileBlobDriverEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksStorageProfileDiskDriverEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksStorageProfileFileDriverEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksStorageProfileSnapshotControllerEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksKeyVaultSecretsProviderEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksRbacAadAzureRbacEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksRoleBasedAccessControlEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksAgentsPoolName: {
    dev: "dev",
    staging: "staging",
    prod: "prod",
  },
  aksNetworkPlugin: {
    dev: "azure",
    staging: "azure",
    prod: "azure",
  },
  aksLogAnalyticsWorkspaceEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksLogAnalyticsWorkspaceName: {
    dev: "dev-aks-log-analytics",
    staging: "staging-aks-log-analytics",
    prod: "prod-aks-log-analytics",
  },
  aksIngressApplicationGatewayEnabled: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksIngressApplicationGatewayName: {
    dev: "dev-aks-ingress",
    staging: "staging-aks-ingress",
    prod: "prod-aks-ingress",
  },
  aksIngressApplicationGatewaySubnetCidr: {
    dev: "10.0.10.0/16",
    staging: "10.0.10.0/16",
    prod: "10.0.10.0/16",
  },
  aksTags: {
    dev: {
      environment: "dev",
      "managed-by": "cdktf",
      provider: "azure",
      cluster: "dev-aks-cluster",
    },
    staging: {
      environment: "staging",
      "managed-by": "cdktf",
      provider: "azure",
      cluster: "dev-aks-cluster",
    },
    prod: {
      environment: "prod",
      "managed-by": "cdktf",
      provider: "azure",
      cluster: "dev-aks-cluster",
    },
  },
  aksInstallArgoCd: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksArgoCdNamespace: {
    dev: "argocd",
    staging: "argocd",
    prod: "argocd",
  },
  aksArgoCdCreateNamespace: {
    dev: true,
    staging: true,
    prod: true,
  },
  aksArgoCdReleaseName: {
    dev: "argocd",
    staging: "argocd",
    prod: "argocd",
  },
  aksArgoCdChartVersion: {
    dev: "5.39.0",
    staging: "5.39.0",
    prod: "5.39.0",
  },
  aksArgoCdTargetRepoUrl: {
    dev: RepoURL,
    staging: RepoURL,
    prod: RepoURL,
  },
  aksArgoCdProjectName: {
    dev: "default",
    staging: "default",
    prod: "default",
  },
  aksArgoCdApplicationName: {
    dev: "dev-aks-argocd",
    staging: "staging-aks-argocd",
    prod: "prod-aks-argocd",
  },
  aksArgoCdApplicationNamespace: {
    dev: "dev-aks-argocd",
    staging: "staging-aks-argocd",
    prod: "prod-aks-argocd",
  },
  aksArgoCdApplicationSourcePath: {
    dev: KubernetesManagementDir + "aks/" + "dev",
    staging: KubernetesManagementDir + "aks/" + "staging",
    prod: KubernetesManagementDir + "aks/" + "prod",
  },
};
