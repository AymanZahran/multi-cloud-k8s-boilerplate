import { Construct } from "constructs";
import { ArgoCd } from "./charts/argoCd";
import { ArgoImageUpdater } from "./charts/argoImageUpdater";
import { ArgoNotifications } from "./charts/argoNotifications";
import { ArgoRollouts } from "./charts/argoRollouts";
import { ArgoWorkflows } from "./charts/argoWorkflows";
import { AwsCloudWatchAgent } from "./charts/awsCloudWatchAgent";
import { AwsEbsCsiDriver } from "./charts/awsEbsCsiDriver";
import { AwsEfsCsiDriver } from "./charts/awsEfsCsiDriver";
import { AwsFsxCsiDriver } from "./charts/awsFsxCsiDriver";
import { AwsLoadBalancerController } from "./charts/awsLoadBalancerController";
import { AwsSecretStoreCsiDriver } from "./charts/awsSecretStoreCsiDriver";
import { CertManager } from "./charts/certManager";
import { ClusterAutoscaler } from "./charts/clusterAutoscaler";
import { Consul } from "./charts/consul";
import { KubeStateMetrics } from "./charts/kubeStateMetrics";
import { MetricsServer } from "./charts/metricsServer";
import { Prometheus } from "./charts/prometheus";
import { Tekton } from "./charts/tekton";
import { Vault } from "./charts/vault";
import { VaultSecretStoreDriver } from "./charts/vaultSecretStoreDriver";

