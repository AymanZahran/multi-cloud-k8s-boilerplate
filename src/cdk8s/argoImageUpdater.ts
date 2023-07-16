import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class ArgoImageUpdater extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "argo-image-updater", {
      chart: "argo/argocd-image-updater",
      version: HelmChartVersions.argocd_image_updater,
      namespace: "argo-image-updater",
      releaseName: "argo-image-updater",
      values: {},
    });
  }
}
