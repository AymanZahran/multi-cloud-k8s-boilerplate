import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class Tekton extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "tekton", {
      chart: "cdf/tekton-pipeline",
      version: HelmChartVersions.tekton_pipeline,
      namespace: "tekton-pipelines",
      releaseName: "tekton",
      values: {},
    });
  }
}
