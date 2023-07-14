import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoNotifications extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argocd-notifications", {
      chart: "argo/argocd-notifications",
      version: "1.8.1",
      namespace: "argocd",
      releaseName: "argocd-notifications",
      values: {},
    });
  }
}
