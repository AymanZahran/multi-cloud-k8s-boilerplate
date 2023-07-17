import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class Vault extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    // Storage Backend
    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      version: version,
      namespace: "consul",
      releaseName: "consul",
      values: values,
    });

    // Vault
    new Helm(this, "vault", {
      chart: "hashicorp/vault",
      version: version,
      namespace: "vault",
      releaseName: "vault",
      values: values,
    });
  }
}
