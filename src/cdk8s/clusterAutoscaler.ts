import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class ClusterAutoscaler extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "cluster-autoscaler", {
      chart: "autoscaler/cluster-autoscaler",
      version: HelmChartVersions.cluster_autoscaler,
      namespace: "cluster-autoscaler",
      releaseName: "cluster-autoscaler",
      values: {},
    });
  }
}
