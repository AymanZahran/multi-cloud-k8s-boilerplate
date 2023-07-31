import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface TektonProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}
export class Tekton extends Chart {
  constructor(scope: Construct, id: string, props: TektonProps) {
    super(scope, id, props);

    new Helm(this, "tekton", {
      chart: "cdf/tekton-pipeline",
      releaseName: "tekton",
      namespace: "tekton-pipelines",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
