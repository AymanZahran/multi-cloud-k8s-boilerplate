import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ClusterAutoscaler extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "cluster-autoscaler", {
      chart: "autoscaler/cluster-autoscaler",
      releaseName: "cluster-autoscaler",
      namespace: "cluster-autoscaler",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
