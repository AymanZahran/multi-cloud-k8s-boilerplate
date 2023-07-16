import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class KubeStateMetrics extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "kube-state-metrics-dev", {
      chart: "prometheus-community/kube-state-metrics",
      version: HelmChartVersions.kube_state_metrics,
      namespace: "observability",
      releaseName: "kube-state-metrics",
      values: {},
    });
  }
}
