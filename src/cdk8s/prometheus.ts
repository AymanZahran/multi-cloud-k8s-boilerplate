import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class Prometheus extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "prometheus", {
      chart: "prometheus-community/kube-prometheus-stack",
      version: HelmChartVersions.prometheus,
      namespace: "observability",
      releaseName: "prometheus",
      values: {},
    });
  }
}
