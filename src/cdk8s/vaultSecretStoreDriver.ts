import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class VaultSecretStoreDriver extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "secret-store", {
      chart: "secrets-store-csi-driver/secrets-store-csi-driver",
      releaseName: "secret-store",
      namespace: "secret-store",
      helmFlags: ["--create-namespace"],
      version: version,
      values: values,
    });
  }
}
