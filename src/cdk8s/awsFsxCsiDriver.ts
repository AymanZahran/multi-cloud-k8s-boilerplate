import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsFsxCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-fsx-csi-driver", {
      chart: "eks/aws-fsx-csi-driver",
      releaseName: "aws-fsx-csi-driver",
      namespace: "aws-fsx-csi-driver",
      version: version,
      values: values,
      helmFlags: ["--create-namespace"],
    });
  }
}
