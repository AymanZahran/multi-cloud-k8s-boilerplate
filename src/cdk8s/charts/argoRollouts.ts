import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ArgoRolloutsProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class ArgoRollouts extends Chart {
  constructor(scope: Construct, id: string, props: ArgoRolloutsProps) {
    super(scope, id, props);

    new Helm(this, "argo-rollouts", {
      chart: "argo/argo-rollouts",
      releaseName: "argocd-rollouts",
      namespace: "argocd-rollouts",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
