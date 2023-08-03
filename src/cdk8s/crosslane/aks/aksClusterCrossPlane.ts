import { Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { AksCrossPlane } from "../managedResources/aks";
import { VnetCrossPlane } from "../managedResources/vnet";

export interface AksClusterCrossPlaneProps extends ChartProps {
  readonly vnetName?: string;
  readonly location?: string;
  readonly addressPrefixes?: string[];
  readonly providerConfigRef?: string;
  readonly resourceGroupNameRef?: string;
  readonly subnetName?: string;
  readonly availabilityZone?: string;
  readonly cidrBlock?: string;
  readonly mapPublicIpOnLaunch?: boolean;
  readonly clusterName?: string;
  readonly disableRBAC?: boolean;
  readonly dnsNamePrefix?: string;
  readonly nodeCount?: number;
  readonly nodeVMSize?: string;
  readonly version?: string;
  readonly vnetSubnetIDRef?: string;
  readonly writeConnectionSecretToRef?: string;
  readonly writeConnectionSecretToRefNamespace?: string;
}

export class AksClusterCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: AksClusterCrossPlaneProps) {
    super(scope, id, props);

    new VnetCrossPlane(this, "crossplane-aks-cluster-vnet", {
      name: props.vnetName,
      location: props.location,
      addressPrefixes: props.addressPrefixes,
      providerConfigRef: props.providerConfigRef,
      resourceGroupNameRef: props.resourceGroupNameRef,
      subnetName: props.subnetName,
      availabilityZone: props.availabilityZone,
      cidrBlock: props.cidrBlock,
      mapPublicIpOnLaunch: props.mapPublicIpOnLaunch,
    });

    new AksCrossPlane(this, "crossplane-aks-cluster", {
      name: props.clusterName,
      disableRBAC: props.disableRBAC,
      dnsNamePrefix: props.dnsNamePrefix,
      location: props.location,
      nodeCount: props.nodeCount,
      nodeVMSize: props.nodeVMSize,
      providerConfigRef: props.providerConfigRef,
      resourceGroupNameRef: props.resourceGroupNameRef,
      version: props.version,
      vnetSubnetIDRef: props.vnetSubnetIDRef,
      writeConnectionSecretToRef: props.writeConnectionSecretToRef,
      writeConnectionSecretToRefNamespace:
        props.writeConnectionSecretToRefNamespace,
    });
  }
}
