import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface ArgoWorkflowsProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
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
