import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

import { HelmProvider } from "@cdktf/provider-helm/lib/provider";
import { Release } from "@cdktf/provider-helm/lib/release";
// import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { App, Fn, RemoteBackend, TerraformStack } from "cdktf";
import { Construct } from "constructs";
import { config } from "dotenv";
import { AksCluster } from "./cdktf/aks/aks";

import { DefineAksVariables } from "./cdktf/aks/vars";
import { EksCluster } from "./cdktf/eks/eks";
import { DefineEksVariables } from "./cdktf/eks/vars";
import {
  AwsRegion,
  AzureRegion,
  Environment,
  StackConfig,
  // RepoURL,
  // KubernetesDir,
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

    // Create EKS Cluster
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

    // Create AKS Cluster
    const AksVariables = DefineAksVariables(this, configuration.environment);
    const aksCluster = new AksCluster(this, "aks", {
      aksLocation: configuration.region.azure,
      aksPrefix: AksVariables.aksPrefix.value,
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
      aksRbacAadAzureRbacEnabled: AksVariables.aksRbacAadAzureRbacEnabled.value,
      aksRoleBasedAccessControlEnabled:
        AksVariables.aksRoleBasedAccessControlEnabled.value,
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
    const eks_kubernetes_provider = new KubernetesProvider(
      this,
      "EKS_KUBERNETES",
      {
        host: eksCluster.getEksEndpoint,
        clusterCaCertificate: Fn.base64decode(
          eksCluster.getEksCertificateAutothority,
        ),
        token: eksCluster.getEksClusterToken,
        alias: "eks_kubernetes",
      },
    );

    // Create AKS Kubernetes Provider
    const aks_kubernetes_provider = new KubernetesProvider(
      this,
      "AKS_KUBERNETES",
      {
        host: aksCluster.getAksEndpoint,
        clusterCaCertificate: Fn.base64decode(
          aksCluster.getAksAdminClusterCaCertificateOutput,
        ),
        clientCertificate: Fn.base64decode(
          aksCluster.getAksAdminClientCertificateOutput,
        ),
        clientKey: Fn.base64decode(aksCluster.getAksAdminClientKeyOutput),
        alias: "aks_kubernetes",
      },
    );

    // Create EKS Helm Provider
    const eks_helm_provider = new HelmProvider(this, "EKS_HELM", {
      kubernetes: {
        host: eksCluster.getEksEndpoint,
        clusterCaCertificate: Fn.base64decode(
          eksCluster.getEksCertificateAutothority,
        ),
      },
      alias: "eks_helm",
    });

    // Create AKS Helm Provider
    const aks_helm_provider = new HelmProvider(this, "AKS_HELM", {
      kubernetes: {
        host: aksCluster.getAksEndpoint,
        clusterCaCertificate: Fn.base64decode(
          aksCluster.getAksAdminClusterCaCertificateOutput,
        ),
        clientCertificate: Fn.base64decode(
          aksCluster.getAksAdminClientCertificateOutput,
        ),
        clientKey: Fn.base64decode(aksCluster.getAksAdminClientKeyOutput),
      },
      alias: "aks_helm",
    });

    // Install ArgoCD on EKS Cluster
    const eks_argocd_install = new Release(this, "argo-cd-eks-install", {
      dependsOn: [eksCluster.getEksCluster],
      provider: eks_helm_provider,
      chart: "argo/argo-cd",
      repository: "https://argoproj.github.io/argo-helm",
      name: "argocd",
      namespace: "argocd",
      createNamespace: true,
      version: "5.39.0",
    });

    // Install ArgoCD on AKS Cluster
    const aks_argocd_install = new Release(this, "argo-cd-aks-install", {
      dependsOn: [aksCluster.getAksCluster],
      provider: aks_helm_provider,
      chart: "argo/argo-cd",
      repository: "https://argoproj.github.io/argo-helm",
      name: "argocd",
      namespace: "argocd",
      createNamespace: true,
      version: "5.39.0",
    });

    // // Create EKS ArgoCD Application
    // new Manifest(this, "argo-cd-eks-application", {
    //   dependsOn: [eks_argocd_install],
    //   provider: eks_kubernetes_provider,
    //   manifest: {
    //     apiVersion: "argoproj.io/v1alpha1",
    //     kind: "Application",
    //     metadata: {
    //       name: "argocd-application",
    //       namespace: "argocd",
    //       finalizers: ["resources-finalizer.argocd.argoproj.io"],
    //     },
    //     spec: {
    //       destination: {
    //         namespace: "argocd",
    //         server: "https://kubernetes.default.svc",
    //       },
    //       project: "default",
    //       source: {
    //         path: KubernetesDir + "/eks/" + configuration.environment,
    //         repoURL: RepoURL,
    //         targetRevision: "HEAD",
    //       },
    //     },
    //   },
    // });
    //
    // // Create AKS ArgoCD Application
    // new Manifest(this, "argo-cd-aks-application", {
    //   dependsOn: [aks_argocd_install],
    //   provider: aks_kubernetes_provider,
    //   manifest: {
    //     apiVersion: "argoproj.io/v1alpha1",
    //     kind: "Application",
    //     metadata: {
    //       name: "argocd-application",
    //       namespace: "argocd",
    //       finalizers: ["resources-finalizer.argocd.argoproj.io"],
    //     },
    //     spec: {
    //       destination: {
    //         namespace: "argocd",
    //         server: "https://kubernetes.default.svc",
    //       },
    //       project: "default",
    //       source: {
    //         path: KubernetesDir + "/aks/" + configuration.environment,
    //         repoURL: RepoURL,
    //         targetRevision: "HEAD",
    //       },
    //     },
    //   },
    // });
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
