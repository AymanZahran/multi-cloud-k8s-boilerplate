import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ClusterAutoscalerProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class ClusterAutoscaler extends Chart {
  constructor(scope: Construct, id: string, props: ClusterAutoscalerProps) {
    super(scope, id, props);

    new Helm(this, "cluster-autoscaler", {
      chart: "autoscaler/cluster-autoscaler",
      releaseName: "cluster-autoscaler",
      namespace: "cluster-autoscaler",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
