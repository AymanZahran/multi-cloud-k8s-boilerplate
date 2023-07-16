import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class CertManager extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "cert-manager", {
      chart: "jetstack/cert-manager",
      version: HelmChartVersions.cert_manager,
      namespace: "cert-manager",
      releaseName: "cert-manager",
      values: {},
    });
  }
}
