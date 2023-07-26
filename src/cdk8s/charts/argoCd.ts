import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoCd extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argo-cd", {
      chart: "argo/argo-cd",
      releaseName: "argocd",
      namespace: "argocd",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
