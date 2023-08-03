import { Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";

export interface VnetCrossPlaneProps extends ChartProps {
  readonly name?: string;
  readonly location?: string;
  readonly addressPrefixes?: string[];
  readonly providerConfigRef?: string;
  readonly resourceGroupNameRef?: string;
  readonly subnetName?: string;
  readonly availabilityZone?: string;
  readonly cidrBlock?: string;
  readonly mapPublicIpOnLaunch?: boolean;
}

export class VnetCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: VnetCrossPlaneProps) {
    super(scope, id, props);

    new ApiObject(this, "crossplane-vpc", {
      apiVersion: "network.azure.crossplane.io/v1alpha3",
      kind: "VirtualNetwork",
      metadata: {
        name: props.name,
      },
      spec: {
        location: props.location,
        properties: {
          addressSpace: {
            addressPrefixes: props.addressPrefixes,
          },
        },
        providerConfigRef: {
          name: props.providerConfigRef,
        },
        resourceGroupNameRef: {
          name: props.resourceGroupNameRef,
        },
      },
    });
    new ApiObject(this, `crossplane-subnet`, {
      apiVersion: "network.azure.crossplane.io/v1alpha3",
      kind: "Subnet",
      metadata: {
        name: props.subnetName,
      },
      spec: {
        forProvider: {
          availabilityZone: props.availabilityZone,
          cidrBlock: props.cidrBlock,
          mapPublicIpOnLaunch: true,
          vpcIdRef: {
            name: props.name,
          },
        },
        providerConfigRef: {
          name: props.providerConfigRef,
        },
      },
    });
  }
}
