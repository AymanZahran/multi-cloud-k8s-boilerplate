import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoCd extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argo-cd", {
      chart: "argo/argo-cd",
      version: "5.39.0",
      namespace: "argocd",
      releaseName: "argocd",
      values: {},
    });
  }
}
