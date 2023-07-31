import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface VaultProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class Vault extends Chart {
  constructor(scope: Construct, id: string, props: VaultProps) {
    super(scope, id, props);
    // Vault
    new Helm(this, "vault", {
      chart: "hashicorp/vault",
      releaseName: "vault",
      namespace: "vault",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
