import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class Vault extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    // Storage Backend
    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      version: HelmChartVersions.consul,
      namespace: "consul",
      releaseName: "consul",
      values: {},
    });

    // Vault
    new Helm(this, "vault", {
      chart: "hashicorp/vault",
      version: HelmChartVersions.vault,
      namespace: "vault",
      releaseName: "vault",
      values: {},
    });
  }
}
