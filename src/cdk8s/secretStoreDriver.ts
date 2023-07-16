import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class SecretStoreDriver extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, "secret-store", {
      chart: "secrets-store-csi-driver/secrets-store-csi-driver",
      version: HelmChartVersions.secrets_store_csi_driver,
      namespace: "secret-store",
      releaseName: "secret-store",
      values: {},
    });
  }
}
