import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsEbsCsiDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-ebs-csi-driver", {
      chart: "eks/aws-ebs-csi-driver",
      releaseName: "aws-ebs-csi-driver",
      namespace: "aws-ebs-csi-driver",
      version: version,
      values: values,
    });
  }
}
