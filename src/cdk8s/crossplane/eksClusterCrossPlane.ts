import { Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { EksCrossPlane } from "./managedResources/eksCrossPlane";
import { VpcCrossPlane } from "./managedResources/vpcCrossPlane";

export interface EksClusterCrossPlaneProps extends ChartProps {
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
}

export class EksClusterCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: EksClusterCrossPlaneProps) {
    super(scope, id, props);

    new VpcCrossPlane(this, "crossplane-eks-cluster-vnet", {
      name: props.eksVpcName,
      region: props.eksRegion,
      cidrBlock: props.eksCidrBlock,
      enableDnsHostNames: props.eksEnableDnsHostNames,
      enableDnsSupport: props.eksEnableDnsSupport,
      instanceTenancy: props.eksInstanceTenancy,
      providerConfigRef: props.eksProviderConfigRef,
      subnetName: props.eksSubnetName,
      availabilityZone: props.eksAvailabilityZone,
      subnetCidrBlock: props.eksSubnetCidrBlock,
    });

    new EksCrossPlane(this, "crossplane-eks-cluster", {
      name: props.eksClusterName,
      region: props.eksRegion,
      endpointPrivateAccess: props.eksEndpointPrivateAccess,
      endpointPublicAccess: props.eksEndpointPublicAccess,
      securityGroupIdRefs: props.eksSecurityGroupIdRefs,
      subnetIdRefs: props.eksSubnetIdRefs,
      roleArnRef: props.eksRoleArnRef,
      version: props.eksVersion,
      providerConfigRef: props.eksProviderConfigRef,
      writeConnectionSecretToRef: props.eksWriteConnectionSecretToRef,
      writeConnectionSecretToRefNamespace:
        props.eksWriteConnectionSecretToRefNamespace,
    });
  }
}
