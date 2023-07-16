import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class MetricsServer extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "metrics-server", {
      chart: "metrics-server/metrics-server",
      version: HelmChartVersions.metrics_server,
      namespace: "observability",
      releaseName: "metrics-server",
      values: {},
    });
  }
}
