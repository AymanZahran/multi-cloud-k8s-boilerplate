import { Construct } from "constructs";
import { ArgoCd } from "./charts/argoCd";
import { CrossPlane } from "./charts/crossPlane";
import { AksClusterCrossPlane } from "./crossplane/aksClusterCrossPlane";
import { EksClusterCrossPlane } from "./crossplane/eksClusterCrossPlane";

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
  // EKS
  readonly eksVpcName?: string;
  readonly eksRegion?: string;
  readonly eksCidrBlock?: string;
  readonly eksEnableDnsHostNames?: boolean;
  readonly eksEnableDnsSupport?: boolean;
  readonly eksInstanceTenancy?: string;
  readonly eksProviderConfigRef?: string;
  readonly eksSubnetName?: string;
  readonly eksAvailabilityZone?: string[];
  readonly eksSubnetCidrBlock?: string[];
  readonly eksClusterName?: string;
  readonly eksEndpointPrivateAccess?: boolean;
  readonly eksEndpointPublicAccess?: boolean;
  readonly eksSecurityGroupIdRefs?: string[];
  readonly eksSubnetIdRefs?: string[];
  readonly eksRoleArnRef?: string;
  readonly eksVersion?: string;
  readonly eksWriteConnectionSecretToRef?: string;
  readonly eksWriteConnectionSecretToRefNamespace?: string;
  //AKS
  readonly aksVnetName?: string;
  readonly aksLocation?: string;
  readonly aksAddressPrefixes?: string[];
  readonly aksProviderConfigRef?: string;
  readonly aksResourceGroupNameRef?: string;
  readonly aksSubnetName?: string;
  readonly aksAvailabilityZone?: string;
  readonly aksCidrBlock?: string;
  readonly aksMapPublicIpOnLaunch?: boolean;
  readonly aksClusterName?: string;
  readonly aksDisableRBAC?: boolean;
  readonly aksDnsNamePrefix?: string;
  readonly aksNodeCount?: number;
  readonly aksNodeVMSize?: string;
  readonly aksVersion?: string;
  readonly aksVnetSubnetIDRef?: string;
  readonly aksWriteConnectionSecretToRef?: string;
  readonly aksWriteConnectionSecretToRefNamespace?: string;
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
        eksVpcName: props.eksVpcName,
        eksRegion: props.eksRegion,
        eksCidrBlock: props.eksCidrBlock,
        eksEnableDnsHostNames: props.eksEnableDnsHostNames,
        eksEnableDnsSupport: props.eksEnableDnsSupport,
        eksInstanceTenancy: props.eksInstanceTenancy,
        eksProviderConfigRef: props.eksProviderConfigRef,
        eksSubnetName: props.eksSubnetName,
        eksAvailabilityZone: props.eksAvailabilityZone,
        eksSubnetCidrBlock: props.eksSubnetCidrBlock,
        eksClusterName: props.eksClusterName,
        eksEndpointPrivateAccess: props.eksEndpointPrivateAccess,
        eksEndpointPublicAccess: props.eksEndpointPublicAccess,
        eksSecurityGroupIdRefs: props.eksSecurityGroupIdRefs,
        eksVersion: props.eksVersion,
        eksWriteConnectionSecretToRef: props.eksWriteConnectionSecretToRef,
        eksWriteConnectionSecretToRefNamespace:
          props.eksWriteConnectionSecretToRefNamespace,
      });
    } else {
      new AksClusterCrossPlane(this, "crossplane-aks-cluster", {
        aksVnetName: props.aksVnetName,
        aksLocation: props.aksLocation,
        aksAddressPrefixes: props.aksAddressPrefixes,
        aksProviderConfigRef: props.aksProviderConfigRef,
        aksResourceGroupNameRef: props.aksResourceGroupNameRef,
        aksSubnetName: props.aksSubnetName,
        aksAvailabilityZone: props.aksAvailabilityZone,
        aksCidrBlock: props.aksCidrBlock,
        aksMapPublicIpOnLaunch: props.aksMapPublicIpOnLaunch,
        aksClusterName: props.aksClusterName,
        aksDisableRBAC: props.aksDisableRBAC,
        aksDnsNamePrefix: props.aksDnsNamePrefix,
        aksNodeCount: props.aksNodeCount,
        aksNodeVMSize: props.aksNodeVMSize,
        aksVersion: props.aksVersion,
        aksVnetSubnetIDRef: props.aksVnetSubnetIDRef,
        aksWriteConnectionSecretToRef: props.aksWriteConnectionSecretToRef,
        aksWriteConnectionSecretToRefNamespace:
          props.aksWriteConnectionSecretToRefNamespace,
      });
    }
  }
}
