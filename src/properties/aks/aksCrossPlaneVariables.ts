export const AksCrossPlaneVariables: any = {
  aksVnetName: {
    dev: "aks-vnet-dev",
    staging: "aks-vnet-staging",
    prod: "aks-vnet-prod",
  },
  aksLocation: {
    dev: "eastus",
    staging: "eastus",
    prod: "eastus",
  },
  aksAddressPrefixes: {
    dev: ["10.0.0.0/16"],
    staging: ["10.0.0.0/16"],
    prod: ["10.0.0.0/16"],
  },
  aksProviderConfigRef: {
    dev: "azure-provider-config-dev",
    staging: "azure-provider-config-staging",
    prod: "azure-provider-config-prod",
  },
  aksResourceGroupNameRef: {
    dev: "aks-rg-dev",
    staging: "aks-rg-staging",
    prod: "aks-rg-prod",
  },
  aksSubnetName: {
    dev: "aks-subnet-dev",
    staging: "aks-subnet-staging",
    prod: "aks-subnet-prod",
  },
  aksAvailabilityZone: {
    dev: "3",
    staging: "3",
    prod: "3",
  },
  aksCidrBlock: {
    dev: "10.0.0.0/24",
    staging: "10.0.0.0/24",
    prod: "10.0.0.0/24",
  },
  aksMapPublicIpOnLaunch: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksClusterName: {
    dev: "aks-cluster-dev",
    staging: "aks-cluster-staging",
    prod: "aks-cluster-prod",
  },
  aksDisableRBAC: {
    dev: false,
    staging: false,
    prod: false,
  },
  aksDnsNamePrefix: {
    dev: "aks-cluster-dev",
    staging: "aks-cluster-staging",
    prod: "aks-cluster-prod",
  },
  aksNodeCount: {
    dev: 3,
    staging: 3,
    prod: 3,
  },
  aksNodeVMSize: {
    dev: "Standard_D2s_v3",
    staging: "Standard_D2s_v3",
    prod: "Standard_D2s_v3",
  },
  aksVersion: {
    dev: "1.19.11",
    staging: "1.19.11",
    prod: "1.19.11",
  },
  aksVnetSubnetIDRef: {
    dev: "aks-vnet-subnet-id-dev",
    staging: "aks-vnet-subnet-id-staging",
    prod: "aks-vnet-subnet-id-prod",
  },
  aksWriteConnectionSecretToRef: {
    dev: "aks-connection-secret-dev",
    staging: "aks-connection-secret-staging",
    prod: "aks-connection-secret-prod",
  },
  aksWriteConnectionSecretToRefNamespace: {
    dev: "aks-connection-secret-namespace-dev",
    staging: "aks-connection-secret-namespace-staging",
    prod: "aks-connection-secret-namespace-prod",
  },
};
