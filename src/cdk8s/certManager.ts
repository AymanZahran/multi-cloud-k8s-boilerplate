import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
export class CertManager extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "cert-manager", {
      chart: "jetstack/cert-manager",
      version: version,
      namespace: "cert-manager",
      releaseName: "cert-manager",
      values: values,
    });
  }
}
