import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
export class Tekton extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "tekton", {
      chart: "cdf/tekton-pipeline",
      version: version,
      namespace: "tekton-pipelines",
      releaseName: "tekton",
      values: values,
    });
  }
}
