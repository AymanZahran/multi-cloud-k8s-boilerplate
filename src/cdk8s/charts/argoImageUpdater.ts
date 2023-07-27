import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ArgoImageUpdaterProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
}

export class ArgoImageUpdater extends Chart {
  constructor(scope: Construct, id: string, props: ArgoImageUpdaterProps) {
    super(scope, id, props);

    new Helm(this, "argo-image-updater", {
      chart: "argo/argocd-image-updater",
      releaseName: "argo-image-updater",
      namespace: "argo-image-updater",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
