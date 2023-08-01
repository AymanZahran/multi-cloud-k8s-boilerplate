import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface VaultSecretStoreDriverProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}
export class VaultSecretStoreDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: VaultSecretStoreDriverProps,
  ) {
    super(scope, id, props);

    new Helm(this, "secret-store", {
      chart: "secrets-store-csi-driver/secrets-store-csi-driver",
      releaseName: "secret-store",
      namespace: "secret-store",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
