import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsSecretStoreCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-secret-store-csi-driver", {
      chart: "eks/csi-secrets-store-provider-aws",
      releaseName: "aws-secret-store-csi-driver",
      namespace: "aws-secret-store-csi-driver",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
