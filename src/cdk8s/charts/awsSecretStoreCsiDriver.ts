import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface AwsSecretStoreCsiDriverProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
}

export class AwsSecretStoreCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: AwsSecretStoreCsiDriverProps,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-secret-store-csi-driver", {
      chart: "eks/csi-secrets-store-provider-aws",
      releaseName: "aws-secret-store-csi-driver",
      namespace: "aws-secret-store-csi-driver",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
