import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class Consul extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      version: version,
      namespace: "consul",
      releaseName: "consul",
      values: values,
    });
  }
}
