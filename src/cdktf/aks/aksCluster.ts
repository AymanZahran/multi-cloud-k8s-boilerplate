import { HelmProvider } from "@cdktf/provider-helm/lib/provider";
import { Release } from "@cdktf/provider-helm/lib/release";
import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { Fn } from "cdktf";
import { Construct } from "constructs";
import { Aks } from "../../../.gen/modules/aks";
import { Vnet } from "../../../.gen/modules/vnet";
import { AzureRegion } from "../../const";

export interface AksClusterProps {
  readonly aksLocation: AzureRegion | undefined;
  readonly aksPrefix: string;
  readonly aksVnetName: string;
  readonly aksResourceGroupName: string;
  readonly aksSubnetNames: string[];
  readonly aksAddressSpace: string[];
  readonly aksSubnetPrefixes: string[];
  readonly aksClusterName: string;
  readonly aksAgentsSize: string;
  readonly aksAgentsCount: number;
  readonly aksAgentsMinCount: number;
  readonly aksAgentsMaxCount: number;
  readonly aksAgentsType: string;
  readonly aksEnableAutoScaling: boolean;
  readonly aksAutoScalerProfileEnabled: boolean;
  readonly aksStorageProfileEnabled: boolean;
  readonly aksStorageProfileBlobDriverEnabled: boolean;
  readonly aksStorageProfileDiskDriverEnabled: boolean;
  readonly aksStorageProfileFileDriverEnabled: boolean;
  readonly aksStorageProfileSnapshotControllerEnabled: boolean;
  readonly aksKeyVaultSecretsProviderEnabled: boolean;
  readonly aksRbacAadAzureRbacEnabled: boolean;
  readonly aksRoleBasedAccessControlEnabled: boolean;
  readonly aksAgentsPoolName: string;
  readonly aksNetworkPlugin: string;
  readonly aksLogAnalyticsWorkspaceEnabled: boolean;
  readonly aksLogAnalyticsWorkspaceName: string;
  readonly aksIngressApplicationGatewayEnabled: boolean;
  readonly aksIngressApplicationGatewayName: string;
  readonly aksIngressApplicationGatewaySubnetCidr: string;
  readonly aksTags?: { [key: string]: string };
  readonly aksInstallArgoCd: boolean;
  readonly aksArgoCdNamespace: string;
  readonly aksArgoCdCreateNamespace: boolean;
  readonly aksArgoCdReleaseName: string;
  readonly aksArgoCdChartVersion: string;
  readonly aksArgoCdTargetRepoUrl: string;
  readonly aksArgoCdProjectName: string;
  readonly aksArgoCdApplicationName: string;
  readonly aksArgoCdApplicationNamespace: string;
  readonly aksArgoCdApplicationSourcePath: string;
}

export class AksCluster extends Construct {
  private readonly vnet?: Vnet;
  private readonly aks?: Aks;

