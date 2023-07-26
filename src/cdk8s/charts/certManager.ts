import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
export class CertManager extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "cert-manager", {
      chart: "jetstack/cert-manager",
      releaseName: "cert-manager",
      namespace: "cert-manager",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}
