import { Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { EksCrossPlane } from "../managedResources/eks";
import { VpcCrossPlane } from "../managedResources/vpc";

export interface EksClusterCrossPlaneProps extends ChartProps {
  readonly vpcName?: string;
  readonly region?: string;
  readonly cidrBlock?: string;
  readonly enableDnsHostNames?: boolean;
  readonly enableDnsSupport?: boolean;
  readonly instanceTenancy?: string;
  readonly providerConfigRef?: string;
  readonly subnetName?: string;
  readonly availabilityZone?: string[];
  readonly subnetCidrBlock?: string[];
  readonly clusterName?: string;
  readonly endpointPrivateAccess?: boolean;
  readonly endpointPublicAccess?: boolean;
  readonly securityGroupIdRefs?: string[];
  readonly subnetIdRefs?: string[];
  readonly roleArnRef?: string;
  readonly version?: string;
  readonly writeConnectionSecretToRef?: string;
  readonly writeConnectionSecretToRefNamespace?: string;
}

export class EksClusterCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: EksClusterCrossPlaneProps) {
    super(scope, id, props);

    new VpcCrossPlane(this, "crossplane-eks-cluster-vnet", {
      name: props.vpcName,
      region: props.region,
      cidrBlock: props.cidrBlock,
      enableDnsHostNames: props.enableDnsHostNames,
      enableDnsSupport: props.enableDnsSupport,
      instanceTenancy: props.instanceTenancy,
      providerConfigRef: props.providerConfigRef,
      subnetName: props.subnetName,
      availabilityZone: props.availabilityZone,
      subnetCidrBlock: props.subnetCidrBlock,
    });

    new EksCrossPlane(this, "crossplane-eks-cluster", {
      name: props.clusterName,
      region: props.region,
      endpointPrivateAccess: props.endpointPrivateAccess,
      endpointPublicAccess: props.endpointPublicAccess,
      securityGroupIdRefs: props.securityGroupIdRefs,
      subnetIdRefs: props.subnetIdRefs,
      roleArnRef: props.roleArnRef,
      version: props.version,
      providerConfigRef: props.providerConfigRef,
      writeConnectionSecretToRef: props.writeConnectionSecretToRef,
      writeConnectionSecretToRefNamespace:
        props.writeConnectionSecretToRefNamespace,
    });
  }
}