export interface WorklaodClusterProps {
  readonly app: any;
  readonly environment: string;
  readonly provider: string;
  readonly ArgoCdHelmChartLabels?: any;
  readonly ArgoCdHelmChartsFlags?: string[];
  readonly ArgoCdHelmChartVersion?: string;
  readonly ArgoCdHelmChartValues?: any;
  readonly EnableArgoImageUpdater: boolean;
  readonly ArgoImageUpdaterHelmChartLabels?: any;
  readonly ArgoImageUpdaterHelmChartsFlags?: string[];
  readonly ArgoImageUpdaterHelmChartVersion?: string;
  readonly ArgoImageUpdaterHelmChartValues?: any;
  readonly EnableArgoNotifications: boolean;
  readonly ArgoNotificationsHelmChartLabels?: any;
  readonly ArgoNotificationsHelmChartsFlags?: string[];
  readonly ArgoNotificationsHelmChartVersion?: string;
  readonly ArgoNotificationsHelmChartValues?: any;
  readonly EnableArgoRollouts: boolean;
  readonly ArgoRolloutsHelmChartLabels?: any;
  readonly ArgoRolloutsHelmChartsFlags?: string[];
  readonly ArgoRolloutsHelmChartVersion?: string;
  readonly ArgoRolloutsHelmChartValues?: any;
  readonly EnableArgoWorkflows: boolean;
  readonly ArgoWorkflowsHelmChartLabels?: any;
  readonly ArgoWorkflowsHelmChartsFlags?: string[];
  readonly ArgoWorkflowsHelmChartVersion?: string;
  readonly ArgoWorkflowsHelmChartValues?: any;
  readonly EnableAwsCloudWatchAgent: boolean;
  readonly AwsCloudWatchAgentHelmChartLabels?: any;
  readonly AwsCloudWatchAgentHelmChartsFlags?: string[];
  readonly AwsCloudWatchAgentHelmChartVersion?: string;
  readonly AwsCloudWatchAgentHelmChartValues?: any;
  readonly EnableAwsEbsCsiDriver: boolean;
  readonly AwsEbsCsiDriverHelmChartLabels?: any;
  readonly AwsEbsCsiDriverHelmChartsFlags?: string[];
  readonly AwsEbsCsiDriverHelmChartVersion?: string;
  readonly AwsEbsCsiDriverHelmChartValues?: any;
  readonly EnableAwsEfsCsiDriver: boolean;
  readonly AwsEfsCsiDriverHelmChartLabels?: any;
  readonly AwsEfsCsiDriverHelmChartsFlags?: string[];
  readonly AwsEfsCsiDriverHelmChartVersion?: string;
  readonly AwsEfsCsiDriverHelmChartValues?: any;
  readonly EnableAwsFsxCsiDriver: boolean;
  readonly AwsFsxCsiDriverHelmChartLabels?: any;
  readonly AwsFsxCsiDriverHelmChartsFlags?: string[];
  readonly AwsFsxCsiDriverHelmChartVersion?: string;
  readonly AwsFsxCsiDriverHelmChartValues?: any;
  readonly EnableAwsLoadBalancerController: boolean;
  readonly AwsLoadBalancerControllerHelmChartLabels?: any;
  readonly AwsLoadBalancerControllerHelmChartsFlags?: string[];
  readonly AwsLoadBalancerControllerHelmChartVersion?: string;
  readonly AwsLoadBalancerControllerHelmChartValues?: any;
  readonly EnableAwsSecretStoreCsiDriver: boolean;
  readonly AwsSecretStoreCsiDriverHelmChartLabels?: any;
  readonly AwsSecretStoreCsiDriverHelmChartsFlags?: string[];
  readonly AwsSecretStoreCsiDriverHelmChartVersion?: string;
  readonly AwsSecretStoreCsiDriverHelmChartValues?: any;
  readonly EnableCertManager: boolean;
  readonly CertManagerHelmChartLabels?: any;
  readonly CertManagerHelmChartsFlags?: string[];
  readonly CertManagerHelmChartVersion?: string;
  readonly CertManagerHelmChartValues?: any;
  readonly EnableClusterAutoscaler: boolean;
  readonly ClusterAutoscalerHelmChartLabels?: any;
  readonly ClusterAutoscalerHelmChartsFlags?: string[];
  readonly ClusterAutoscalerHelmChartVersion?: string;
  readonly ClusterAutoscalerHelmChartValues?: any;
  readonly EnableConsul: boolean;
  readonly ConsulHelmChartLabels?: any;
  readonly ConsulHelmChartsFlags?: string[];
  readonly ConsulHelmChartVersion?: string;
  readonly ConsulHelmChartValues?: any;
  readonly EnableKubeStateMetrics: boolean;
  readonly KubeStateMetricsHelmChartLabels?: any;
  readonly KubeStateMetricsHelmChartsFlags?: string[];
  readonly KubeStateMetricsHelmChartVersion?: string;
  readonly KubeStateMetricsHelmChartValues?: any;
  readonly EnableMetricsServer: boolean;
  readonly MetricsServerHelmChartLabels?: any;
  readonly MetricsServerHelmChartsFlags?: string[];
  readonly MetricsServerHelmChartVersion?: string;
  readonly MetricsServerHelmChartValues?: any;
  readonly EnablePrometheus: boolean;
  readonly PrometheusHelmChartLabels?: any;
  readonly PrometheusHelmChartsFlags?: string[];
  readonly PrometheusHelmChartVersion?: string;
  readonly PrometheusHelmChartValues?: any;
  readonly EnableTekton: boolean;
  readonly TektonHelmChartLabels?: any;
  readonly TektonHelmChartsFlags?: string[];
  readonly TektonHelmChartVersion?: string;
  readonly TektonHelmChartValues?: any;
  readonly EnableVault: boolean;
  readonly VaultHelmChartLabels?: any;
  readonly VaultHelmChartsFlags?: string[];
  readonly VaultHelmChartVersion?: string;
  readonly VaultHelmChartValues?: any;
  readonly EnableVaultSecretStoreDriver: boolean;
  readonly VaultSecretStoreDriverHelmChartLabels?: any;
  readonly VaultSecretStoreDriverHelmChartsFlags?: string[];
  readonly VaultSecretStoreDriverHelmChartVersion?: string;
  readonly VaultSecretStoreDriverHelmChartValues?: any;
}

