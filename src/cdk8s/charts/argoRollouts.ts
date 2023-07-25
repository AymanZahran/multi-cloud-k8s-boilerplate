import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoRollouts extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argo-rollouts", {
      chart: "argo/argo-rollouts",
      releaseName: "argocd-rollouts",
      namespace: "argocd-rollouts",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
