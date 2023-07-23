import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoNotifications extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argocd-notifications", {
      chart: "argo/argocd-notifications",
      releaseName: "argocd-notifications",
      namespace: "argocd",
      version: version,
      values: values,
      helmFlags: ["--create-namespace"],
    });
  }
}
