import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoWorkflows extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argo-workflows", {
      chart: "argo/argo-workflows",
      version: version,
      namespace: "argocd-workflows",
      releaseName: "argocd-workflows",
      values: values,
    });
  }
}
