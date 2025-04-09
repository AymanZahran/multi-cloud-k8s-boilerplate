import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ArgoWorkflowsProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class ArgoWorkflows extends Chart {
  constructor(scope: Construct, id: string, props: ArgoWorkflowsProps) {
    super(scope, id, props);

    new Helm(this, "argo-workflows", {
      chart: "argo/argo-workflows",
      releaseName: "argocd-workflows",
      namespace: "argocd-workflows",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
