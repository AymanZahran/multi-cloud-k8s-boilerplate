import { Construct } from "constructs";
import { ArgoCd } from "./charts/argoCd";
import { CrossPlane } from "./charts/crossPlane";

export interface ManagementClusterProps {
  readonly app: any;
  readonly ArgoCdHelmChartLabels?: any;
  readonly ArgoCdHelmChartsFlags?: string[];
  readonly ArgoCdHelmChartVersion?: string;
  readonly ArgoCdHelmChartValues?: any;
  readonly CrossPlaneHelmChartLabels: any;
  readonly CrossPlaneHelmChartsFlags: string[];
  readonly CrossPlaneHelmChartVersion: string;
  readonly CrossPlaneHelmChartValues: any;
}

export class ManagementCluster extends Construct {
  readonly crossPlane: CrossPlane;
  readonly argocd: ArgoCd;

  constructor(scope: Construct, name: string, props: ManagementClusterProps) {
    super(scope, name);
    this.argocd = new ArgoCd(
      props.app,
      "argo-cd",
      {
        labels: props.ArgoCdHelmChartLabels,
      },
      props.ArgoCdHelmChartsFlags,
      props.ArgoCdHelmChartVersion,
      props.ArgoCdHelmChartValues,
    );
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
