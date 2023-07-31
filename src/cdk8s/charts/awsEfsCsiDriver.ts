import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface AwsEfsCsiDriverProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class AwsEfsCsiDriver extends Chart {
  constructor(scope: Construct, id: string, props: AwsEfsCsiDriverProps) {
    super(scope, id, props);

    new Helm(this, "aws-efs-csi-driver", {
      chart: "eks/aws-efs-csi-driver",
      releaseName: "aws-efs-csi-driver",
      namespace: props.namespace,
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
