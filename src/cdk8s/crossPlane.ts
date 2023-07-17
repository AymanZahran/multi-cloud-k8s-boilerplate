import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class CrossPlane extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "crossplane", {
      chart: "crossplane-stable/crossplane",
      version: version,
      namespace: "crossplane-system",
      releaseName: "crossplane",
      values: values,
    });
  }
}
