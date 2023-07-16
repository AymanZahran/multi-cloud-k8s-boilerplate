import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class Consul extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      version: HelmChartVersions.consul,
      namespace: "consul",
      releaseName: "consul",
      values: {},
    });
  }
}
