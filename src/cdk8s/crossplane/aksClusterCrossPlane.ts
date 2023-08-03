import { Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { AksCrossPlane } from "./managedResources/aks";
import { VnetCrossPlane } from "./managedResources/vnet";

export interface AksClusterCrossPlaneProps extends ChartProps {
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

export class AksClusterCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: AksClusterCrossPlaneProps) {
    super(scope, id, props);

    new VnetCrossPlane(this, "crossplane-aks-cluster-vnet", {
      name: props.aksVnetName,
      location: props.aksLocation,
      addressPrefixes: props.aksAddressPrefixes,
      providerConfigRef: props.aksProviderConfigRef,
      resourceGroupNameRef: props.aksResourceGroupNameRef,
      subnetName: props.aksSubnetName,
      availabilityZone: props.aksAvailabilityZone,
      cidrBlock: props.aksCidrBlock,
      mapPublicIpOnLaunch: props.aksMapPublicIpOnLaunch,
    });

    new AksCrossPlane(this, "crossplane-aks-cluster", {
      name: props.aksClusterName,
      disableRBAC: props.aksDisableRBAC,
      dnsNamePrefix: props.aksDnsNamePrefix,
      location: props.aksLocation,
      nodeCount: props.aksNodeCount,
      nodeVMSize: props.aksNodeVMSize,
      providerConfigRef: props.aksProviderConfigRef,
      resourceGroupNameRef: props.aksResourceGroupNameRef,
      version: props.aksVersion,
      vnetSubnetIDRef: props.aksVnetSubnetIDRef,
      writeConnectionSecretToRef: props.aksWriteConnectionSecretToRef,
      writeConnectionSecretToRefNamespace:
        props.aksWriteConnectionSecretToRefNamespace,
    });
  }
}
