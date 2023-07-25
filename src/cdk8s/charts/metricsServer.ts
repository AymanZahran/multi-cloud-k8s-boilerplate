import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class MetricsServer extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "metrics-server", {
      chart: "metrics-server/metrics-server",
      releaseName: "metrics-server",
      namespace: "observability",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
