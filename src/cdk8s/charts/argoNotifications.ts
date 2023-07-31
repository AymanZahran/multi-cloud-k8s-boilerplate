import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ArgoNotificationsProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class ArgoNotifications extends Chart {
  constructor(scope: Construct, id: string, props: ArgoNotificationsProps) {
    super(scope, id, props);

    new Helm(this, "argocd-notifications", {
      chart: "argo/argocd-notifications",
      releaseName: "argocd-notifications",
      namespace: "argocd",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
