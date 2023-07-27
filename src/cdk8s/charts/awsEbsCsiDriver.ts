import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface AwsEbsCsiDriverProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
}

export class AwsEbsCsiDriver extends Chart {
  constructor(scope: Construct, id: string, props: AwsEbsCsiDriverProps) {
    super(scope, id, props);

    new Helm(this, "aws-ebs-csi-driver", {
      chart: "eks/aws-ebs-csi-driver",
      releaseName: "aws-ebs-csi-driver",
      namespace: "aws-ebs-csi-driver",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
