import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class KubeStateMetrics extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "kube-state-metrics-dev", {
      chart: "prometheus-community/kube-state-metrics",
      releaseName: "kube-state-metrics",
      namespace: "observability",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
