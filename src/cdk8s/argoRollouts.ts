import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class ArgoRollouts extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argo-rollouts", {
      chart: "argo/argo-rollouts",
      version: HelmChartVersions.argo_rollouts,
      namespace: "argocd-rollouts",
      releaseName: "argocd-rollouts",
      values: {},
    });
  }
}
