import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface AwsFsxCsiDriverProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
}

export class AwsFsxCsiDriver extends Chart {
  constructor(scope: Construct, id: string, props: AwsFsxCsiDriverProps) {
    super(scope, id, props);

    new Helm(this, "aws-fsx-csi-driver", {
      chart: "eks/aws-fsx-csi-driver",
      releaseName: "aws-fsx-csi-driver",
      namespace: "aws-fsx-csi-driver",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
