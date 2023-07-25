import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
export class Tekton extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "tekton", {
      chart: "cdf/tekton-pipeline",
      releaseName: "tekton",
      namespace: "tekton-pipelines",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
