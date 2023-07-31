import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface MetricsServerProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class MetricsServer extends Chart {
  constructor(scope: Construct, id: string, props: MetricsServerProps) {
    super(scope, id, props);

    new Helm(this, "metrics-server", {
      chart: "metrics-server/metrics-server",
      releaseName: "metrics-server",
      namespace: "observability",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
