import { Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";

export interface AksCrossPlaneProps extends ChartProps {
  readonly name?: string;
  readonly disableRBAC?: boolean;
  readonly dnsNamePrefix?: string;
  readonly location?: string;
  readonly nodeCount?: number;
  readonly nodeVMSize?: string;
  readonly providerConfigRef?: string;
  readonly resourceGroupNameRef?: string;
  readonly version?: string;
  readonly vnetSubnetIDRef?: string;
  readonly writeConnectionSecretToRef?: string;
  readonly writeConnectionSecretToRefNamespace?: string;
}

export class AksCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: AksCrossPlaneProps) {
    super(scope, id, props);

    new ApiObject(this, "crossplane-aks-cluster", {
      apiVersion: "compute.azure.crossplane.io/v1alpha3",
      kind: "AKSCluster",
      metadata: {
        name: props.name,
      },
      spec: {
        disableRBAC: false,
        dnsNamePrefix: props.dnsNamePrefix,
        location: props.location,
        nodeCount: props.nodeCount,
        nodeVMSize: props.nodeVMSize,
        providerConfigRef: {
          name: props.providerConfigRef,
        },
        resourceGroupNameRef: {
          name: props.resourceGroupNameRef,
        },
        version: props.version,
        vnetSubnetID: {
          name: props.vnetSubnetIDRef,
        },
        vnetSubnetIDRef: {
          name: props.vnetSubnetIDRef,
        },
        writeConnectionSecretToRef: {
          name: props.writeConnectionSecretToRef,
          namespace: props.writeConnectionSecretToRefNamespace,
        },
      },
    });
  }
}
