import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class ArgoNotifications extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argocd-notifications", {
      chart: "argo/argocd-notifications",
      version: HelmChartVersions.argo_notifications,
      namespace: "argocd",
      releaseName: "argocd-notifications",
      values: {},
    });
  }
}
