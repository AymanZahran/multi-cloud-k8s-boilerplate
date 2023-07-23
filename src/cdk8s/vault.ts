import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class Vault extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    // Storage Backend
    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      releaseName: "consul",
      namespace: "consul",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });

    // Vault
    new Helm(this, "vault", {
      chart: "hashicorp/vault",
      releaseName: "vault",
      namespace: "vault",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
