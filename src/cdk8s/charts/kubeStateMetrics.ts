import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface KubeStateMetricsProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class KubeStateMetrics extends Chart {
  constructor(scope: Construct, id: string, props: KubeStateMetricsProps) {
    super(scope, id, props);

    new Helm(this, "kube-state-metrics-dev", {
      chart: "prometheus-community/kube-state-metrics",
      releaseName: "kube-state-metrics",
      namespace: "observability",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
