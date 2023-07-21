import * as fs from "fs";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { App, Fn, RemoteBackend, TerraformOutput, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { config } from "dotenv";
import {parse} from "querystring";
import { AksCluster } from "./cdktf/aks/aks";

import { DefineAksVariables } from "./cdktf/aks/vars";
import { EksCluster } from "./cdktf/eks/eks";
import { DefineEksVariables } from "./cdktf/eks/vars";
import {
  AwsRegion,
  AzureRegion,
  Environment,
  StackConfig,
  RepoURL,
  KubernetesDir,
} from "./const";

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
      subscriptionId: process.env.ARM_SUBSCRIPTION_ID || "",
      tenantId: process.env.ARM_TENANT_ID || "",
      clientId: process.env.ARM_CLIENT_ID || "",
      clientSecret: process.env.ARM_CLIENT_SECRET || "",
    });

    const EksVariables = DefineEksVariables(this, configuration.environment);
    const eksCluster = new EksCluster(this, "eks", {
      eksRegion: configuration.region.aws,
      eksCreateVpc: EksVariables.eksCreateVpc.value,
      eksCreateIgw: EksVariables.eksCreateIgw.value,
      eksAzs: EksVariables.eksAzs.value,
      eksPrivateSubnetNames: EksVariables.eksPrivateSubnetNames.value,
      eksPublicSubnetNames: EksVariables.eksPublicSubnetNames.value,
      eksEnableNatGateway: EksVariables.eksEnableNatGateway.value,
      eksCidr: EksVariables.eksCidr.value,
      eksVpcName: EksVariables.eksVpcName.value,
      eksClusterName: EksVariables.eksClusterName.value,
      eksCreateAwsAuthConfigmap: EksVariables.eksCreateAwsAuthConfigmap.value,
      eksManageAwsAuthConfigmap: EksVariables.eksManageAwsAuthConfigmap.value,
      eksCreateNodeSecurityGroup: EksVariables.eksCreateNodeSecurityGroup.value,
      eksCreateClusterSecurityGroup:
        EksVariables.eksCreateClusterSecurityGroup.value,
      eksCreateCloudwatchLogGroup:
        EksVariables.eksCreateCloudwatchLogGroup.value,
      eksCreateIamRole: EksVariables.eksCreateIamRole.value,
      eksIamRoleName: EksVariables.eksIamRoleName.value,
      eksManagedNodeGroupName: EksVariables.eksManagedNodeGroupName.value,
      eksManagedNodeGroupInstanceType:
        EksVariables.eksManagedNodeGroupInstanceType.value,
      eksManagedNodeGroupMinSize: EksVariables.eksManagedNodeGroupMinSize.value,
      eksManagedNodeGroupMaxSize: EksVariables.eksManagedNodeGroupMaxSize.value,
      eksManagedNodeGroupDesiredSize:
        EksVariables.eksManagedNodeGroupDesiredSize.value,
      eksTags: EksVariables.eksTags.value,
    });

    const AksVariables = DefineAksVariables(this, configuration.environment);
    const aksCluster = new AksCluster(this, "aks", {
      aksLocation: configuration.region.azure,
      aksVnetName: AksVariables.aksVnetName.value,
      aksResourceGroupName: AksVariables.aksResourceGroupName.value,
      aksSubnetNames: AksVariables.aksSubnetNames.value,
      aksAddressSpace: AksVariables.aksAddressSpace.value,
      aksSubnetPrefixes: AksVariables.aksSubnetPrefixes.value,
      aksClusterName: AksVariables.aksClusterName.value,
      aksAgentsSize: AksVariables.aksAgentsSize.value,
      aksAgentsCount: AksVariables.aksAgentsCount.value,
      aksAgentsMinCount: AksVariables.aksAgentsMinCount.value,
      aksAgentsMaxCount: AksVariables.aksAgentsMaxCount.value,
      aksAgentsType: AksVariables.aksAgentsType.value,
      aksEnableAutoScaling: AksVariables.aksEnableAutoScaling.value,
      aksAutoScalerProfileEnabled:
        AksVariables.aksAutoScalerProfileEnabled.value,
      aksStorageProfileEnabled: AksVariables.aksStorageProfileEnabled.value,
      aksStorageProfileBlobDriverEnabled:
        AksVariables.aksStorageProfileBlobDriverEnabled.value,
      aksStorageProfileDiskDriverEnabled:
        AksVariables.aksStorageProfileDiskDriverEnabled.value,
      aksStorageProfileFileDriverEnabled:
        AksVariables.aksStorageProfileFileDriverEnabled.value,
      aksStorageProfileSnapshotControllerEnabled:
        AksVariables.aksStorageProfileSnapshotControllerEnabled.value,
      aksKeyVaultSecretsProviderEnabled:
        AksVariables.aksKeyVaultSecretsProviderEnabled.value,
      aksAgentsPoolName: AksVariables.aksAgentsPoolName.value,
      aksNetworkPlugin: AksVariables.aksNetworkPlugin.value,
      aksLogAnalyticsWorkspaceEnabled:
        AksVariables.aksLogAnalyticsWorkspaceEnabled.value,
      aksLogAnalyticsWorkspaceName:
        AksVariables.aksLogAnalyticsWorkspaceName.value,
      aksIngressApplicationGatewayEnabled:
        AksVariables.aksIngressApplicationGatewayEnabled.value,
      aksIngressApplicationGatewayName:
        AksVariables.aksIngressApplicationGatewayName.value,
      aksIngressApplicationGatewaySubnetCidr:
        AksVariables.aksIngressApplicationGatewaySubnetCidr.value,
      aksTags: AksVariables.aksTags.value,
    });

    // Create EKS Kubernetes Provider
    const eks_provider = new KubernetesProvider(this, "EKS_KUBERNETES", {
      host: eksCluster.getEksEndpoint,
      clusterCaCertificate: Fn.base64decode(
        eksCluster.getEksCertificateAutothority,
      ),
      alias: "eks",
    });

    // Create AKS Kubernetes Provider
    const aks_provider = new KubernetesProvider(this, "AKS_KUBERNETES", {
      host: aksCluster.getAksEndpoint,
      clusterCaCertificate: aksCluster.getEksCertificateAutothority,
      alias: "aks",
    });

    // Install ArgoCD and Create the applications
    for (const provider of [eks_provider, aks_provider]) {
      const argocd_install = new Manifest(
        this,
        "argo-cd-" + provider.alias + "-install",
        {
          provider: provider,
          manifest: parse(
              fs.readFileSync(
                KubernetesDir +
                  "/" +
                  provider.alias +
                  "/" +
                  configuration.environment +
                  "/argo-cd.yaml",
                "utf8",
              ),
          ),
        },
      );

      new Manifest(this, "argo-cd-" + provider.alias + "-application", {
        dependsOn: [argocd_install],
        provider: provider,
        manifest: {
          apiVersion: "argoproj.io/v1alpha1",
          kind: "Application",
          metadata: {
            name: "argocd-application",
            namespace: "argocd",
            finalizers: ["resources-finalizer.argocd.argoproj.io"],
          },
          spec: {
            destination: {
              namespace: "argocd",
              server: "https://kubernetes.default.svc",
            },
            project: "default",
            source: {
              path:
                KubernetesDir +
                "/" +
                provider.alias +
                "/" +
                configuration.environment,
              repoURL: RepoURL,
              targetRevision: "HEAD",
            },
          },
        },
      });
    }

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
