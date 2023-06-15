// CDKTF
import {App, TerraformStack, TerraformOutput, RemoteBackend, Fn, TerraformVariable} from 'cdktf';
import {Construct} from 'constructs';

// AWS
import {AwsProvider} from '@cdktf/provider-aws/lib/provider';
import {EksCluster} from '@cdktf/provider-aws/lib/eks-cluster';

// // Azure
// import {AzurermProvider} from '@cdktf/provider-azurerm/lib/provider';
// import {KubernetesCluster} from '@cdktf/provider-azurerm/lib/kubernetes-cluster';

// // GCP
// import {GoogleProvider} from '@cdktf/provider-google/lib/provider';

// Kubernetes
import {KubernetesProvider} from '@cdktf/provider-kubernetes/lib/provider';
import {Namespace} from '@cdktf/provider-kubernetes/lib/namespace';

// General
import {config} from 'dotenv';

// Load the values from the .env file into process.env
config();

interface StackConfig {
    environment: string;
    aws_region?: string;
    // azure_region?: string;
    // gcp_region?: string;
}

class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string, config: StackConfig) {
        super(scope, id);

        const {
            aws_region = "us-east-1",
            // azure_region = "eastus",
            // gcp_region = "us-central1",
        } = config;

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
        new AwsProvider(this, 'AWS', {
            profile: process.env.AWS_PROFILE || '',
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

        // Create an EKS cluster
        const eks_cluster = new EksCluster(this, 'eks_cluster', {
            name: eksClusterName.value,
            version: '1.24',
            roleArn: 'arn:aws:iam::123456789012:role/eks-cluster-role',
            vpcConfig: {
                subnetIds: ['subnet-abcde012', 'subnet-bcde012a', 'subnet-fghi345a'],
            },
            tags: {
                environment: config.environment,
            },
        });

        const eks_provider = new KubernetesProvider(this, 'EKS_KUBERNETES', {
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
        //         environment: config.environment,
        //     }
        // });
        //
        // const aks_provider = new KubernetesProvider(this, 'AKS_KUBERNETES', {
        //     host: aks_cluster.id,
        //     clusterCaCertificate: aks_cluster.kubeConfigRaw,
        // });



        new Namespace(this, 'flux-namespace', {
            metadata: {
                name: 'flux-system',
            },
        });

        // Terraform Outputs
        new TerraformOutput(this, 'eks_provider_key', {
            description: 'The EKS provider key',
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
//const stack = new MyStack(app, 'multi-cloud-cdktf');

const devStack = new MyStack(app, "dev", {
    environment: "dev",
    aws_region: "us-east-2",
    // azure_region: "eastus2",
    // gcp_region: "us-central1",
});
const stagingStack =new MyStack(app, "staging", {
    environment: "staging",
    aws_region: "us-east-2",
    // azure_region: "eastus2",
    // gcp_region: "us-central1",
});
const prodStack =new MyStack(app, "prod", {
    environment: "prod",
    aws_region: "us-east-2",
    // azure_region: "eastus2",
    // gcp_region: "us-central1",
});

for (const stack of [devStack, stagingStack, prodStack]) {
    new RemoteBackend(stack, {
        hostname: "app.terraform.io",
        organization: "Ayman-Organization",
        workspaces: {
            name: "multi-cloud",
        }
    })
}

app.synth();
