// AWS
import { EksCluster } from "@cdktf/provider-aws/lib/eks-cluster";
import { EksNodeGroup } from "@cdktf/provider-aws/lib/eks-node-group";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Subnet as AWS_Subnet } from "@cdktf/provider-aws/lib/subnet";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";

// // Azure
import { KubernetesCluster } from "@cdktf/provider-azurerm/lib/kubernetes-cluster";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Subnet as AZ_Subnet } from "@cdktf/provider-azurerm/lib/subnet";
import { VirtualNetwork } from "@cdktf/provider-azurerm/lib/virtual-network";

// Kubernetes
import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { App, Fn, RemoteBackend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";

// General
import { config } from "dotenv";
import { DefineAksVariables } from "./cdktf/aks";
import { DefineEksVariables } from "./cdktf/eks";
import { Environment } from "./const";

// Load the values from the .env file into process.env
config();

interface StackConfig {
  environment: Environment;
  aws_region?: string;
  azure_region?: string;
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, configuration: StackConfig) {
    super(scope, id);

    const { aws_region = "us-east-1", azure_region = "eastus" } = configuration;

    const EksVariables: any = DefineEksVariables(
      this,
      configuration.environment,
    );

    const AksVariables: any = DefineAksVariables(
      this,
      configuration.environment,
    );

    // Define Cloud Providers
    new AwsProvider(this, "AWS", {
      accessKey: process.env.AWS_ACCESS_KEY_ID || "",
      secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: aws_region,
    });
    new AzurermProvider(this, "AZURE", {
      features: {},
      subscriptionId: process.env.AZURE_SUBSCRIPTION_ID || "",
      tenantId: process.env.AZURE_TENANT_ID || "",
      clientSecret: process.env.AZURE_CLIENT_SECRET || "",
      clientId: process.env.AZURE_CLIENT_ID || "",
    });

    const vpc = new Vpc(this, "vpc", {
      cidrBlock: EksVariables.eksVpcCidrBlock.value,
      enableDnsHostnames: EksVariables.eksEnableDnsHostnames.value,
      tags: {
        environment: configuration.environment,
      },
    });
    const eks_subnets = [];
    for (let i = 0; i < EksVariables.eksNumberOfSubnets.value - 1; i++) {
      eks_subnets[i] = new AWS_Subnet(this, `subnet-${i}`, {
        vpcId: vpc.id,
        cidrBlock: `10.0.${i}.0/24`,
      }).id;
    }

    // Create an EKS cluster
    const eks_cluster = new EksCluster(this, "eks_cluster", {
      name: EksVariables.eksClusterName.value,
      version: EksVariables.eksControlPlaneVersion.value,
      roleArn: EksVariables.eksControlPlaneRoleArn.value,
      vpcConfig: {
        subnetIds: eks_subnets,
      },
      tags: {
        environment: configuration.environment,
      },
    });

    // Create an EKS Node Group
    new EksNodeGroup(this, "eks_node_group", {
      nodeGroupName: EksVariables.eksNodeGroupName.value,
      version: EksVariables.eksDataPlaneVersion.value,
      clusterName: eks_cluster.name,
      subnetIds: eks_subnets,
      scalingConfig: {
        minSize: EksVariables.eksNodeGroupMinSize.value,
        maxSize: EksVariables.eksNodeGroupMaxSize.value,
        desiredSize: EksVariables.eksNodeGroupDesiredSize.value,
      },
      nodeRoleArn: EksVariables.eksDataPlaneRoleArn.value,
      tags: {
        environment: configuration.environment,
      },
    });

    // Create EKS Kubernetes Provider
    const eks_provider = new KubernetesProvider(this, "EKS_KUBERNETES", {
      host: eks_cluster.endpoint,
      clusterCaCertificate: Fn.base64decode(
        eks_cluster.certificateAuthority.get(0).data,
      ),
      alias: "eks-kubernetes",
    });

    // Create Virtal Network and Subnet
    const vnet = new VirtualNetwork(this, "vnet", {
      name: AksVariables.aksVnetName.value,
      addressSpace: [AksVariables.aksVnetCidrBlock.value],
      location: azure_region,
      resourceGroupName: AksVariables.aksResourceGroupName.value,
      tags: {
        environment: configuration.environment,
      },
    });
    const aks_subnet = new AZ_Subnet(this, "aks-subnet", {
      resourceGroupName: AksVariables.aksResourceGroupName.value,
      virtualNetworkName: vnet.name,
      name: AksVariables.aksSubnetName.value,
      addressPrefixes: AksVariables.aksSubnetCidrBlock.value,
    });

    // Create an AKS cluster
    const aks_cluster = new KubernetesCluster(this, "aks_cluster", {
      name: AksVariables.aksClusterName.value,
      location: azure_region,
      kubernetesVersion: AksVariables.aksControlPlaneVersion.value,
      resourceGroupName: AksVariables.aksResourceGroupName.value,
      defaultNodePool: {
        name: AksVariables.aksNodePoolName.value,
        vmSize: AksVariables.aksNodePoolVmSize.value,
        orchestratorVersion: AksVariables.aksDataPlaneVersion.value,
        minCount: AksVariables.aksNodePoolMinCount.value,
        maxCount: AksVariables.aksNodePoolMaxCount.value,
        nodeCount: AksVariables.aksNodePoolCount.value,
        vnetSubnetId: aks_subnet.id,
        podSubnetId: aks_subnet.id,
      },
      tags: {
        environment: configuration.environment,
      },
    });

    // Create AKS Kubernetes Provider
    const aks_provider = new KubernetesProvider(this, "AKS_KUBERNETES", {
      host: aks_cluster.id,
      clusterCaCertificate: aks_cluster.kubeConfigRaw,
      alias: "aks-kubernetes",
    });

    new Manifest(this, "argo-cd", {
      manifest: {
        __filename:
          "../kubernetes/" + configuration.environment + "/argo-cd.yaml",
      },
    });

    // Terraform Outputs
    new TerraformOutput(this, "eks_provider_endpoint", {
      value: eks_provider.host,
      description: "The EKS provider endpoint",
    });
    new TerraformOutput(this, "aks_provider_endpoint", {
      value: aks_provider.host,
      description: "The AKS provider endpoint",
    });
  }
}

const app = new App();

const environments: any = [
  Environment.dev,
  Environment.staging,
  Environment.prod,
];
const aws_region = "us-east-2";
const azure_region = "eastus2";

for (const env of environments) {
  const stack = new MyStack(app, `${env}`, {
    environment: env,
    aws_region: aws_region,
    azure_region: azure_region,
  });
  new RemoteBackend(stack, {
    hostname: "app.terraform.io",
    organization: "multi-cloud-pipelines",
    workspaces: {
      name: env,
    },
  });
}

app.synth();
