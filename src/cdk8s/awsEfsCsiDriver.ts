import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsEfsCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-efs-csi-driver", {
      chart: "eks/aws-efs-csi-driver",
      releaseName: "aws-efs-csi-driver",
      namespace: "aws-efs-csi-driver",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
