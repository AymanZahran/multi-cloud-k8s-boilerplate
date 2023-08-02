import { Construct } from "constructs";
import { ArgoCd } from "./charts/argoCd";
import { CrossPlane } from "./charts/crossPlane";

export interface ManagementClusterProps {
  readonly app: any;
  readonly environment: string;
  readonly provider: string;
  readonly ArgoCdHelmChartLabels?: any;
  readonly ArgoCdHelmChartsFlags?: string[];
  readonly ArgoCdHelmChartVersion?: string;
  readonly ArgoCdHelmChartValues?: any;
  readonly CrossPlaneHelmChartLabels?: any;
  readonly CrossPlaneHelmChartsFlags?: string[];
  readonly CrossPlaneHelmChartVersion?: string;
  readonly CrossPlaneHelmChartValues?: any;
  readonly iamRoleArn?: string;
  readonly tenantId?: string;
  readonly subscriptionId?: string;
  readonly clientId?: string;
  readonly crossPlaneServiceAccountName?: string;
}

export class ManagementCluster extends Construct {
  readonly crossPlane: CrossPlane;
  readonly argocd: ArgoCd;

  constructor(scope: Construct, name: string, props: ManagementClusterProps) {
    super(scope, name);
    this.argocd = new ArgoCd(props.app, "argo-cd", {
      clusterType: "management",
      provider: props.provider,
      environment: props.environment,
      helmFlags: props.ArgoCdHelmChartsFlags,
      version: props.ArgoCdHelmChartVersion,
      values: props.ArgoCdHelmChartValues,
      labels: props.ArgoCdHelmChartLabels,
    });
    this.crossPlane = new CrossPlane(props.app, "crossplane", {
      provider: props.provider,
      labels: props.CrossPlaneHelmChartLabels,
      helmFlags: props.CrossPlaneHelmChartsFlags,
      version: props.CrossPlaneHelmChartVersion,
      values: props.CrossPlaneHelmChartValues,
      iamRoleArn: props.iamRoleArn,
      tenantId: props.tenantId,
      subscriptionId: props.subscriptionId,
      clientId: props.clientId,
      crossPlaneServiceAccountName: props.crossPlaneServiceAccountName,
    });
  }
}
