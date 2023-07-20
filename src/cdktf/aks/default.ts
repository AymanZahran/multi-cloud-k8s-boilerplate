export const AksTerraformVariables: any = {
  aksResource_group_name: {
    dev: "dev-aks-rg",
    staging: "staging-aks-rg",
    prod: "prod-aks-rg",
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
    dev: false,
    staging: false,
    prod: false,
  },
  aksAutoScalerProfileEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksStorageProfileEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksStorageProfileBlobDriverEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksStorageProfileDiskDriverEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksStorageProfileFileDriverEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksStorageProfileSnapshotControllerEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksKeyVaultSecretsProviderEnabled: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksAgentsPoolName: {
    dev: "dev-aks-pool",
    staging: "staging-aks-pool",
    prod: "prod-aks-pool",
  },
  aksNetworkPlugin: {
    dev: "azure",
    staging: "azure",
    prod: "azure",
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
};
