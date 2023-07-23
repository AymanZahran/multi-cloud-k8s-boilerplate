import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class Prometheus extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "prometheus", {
      chart: "prometheus-community/kube-prometheus-stack",
      releaseName: "prometheus",
      namespace: "observability",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
