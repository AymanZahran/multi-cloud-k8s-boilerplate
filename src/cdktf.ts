import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { App, Fn, RemoteBackend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { config } from "dotenv";
import { AksCluster } from "./cdktf/aks/aks";

import { DefineAksVariables } from "./cdktf/aks/vars";
import { EksCluster } from "./cdktf/eks/eks";
import { DefineEksVariables } from "./cdktf/eks/vars";
import { AwsRegion, AzureRegion, Environment, StackConfig } from "./const";

config(); // Load the values from the .env file into process.env

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, configuration: StackConfig) {
    super(scope, id);

    // Create AWS Providers
    new AwsProvider(this, "AWS", {
      accessKey: process.env.AWS_ACCESS_KEY_ID || "",
      secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      region: configuration.region.aws,
    });

    // Create Azure Provider
    new AzurermProvider(this, "AZURE", {
      features: {},
      subscriptionId: process.env.AZURE_SUBSCRIPTION_ID || "",
      tenantId: process.env.AZURE_TENANT_ID || "",
      clientSecret: process.env.AZURE_CLIENT_SECRET || "",
      clientId: process.env.AZURE_CLIENT_ID || "",
    });

    const EksVariables = DefineEksVariables(this, configuration.environment);
    const eksCluster = new EksCluster(this, "eks", {
      region: configuration.region.aws,
      vpcName: EksVariables.eksVpcName.value,
      clusterName: EksVariables.eksClusterName.value,
    });

    const AksVariables = DefineAksVariables(this, configuration.environment);
    const aksCluster = new AksCluster(this, "aks", {
      location: configuration.region.azure,
      vnetName: AksVariables.aksVnetName.value,
      clusterName: AksVariables.aksClusterName.value,
      resourceGroupName: AksVariables.aksResourceGroupName.value,
    });

    // Create EKS Kubernetes Provider
    const eks_provider = new KubernetesProvider(this, "EKS_KUBERNETES", {
      host: eksCluster.getEksEndpoint,
      clusterCaCertificate: Fn.base64decode(
        eksCluster.getEksCertificateAutothority,
      ),
      alias: "eks-kubernetes",
    });

    // Create AKS Kubernetes Provider
    const aks_provider = new KubernetesProvider(this, "AKS_KUBERNETES", {
      host: aksCluster.getAksEndpoint,
      clusterCaCertificate: aksCluster.getEksCertificateAutothority,
      alias: "aks-kubernetes",
    });

    eks_provider.host = eksCluster.getEksEndpoint;
    aks_provider.host = aksCluster.getAksEndpoint;

    new Manifest(this, "argo-cd", {
      manifest: {
        __filename:
          "../kubernetes/" + configuration.environment + "/argo-cd.yaml",
      },
    });

    // Terraform Outputs
    new TerraformOutput(this, "eks_provider_endpoint", {
      value: eksCluster.getEksEndpoint,
      description: "The EKS provider endpoint",
    });
    new TerraformOutput(this, "aks_provider_endpoint", {
      value: aksCluster.getAksEndpoint,
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
const aws_region: AwsRegion = AwsRegion.us_east_1;
const azure_region: AzureRegion = AzureRegion.east_us;

for (const env of environments) {
  const stack = new MyStack(app, `${env}`, {
    environment: env,
    region: {
      aws: aws_region,
      azure: azure_region,
    },
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