  constructor(scope: Construct, name: string, props: AksClusterProps) {
    super(scope, name);

    // Create Vnet
    this.vnet = new Vnet(this, "vnet", {
      vnetName: props.aksVnetName,
      resourceGroupName: props.aksResourceGroupName,
      vnetLocation: `${props.aksLocation}`,
      useForEach: true,
      subnetNames: props.aksSubnetNames,
      addressSpace: props.aksAddressSpace,
      subnetPrefixes: props.aksSubnetPrefixes,
      tags: props.aksTags,
    });

    // Create AKS cluster
    this.aks = new Aks(this, "aks", {
      dependsOn: [this.vnet],
      location: props.aksLocation,
      prefix: props.aksPrefix,
      // vnetSubnetId: this.vnet.vnetSubnetsOutput,
      // apiServerSubnetId: this.vnet.vnetSubnetsOutput,
      // podSubnetId: this.vnet.vnetSubnetsOutput,
      clusterName: props.aksClusterName,
      resourceGroupName: props.aksResourceGroupName,
      agentsSize: props.aksAgentsSize,
      agentsCount: props.aksAgentsCount,
      agentsMinCount: props.aksAgentsMinCount,
      agentsMaxCount: props.aksAgentsMaxCount,
      agentsType: props.aksAgentsType,
      enableAutoScaling: props.aksEnableAutoScaling,
      autoScalerProfileEnabled: props.aksAutoScalerProfileEnabled,
      storageProfileEnabled: props.aksStorageProfileEnabled,
      storageProfileBlobDriverEnabled: props.aksStorageProfileBlobDriverEnabled,
      storageProfileDiskDriverEnabled: props.aksStorageProfileDiskDriverEnabled,
      storageProfileFileDriverEnabled: props.aksStorageProfileFileDriverEnabled,
      storageProfileSnapshotControllerEnabled:
        props.aksStorageProfileSnapshotControllerEnabled,
      keyVaultSecretsProviderEnabled: props.aksKeyVaultSecretsProviderEnabled,
      rbacAadAzureRbacEnabled: props.aksRbacAadAzureRbacEnabled,
      roleBasedAccessControlEnabled: props.aksRoleBasedAccessControlEnabled,
      agentsPoolName: props.aksAgentsPoolName,
      networkPlugin: props.aksNetworkPlugin,
      logAnalyticsWorkspaceEnabled: props.aksLogAnalyticsWorkspaceEnabled,
      clusterLogAnalyticsWorkspaceName: props.aksLogAnalyticsWorkspaceName,
      logAnalyticsWorkspaceResourceGroupName: props.aksResourceGroupName,
      ingressApplicationGatewayEnabled:
        props.aksIngressApplicationGatewayEnabled,
      ingressApplicationGatewayName: props.aksIngressApplicationGatewayName,
      ingressApplicationGatewaySubnetCidr:
        props.aksIngressApplicationGatewaySubnetCidr,
      agentsLabels: props.aksTags,
      agentsTags: props.aksTags,
      tags: props.aksTags,
    });

    // Create AKS Kubernetes Provider
    const aks_kubernetes_provider = new KubernetesProvider(
      this,
      "AKS_KUBERNETES",
      {
        host: this.aks.hostOutput,
        clusterCaCertificate: Fn.base64decode(
          this.aks.adminClusterCaCertificateOutput,
        ),
        clientCertificate: Fn.base64decode(
          this.aks.adminClientCertificateOutput,
        ),
        clientKey: Fn.base64decode(this.aks.adminClientKeyOutput),
        alias: "aks_kubernetes",
      },
    );

    // Create AKS Helm Provider
    const aks_helm_provider = new HelmProvider(this, "AKS_HELM", {
      kubernetes: {
        host: this.aks.hostOutput,
        clusterCaCertificate: Fn.base64decode(
          this.aks.adminClusterCaCertificateOutput,
        ),
        clientCertificate: Fn.base64decode(
          this.aks.adminClientCertificateOutput,
        ),
        clientKey: Fn.base64decode(this.aks.adminClientKeyOutput),
      },
      alias: "aks_helm",
    });

    // Install ArgoCD on AKS Cluster
    const aks_argocd_install = new Release(this, "argo-cd-aks-install", {
      dependsOn: [this.aks],
      provider: aks_helm_provider,
      chart: "argo/argo-cd",
      repository: "https://argoproj.github.io/argo-helm",
      name: props.aksArgoCdReleaseName,
      namespace: props.aksArgoCdNamespace,
      createNamespace: props.aksArgoCdCreateNamespace,
      version: props.aksArgoCdChartVersion,
    });

    // Create ArgoCD Application
    new Manifest(this, "argo-cd-aks-application", {
      dependsOn: [aks_argocd_install],
      provider: aks_kubernetes_provider,
      manifest: {
        apiVersion: "argoproj.io/v1alpha1",
        kind: "Application",
        metadata: {
          name: props.aksArgoCdApplicationName,
          namespace: props.aksArgoCdApplicationNamespace,
          finalizers: ["resources-finalizer.argocd.argoproj.io"],
        },
        spec: {
          destination: {
            namespace: props.aksArgoCdNamespace,
            server: "https://kubernetes.default.svc",
          },
          project: props.aksArgoCdProjectName,
          source: {
            path: props.aksArgoCdApplicationSourcePath,
            repoURL: props.aksArgoCdTargetRepoUrl,
            targetRevision: "HEAD",
          },
        },
      },
    });
  }
}
