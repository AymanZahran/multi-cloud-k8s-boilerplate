import { Helm, Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";

export class CrossPlane extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "crossplane", {
      chart: "crossplane-stable/crossplane",
      releaseName: "crossplane",
      namespace: "crossplane-system",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });

    new ApiObject(this, "crossplane-provider", {
      apiVersion: "aws.crossplane.io/v1beta1",
      kind: "ProviderConfig",
      metadata: {
        name: "default",
      },
      spec: {
        credentials: {
          source: {
            secretRef: {
              namespace: "crossplane-system",
              name: "admin-key",
              key: "admin-secret-key",
            },
          },
        },
      },
    });
  }
}
