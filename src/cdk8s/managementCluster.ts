import { Construct } from "constructs";
import { ArgoCd } from "./charts/argoCd";
import { CrossPlane } from "./charts/crossPlane";
import { AksClusterCrossPlane } from "./crosslane/aks/aksClusterCrossPlane";
import { EksClusterCrossPlane } from "./crosslane/eks/eksClusterCrossPlane";

export interface ManagementClusterProps {
  readonly app: any;
  readonly environment: string;
  readonly provider: string;
  readonly ArgoCdHelmChartLabels?: any;
  readonly ArgoCdHelmChartsFlags?: string[];
  readonly ArgoCdHelmChartVersion?: string;
  readonly ArgoCdHelmChartValues?: any;
  readonly CrossPlaneHelmChartLabels?: any;
  readonly CrossPlaneHelmChartsFlags?: string[];
  readonly CrossPlaneHelmChartVersion?: string;
  readonly CrossPlaneHelmChartValues?: any;
  readonly iamRoleArn?: string;
  readonly tenantId?: string;
  readonly subscriptionId?: string;
  readonly clientId?: string;
  readonly crossPlaneServiceAccountName?: string;
}

export class ManagementCluster extends Construct {
  readonly crossPlane: CrossPlane;
  readonly argocd: ArgoCd;

  constructor(scope: Construct, name: string, props: ManagementClusterProps) {
    super(scope, name);
    this.argocd = new ArgoCd(props.app, "argo-cd", {
      clusterType: "management",
      provider: props.provider,
      environment: props.environment,
      helmFlags: props.ArgoCdHelmChartsFlags,
      version: props.ArgoCdHelmChartVersion,
      values: props.ArgoCdHelmChartValues,
      labels: props.ArgoCdHelmChartLabels,
    });
    this.crossPlane = new CrossPlane(props.app, "crossplane", {
      provider: props.provider,
      labels: props.CrossPlaneHelmChartLabels,
      helmFlags: props.CrossPlaneHelmChartsFlags,
      version: props.CrossPlaneHelmChartVersion,
      values: props.CrossPlaneHelmChartValues,
      iamRoleArn: props.iamRoleArn,
      tenantId: props.tenantId,
      subscriptionId: props.subscriptionId,
      clientId: props.clientId,
      crossPlaneServiceAccountName: props.crossPlaneServiceAccountName,
    });

    if (props.provider === "eks") {
      new EksClusterCrossPlane(this, "crossplane-eks-cluster", {
        vpcName: "crossplane-eks-cluster-vnet",
        region: "us-east-1",
        cidrBlock: "10.0.0.0/16",
        enableDnsHostNames: true,
        enableDnsSupport: true,
        instanceTenancy: "default",
        providerConfigRef: "aws-provider",
        subnetName: "crossplane-eks-cluster-subnet",
        availabilityZone: ["us-east-1a", "us-east-1b", "us-east-1c"],
        subnetCidrBlock: ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"],
        clusterName: "crossplane-eks-cluster",
        endpointPrivateAccess: true,
        endpointPublicAccess: true,
        securityGroupIdRefs: ["crossplane-eks-cluster-sg"],
        version: "1.18",
        writeConnectionSecretToRef: "crossplane-eks-cluster-connection-secret",
        writeConnectionSecretToRefNamespace: "default",
      });
    } else {
      new AksClusterCrossPlane(this, "crossplane-aks-cluster", {
        vnetName: "crossplane-aks-cluster-vnet",
        location: "eastus",
        addressPrefixes: ["10.0.0.0/16"],
        providerConfigRef: "azure-provider",
        resourceGroupNameRef: "crossplane-aks-cluster-rg",
        subnetName: "crossplane-aks-cluster-subnet",
        availabilityZone: "3",
        cidrBlock: "10.0.0.0/24",
        mapPublicIpOnLaunch: true,
        clusterName: "crossplane-aks-cluster",
        disableRBAC: false,
        dnsNamePrefix: "crossplane-aks-cluster",
        nodeCount: 3,
        nodeVMSize: "Standard_D2_v2",
        version: "1.18.14",
        vnetSubnetIDRef: "crossplane-aks-cluster-subnet",
        writeConnectionSecretToRef: "crossplane-aks-cluster-connection-secret",
        writeConnectionSecretToRefNamespace: "default",
      });
    }
  }
}
