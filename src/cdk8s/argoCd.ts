import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class ArgoCd extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argo-cd", {
      chart: "argo/argo-cd",
      version: HelmChartVersions.argo_cd,
      namespace: "argocd",
      releaseName: "argocd",
      values: {},
    });
  }
}
