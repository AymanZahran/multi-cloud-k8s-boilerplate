import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface PrometheusProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}
export class Prometheus extends Chart {
  constructor(scope: Construct, id: string, props: PrometheusProps) {
    super(scope, id, props);

    new Helm(this, "prometheus", {
      chart: "prometheus-community/kube-prometheus-stack",
      releaseName: "prometheus",
      namespace: "observability",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
