import { HelmChartValues } from "./values";
import { HelmChartVersions } from "./versions";
import { ArgoImageUpdater } from "../../argoImageUpdater";

const helmCharts = {
  ArgoCd: {
    constructor: "argo-cd",
    versions: HelmChartVersions.argo_cd,
    values: HelmChartValues.argo_cd,
  },
  ArgoImageUpdater: {
    constructor: ArgoImageUpdater,
    versions: HelmChartVersions.argocd_image_updater,
    values: HelmChartValues.argocd_image_updater,
  },
  // Add other charts here in the same format
};
