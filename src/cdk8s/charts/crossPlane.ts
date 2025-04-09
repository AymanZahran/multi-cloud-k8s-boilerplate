import { Helm, Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";

export interface CrossPlaneProps extends ChartProps {
  readonly provider: string;
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
  readonly iamRoleArn?: string;
  readonly tenantId?: string;
  readonly subscriptionId?: string;
  readonly clientId?: string;
  readonly crossPlaneServiceAccountName?: string;
}

export class CrossPlane extends Chart {
  constructor(scope: Construct, id: string, props: CrossPlaneProps) {
    super(scope, id, props);

    new Helm(this, "crossplane", {
      chart: "crossplane-stable/crossplane",
      releaseName: "crossplane",
      namespace: "crossplane-system",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });

    if (props.provider === "eks") {
      // For Security purposes and secrets leakage, Let's use IRSA
      new ApiObject(this, "crossplane-aws-sa", {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: props.crossPlaneServiceAccountName,
          namespace: "crossplane-system",
          annotations: {
            "eks.amazonaws.com/role-arn": props.iamRoleArn as string,
          },
        },
      });
      new ApiObject(this, "crossplane-aws-controller-config", {
        apiVersion: "pkg.crossplane.io/v1alpha1",
        kind: "ControllerConfig",
        metadata: {
          name: "crossplane-aws-controller-config",
          annotations: {
            "eks.amazonaws.com/role-arn": props.iamRoleArn as string,
          },
        },
        spec: {
          podSecurityContext: {
            fsGroup: 2000,
          },
        },
      });
      new ApiObject(this, "crossplane-aws-provider", {
        apiVersion: "pkg.crossplane.io/v1",
        kind: "Provider",
        metadata: {
          name: "crossplane-aws-provider",
        },
        spec: {
          package: "xpkg.upbound.io/upbound/provider-aws:v0.37.0",
          packagePullSecrets: {
            name: "package-pull-secret",
          },
          controllerConfigRef: {
            name: "crossplane-aws-controller-config",
          },
        },
      });
      new ApiObject(this, "crossplane-aws-provider-config", {
        apiVersion: "aws.upbound.io/v1beta1",
        kind: "ProviderConfig",
        metadata: {
          name: "crossplane-aws-provider-config",
        },
        spec: {
          credentials: {
            source: "IRSA",
          },
        },
      });
    } else {
      new ApiObject(this, "crossplane-azure-provider", {
        apiVersion: "pkg.crossplane.io/v1",
        kind: "Provider",
        metadata: {
          name: "crossplane-azure-provider",
        },
        spec: {
          package: "xpkg.upbound.io/upbound/provider-azure:v0.34.0",
        },
      });
      // For Security purposes and secrets leakage, Let's use User Assigned Managed Identity
      new ApiObject(this, "crossplane-azure-provider-config", {
        apiVersion: "azure.upbound.io/v1beta1",
        kind: "ProviderConfig",
        metadata: {
          name: "crossplane-azure-provider-config",
        },
        spec: {
          credentials: {
            source: "UserAssignedIdentity",
          },
          tenantID: props.tenantId,
          subscriptionID: props.subscriptionId,
          clientID: props.clientId,
        },
      });
    }
  }
}
