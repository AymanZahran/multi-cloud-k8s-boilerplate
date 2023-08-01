import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface CertManagerProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class CertManager extends Chart {
  constructor(scope: Construct, id: string, props: CertManagerProps) {
    super(scope, id, props);

    new Helm(this, "cert-manager", {
      chart: "jetstack/cert-manager",
      releaseName: "cert-manager",
      namespace: "cert-manager",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
