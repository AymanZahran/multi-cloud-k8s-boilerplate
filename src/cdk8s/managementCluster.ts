import { Construct } from "constructs";
import { CrossPlane } from "./charts/crossPlane";

export interface ManagementClusterProps {
  readonly app: any;
  readonly CrossPlaneHelmChartLabels: any;
  readonly CrossPlaneHelmChartsFlags: string[];
  readonly CrossPlaneHelmChartVersion: string;
  readonly CrossPlaneHelmChartValues: any;
}

export class ManagementCluster extends Construct {
  readonly crossPlane: CrossPlane;

  constructor(scope: Construct, name: string, props: ManagementClusterProps) {
    super(scope, name);
    this.crossPlane = new CrossPlane(
      props.app,
      "crossplane",
      {
        labels: props.CrossPlaneHelmChartLabels,
      },
      props.CrossPlaneHelmChartsFlags,
      props.CrossPlaneHelmChartVersion,
      props.CrossPlaneHelmChartValues,
    );
  }
}
