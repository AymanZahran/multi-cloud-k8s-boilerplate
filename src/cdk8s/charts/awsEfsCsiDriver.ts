import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsEfsCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-efs-csi-driver", {
      chart: "eks/aws-efs-csi-driver",
      releaseName: "aws-efs-csi-driver",
      namespace: props.namespace,
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
