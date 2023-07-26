import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class ArgoImageUpdater extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argo-image-updater", {
      chart: "argo/argocd-image-updater",
      releaseName: "argo-image-updater",
      namespace: "argo-image-updater",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