export class WorkloadCluster extends Construct {
  constructor(scope: Construct, name: string, props: WorklaodClusterProps) {
    super(scope, name);
    new ArgoCd(props.app, "argo-cd", {
      clusterType: "workload",
      provider: props.provider,
      environment: props.environment,
      helmFlags: props.ArgoCdHelmChartsFlags,
      version: props.ArgoCdHelmChartVersion,
      values: props.ArgoCdHelmChartValues,
      labels: props.ArgoCdHelmChartLabels,
    });
    if (props.EnableArgoImageUpdater) {
      new ArgoImageUpdater(props.app, "argo-image-updater", {
        helmFlags: props.ArgoImageUpdaterHelmChartsFlags,
        version: props.ArgoImageUpdaterHelmChartVersion,
        values: props.ArgoImageUpdaterHelmChartValues,
        labels: props.ArgoImageUpdaterHelmChartLabels,
      });
    }
    if (props.EnableArgoNotifications) {
      new ArgoNotifications(props.app, "argo-notifications", {
        helmFlags: props.ArgoNotificationsHelmChartsFlags,
        version: props.ArgoNotificationsHelmChartVersion,
        values: props.ArgoNotificationsHelmChartValues,
        labels: props.ArgoNotificationsHelmChartLabels,
      });
    }
    if (props.EnableArgoRollouts) {
      new ArgoRollouts(props.app, "argo-rollouts", {
        helmFlags: props.ArgoRolloutsHelmChartsFlags,
        version: props.ArgoRolloutsHelmChartVersion,
        values: props.ArgoRolloutsHelmChartValues,
        labels: props.ArgoRolloutsHelmChartLabels,
      });
    }
    if (props.EnableArgoWorkflows) {
      new ArgoWorkflows(props.app, "argo-workflows", {
        helmFlags: props.ArgoWorkflowsHelmChartsFlags,
        version: props.ArgoWorkflowsHelmChartVersion,
        values: props.ArgoWorkflowsHelmChartValues,
        labels: props.ArgoWorkflowsHelmChartLabels,
      });
    }
    if (props.EnableAwsCloudWatchAgent) {
      new AwsCloudWatchAgent(props.app, "aws-cloudwatch-agent", {
        helmFlags: props.AwsCloudWatchAgentHelmChartsFlags,
        version: props.AwsCloudWatchAgentHelmChartVersion,
        values: props.AwsCloudWatchAgentHelmChartValues,
        labels: props.AwsCloudWatchAgentHelmChartLabels,
      });
    }
    if (props.EnableAwsEbsCsiDriver) {
      new AwsEbsCsiDriver(props.app, "aws-ebs-csi-driver", {
        helmFlags: props.AwsEbsCsiDriverHelmChartsFlags,
        version: props.AwsEbsCsiDriverHelmChartVersion,
        values: props.AwsEbsCsiDriverHelmChartValues,
        labels: props.AwsEbsCsiDriverHelmChartLabels,
      });
    }
    if (props.EnableAwsEfsCsiDriver) {
      new AwsEfsCsiDriver(props.app, "aws-efs-csi-driver", {
        helmFlags: props.AwsEfsCsiDriverHelmChartsFlags,
        version: props.AwsEfsCsiDriverHelmChartVersion,
        values: props.AwsEfsCsiDriverHelmChartValues,
        labels: props.AwsEfsCsiDriverHelmChartLabels,
      });
    }
    if (props.EnableAwsFsxCsiDriver) {
      new AwsFsxCsiDriver(props.app, "aws-fsx-csi-driver", {
        helmFlags: props.AwsFsxCsiDriverHelmChartsFlags,
        version: props.AwsFsxCsiDriverHelmChartVersion,
        values: props.AwsFsxCsiDriverHelmChartValues,
        labels: props.AwsFsxCsiDriverHelmChartLabels,
      });
    }
    if (props.EnableAwsLoadBalancerController) {
      new AwsLoadBalancerController(props.app, "aws-load-balancer-controller", {
        helmFlags: props.AwsLoadBalancerControllerHelmChartsFlags,
        version: props.AwsLoadBalancerControllerHelmChartVersion,
        values: props.AwsLoadBalancerControllerHelmChartValues,
        labels: props.AwsLoadBalancerControllerHelmChartLabels,
      });
    }
    if (props.EnableAwsSecretStoreCsiDriver) {
      new AwsSecretStoreCsiDriver(props.app, "aws-secret-store-csi-driver", {
        helmFlags: props.AwsSecretStoreCsiDriverHelmChartsFlags,
        version: props.AwsSecretStoreCsiDriverHelmChartVersion,
        values: props.AwsSecretStoreCsiDriverHelmChartValues,
        labels: props.AwsSecretStoreCsiDriverHelmChartLabels,
      });
    }
    if (props.EnableCertManager) {
      new CertManager(props.app, "cert-manager", {
        helmFlags: props.CertManagerHelmChartsFlags,
        version: props.CertManagerHelmChartVersion,
        values: props.CertManagerHelmChartValues,
        labels: props.CertManagerHelmChartLabels,
      });
    }
    if (props.EnableClusterAutoscaler) {
      new ClusterAutoscaler(props.app, "cluster-autoscaler", {
        helmFlags: props.ClusterAutoscalerHelmChartsFlags,
        version: props.ClusterAutoscalerHelmChartVersion,
        values: props.ClusterAutoscalerHelmChartValues,
        labels: props.ClusterAutoscalerHelmChartLabels,
      });
    }
    if (props.EnableConsul) {
      new Consul(props.app, "consul", {
        helmFlags: props.ConsulHelmChartsFlags,
        version: props.ConsulHelmChartVersion,
        values: props.ConsulHelmChartValues,
        labels: props.ConsulHelmChartLabels,
      });
    }
    if (props.EnableKubeStateMetrics) {
      new KubeStateMetrics(props.app, "kube-state-metrics", {
        helmFlags: props.KubeStateMetricsHelmChartsFlags,
        version: props.KubeStateMetricsHelmChartVersion,
        values: props.KubeStateMetricsHelmChartValues,
        labels: props.KubeStateMetricsHelmChartLabels,
      });
    }
    if (props.EnableMetricsServer) {
      new MetricsServer(props.app, "metrics-server", {
        helmFlags: props.MetricsServerHelmChartsFlags,
        version: props.MetricsServerHelmChartVersion,
        values: props.MetricsServerHelmChartValues,
        labels: props.MetricsServerHelmChartLabels,
      });
    }
    if (props.EnablePrometheus) {
      new Prometheus(props.app, "prometheus", {
        helmFlags: props.PrometheusHelmChartsFlags,
        version: props.PrometheusHelmChartVersion,
        values: props.PrometheusHelmChartValues,
        labels: props.PrometheusHelmChartLabels,
      });
    }
    if (props.EnableTekton) {
      new Tekton(props.app, "tekton", {
        helmFlags: props.TektonHelmChartsFlags,
        version: props.TektonHelmChartVersion,
        values: props.TektonHelmChartValues,
        labels: props.TektonHelmChartLabels,
      });
    }
    if (props.EnableVault) {
      new Vault(props.app, "vault", {
        helmFlags: props.VaultHelmChartsFlags,
        version: props.VaultHelmChartVersion,
        values: props.VaultHelmChartValues,
        labels: props.VaultHelmChartLabels,
      });
    }
    if (props.EnableVaultSecretStoreDriver) {
      new VaultSecretStoreDriver(props.app, "vault-secret-store-driver", {
        helmFlags: props.VaultSecretStoreDriverHelmChartsFlags,
        version: props.VaultSecretStoreDriverHelmChartVersion,
        values: props.VaultSecretStoreDriverHelmChartValues,
        labels: props.VaultSecretStoreDriverHelmChartLabels,
      });
    }
  }
}
