import { Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";

export interface EksCrossPlaneProps extends ChartProps {
  readonly name?: string;
  readonly region?: string;
  readonly endpointPrivateAccess?: boolean;
  readonly endpointPublicAccess?: boolean;
  readonly securityGroupIdRefs?: string[];
  readonly subnetIdRefs?: string[];
  readonly roleArnRef?: string;
  readonly version?: string;
  providerConfigRef?: string;
  readonly writeConnectionSecretToRef?: string;
  readonly writeConnectionSecretToRefNamespace?: string;
}

export class EksCrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: EksCrossPlaneProps) {
    super(scope, id, props);

    new ApiObject(this, "crossplane-eks-cluster", {
      apiVersion: "eks.aws.crossplane.io/v1beta1",
      kind: "Cluster",
      metadata: {
        name: props.name,
      },
      spec: {
        forProvider: {
          region: props.region,
          resourceVpcConfig: {
            endpointPrivateAccess: true,
            endpointPublicAccess: true,
            securityGroupIdRefs: [
              {
                name: props.securityGroupIdRefs,
              },
            ],
            subnetIdRefs: [
              {
                name: props.subnetIdRefs,
              },
            ],
            roleArnRef: {
              name: props.roleArnRef,
            },
            version: "1.21",
            providerConfigRef: {
              name: props.providerConfigRef,
            },
            writeConnectionSecretToRef: {
              name: props.writeConnectionSecretToRef,
              namespace: props.writeConnectionSecretToRefNamespace,
            },
          },
        },
      },
    });
  }
}
