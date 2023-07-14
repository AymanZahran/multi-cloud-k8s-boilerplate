import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class Consul extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      version: "1.1.2",
      namespace: "consul",
      releaseName: "consul",
      values: {},
    });
  }
}
