export const AksTerraformVariables: any = {
    resource_group_name: {
        dev: "dev-aks-rg",
        staging: "staging-aks-rg",
        prod: "prod-aks-rg",
    },
    vnetName: {
        dev: "dev-aks-vnet",
        staging: "staging-aks-vnet",
        prod: "prod-aks-vnet",
    },
    subnetNames: {
        dev: ["dev-aks-subnet-1", "dev-aks-subnet-2", "dev-aks-subnet-3"],
        staging: ["staging-aks-subnet-1", "staging-aks-subnet-2", "staging-aks-subnet-3"],
        prod: ["prod-aks-subnet-1", "prod-aks-subnet-2", "prod-aks-subnet-3"],
    },
    subnetPrefixes: {
        dev: ["10.0.0.0/16"],
        staging: ["10.0.0.0/16"],
        prod: ["10.0.0.0/16"],
    },
    clusterName: {
        dev: "dev-aks-cluster",
        staging: "staging-aks-cluster",
        prod: "prod-aks-cluster",
    },
    agentsSize: {
        dev: "Standard_B2s",
        staging: "Standard_B2s",
        prod: "Standard_B2s",
    },
    agentsCount: {
        dev: 3,
        staging: 3,
        prod: 3,
    },
    agentsMinCount: {
        dev: 3,
        staging: 3,
        prod: 3,
    },
    agentsMaxCount: {
        dev: 3,
        staging: 3,
        prod: 3,
    },
    agentsType: {
        dev: "VirtualMachineScaleSets",
        staging: "VirtualMachineScaleSets",
        prod: "VirtualMachineScaleSets",
    },
    enableAutoScaling: {
        dev: false,
        staging: false,
        prod: false,
    },
    autoScalerProfileEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    storageProfileEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    storageProfileBlobDriverEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    storageProfileDiskDriverEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    storageProfileFileDriverEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    storageProfileSnapshotControllerEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    keyVaultSecretsProviderEnabled: {
        dev: false,
        staging: false,
        prod: false,
    },
    agentsPoolName: {
        dev: "dev-aks-pool",
        staging: "staging-aks-pool",
        prod: "prod-aks-pool",
    },
    networkPlugin: {
        dev: "azure",
        staging: "azure",
        prod: "azure",
    },
    tags: {
        dev: {
            "environment": "dev",
            "managed-by": "cdktf",
            "provider": "azure",
            "cluster": "dev-aks-cluster",
        },
        staging: {
            "environment": "staging",
            "managed-by": "cdktf",
            "provider": "azure",
            "cluster": "dev-aks-cluster",
        },
        prod: {
            "environment": "prod",
            "managed-by": "cdktf",
            "provider": "azure",
            "cluster": "dev-aks-cluster",
        }
    },
};