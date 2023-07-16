// CDKTF

// AWS
import { EksCluster } from "@cdktf/provider-aws/lib/eks-cluster";
import { EksNodeGroup } from "@cdktf/provider-aws/lib/eks-node-group";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Subnet } from "@cdktf/provider-aws/lib/subnet";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";

// // Azure
// import {AzurermProvider} from '@cdktf/provider-azurerm/lib/provider';
// import {KubernetesCluster} from '@cdktf/provider-azurerm/lib/kubernetes-cluster';

// // GCP
// import {GoogleProvider} from '@cdktf/provider-google/lib/provider';

// Kubernetes
import { Namespace } from "@cdktf/provider-kubernetes/lib/namespace";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import {
  App,
  TerraformStack,
  TerraformOutput,
  RemoteBackend,
  Fn,
  TerraformVariable,
} from "cdktf";
import { Construct } from "constructs";

// General
import { config } from "dotenv";

// Load the values from the .env file into process.env
config();

interface StackConfig {
  environment: string;
  aws_region?: string;
  // azure_region?: string;
  // gcp_region?: string;
}

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, configuration: StackConfig) {
    super(scope, id);

    const {
      aws_region = "us-east-1",
      // azure_region = "eastus",
      // gcp_region = "us-central1",
    } = configuration;

    // Define Terraform Variables
    const eksClusterName = new TerraformVariable(this, "eks_cluster_name", {
      type: "string",
      default: "eks-cluster",
      description: "The name of the EKS cluster",
    });
    // const aksClusterName = new TerraformVariable(this, "aks_cluster_name", {
    //     type: "string",
    //     default: "aks-cluster",
    //     description: "The name of the AKS cluster",
    // });
    // const gkeClusterName = new TerraformVariable(this, "gke_cluster_name", {
    //     type: "string",
    //     default: "gke-cluster",
    //     description: "The name of the GKE cluster",
    // });

    // Define Cloud Providers
    new AwsProvider(this, "AWS", {
      // profile: process.env.AWS_PROFILE || '',
      accessKey: process.env.AWS_ACCESS_KEY_ID || "",
      secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: aws_region,
    });
    // new AzurermProvider(this, 'AZURE', {
    //     features: {},
    //     subscriptionId: process.env.AZURE_SUBSCRIPTION_ID || '',
    //     tenantId: process.env.AZURE_TENANT_ID || '',
    //     clientSecret: process.env.AZURE_CLIENT_SECRET || '',
    //     clientId: process.env.AZURE_CLIENT_ID || '',
    // });
    // new GoogleProvider(this, 'GOOGLE', {
    //     region: process.env.GOOGLE_REGION || '',
    //     project: process.env.GOOGLE_PROJECT || '',
    //     zone: process.env.GOOGLE_ZONE || '',
    // });

    const vpc = new Vpc(this, "vpc", {
      cidrBlock: "10.0.0.0/16",
      enableDnsHostnames: true,
    });

    // Create array to store IDs
    const subnet = [];
    for (let i = 0; i < 3; i++) {
      subnet[i] = new Subnet(this, `subnet-${i}`, {
        vpcId: vpc.id,
        cidrBlock: `10.0.${i}.0/24`,
      }).id;
    }

    // Create an EKS cluster
    const eks_cluster = new EksCluster(this, "eks_cluster", {
      name: eksClusterName.value,
      version: "1.24",
      roleArn: "arn:aws:iam::123456789012:role/eks-cluster-role",
      vpcConfig: {
        subnetIds: subnet,
      },
      tags: {
        environment: configuration.environment,
      },
    });

    // Create an EKS Node Group
    new EksNodeGroup(this, "eks_node_group", {
      nodeGroupName: "eks-node-group",
      version: "1.24",
      clusterName: eks_cluster.name,
      subnetIds: subnet,
      scalingConfig: {
        desiredSize: 2,
        minSize: 2,
        maxSize: 2,
      },
      nodeRoleArn: "arn:aws:iam::123456789012:role/eks-node-role",
    });

    const eks_provider = new KubernetesProvider(this, "EKS_KUBERNETES", {
      host: eks_cluster.endpoint,
      clusterCaCertificate: Fn.base64decode(
        eks_cluster.certificateAuthority.get(0).data,
      ),
    });

    // const aks_cluster = new KubernetesCluster(this, 'aks_cluster', {
    //     name: aksClusterName.value,
    //     location: azure_region,
    //     resourceGroupName: 'kubernetes',
    //     defaultNodePool: {
    //         name: 'default',
    //         vmSize: 'Standard_D2_v2',
    //     },
    //     tags: {
    //         environment: configuration.environment,
    //     }
    // });
    //
    // const aks_provider = new KubernetesProvider(this, 'AKS_KUBERNETES', {
    //     host: aks_cluster.id,
    //     clusterCaCertificate: aks_cluster.kubeConfigRaw,
    // });

    new Namespace(this, "flux-namespace", {
      metadata: {
        name: "flux-system",
      },
    });

    // Terraform Outputs
    new TerraformOutput(this, "eks_provider_key", {
      description: "The EKS provider key",
      value: eks_provider.host,
    });
    // new TerraformOutput(this, 'aks_provider_key', {
    //     value: aks_provider.clientKey,
    //     description: 'The AKS provider key',
    // });
    // new TerraformOutput(this, 'gcp_region', {
    //     value: gcp_region,
    //     description: 'The GCP region',
    // });
    // new TerraformOutput(this, 'gcp_cluster_name', {
    //     value: gkeClusterName.value,
    //     description: 'The GKE cluster name',
    // });
  }
}

const app = new App();

const environments = ["dev", "staging", "prod"];
const aws_region = "us-east-2";

for (const env of environments) {
  const stack = new MyStack(app, `${env}`, {
    environment: env,
    aws_region: aws_region,
    // azure_region: "eastus2",
    // gcp_region: "us-central1",
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
