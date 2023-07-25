import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoNotifications extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argocd-notifications", {
      chart: "argo/argocd-notifications",
      releaseName: "argocd-notifications",
      namespace: "argocd",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
