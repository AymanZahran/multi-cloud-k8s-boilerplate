import { Construct } from "constructs";
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
    if (props.EnableArgoImageUpdater) {
      new ArgoImageUpdater(
        props.app,
        "argo-image-updater",
        {
          labels: props.ArgoImageUpdaterHelmChartLabels,
        },
        props.ArgoImageUpdaterHelmChartsFlags,
        props.ArgoImageUpdaterHelmChartVersion,
        props.ArgoImageUpdaterHelmChartValues,
      );
    }
    if (props.EnableArgoNotifications) {
      new ArgoNotifications(
        props.app,
        "argo-notifications",
        {
          labels: props.ArgoNotificationsHelmChartLabels,
        },
        props.ArgoNotificationsHelmChartsFlags,
        props.ArgoNotificationsHelmChartVersion,
        props.ArgoNotificationsHelmChartValues,
      );
    }
    if (props.EnableArgoRollouts) {
      new ArgoRollouts(
        props.app,
        "argo-rollouts",
        {
          labels: props.ArgoRolloutsHelmChartLabels,
        },
        props.ArgoRolloutsHelmChartsFlags,
        props.ArgoRolloutsHelmChartVersion,
        props.ArgoRolloutsHelmChartValues,
      );
    }
    if (props.EnableArgoWorkflows) {
      new ArgoWorkflows(
        props.app,
        "argo-workflows",
        {
          labels: props.ArgoWorkflowsHelmChartLabels,
        },
        props.ArgoWorkflowsHelmChartsFlags,
        props.ArgoWorkflowsHelmChartVersion,
        props.ArgoWorkflowsHelmChartValues,
      );
    }
    if (props.EnableAwsCloudWatchAgent) {
      new AwsCloudWatchAgent(
        props.app,
        "aws-cloudwatch-agent",
        {
          labels: props.AwsCloudWatchAgentHelmChartLabels,
        },
        props.AwsCloudWatchAgentHelmChartsFlags,
        props.AwsCloudWatchAgentHelmChartVersion,
        props.AwsCloudWatchAgentHelmChartValues,
      );
    }
    if (props.EnableAwsEbsCsiDriver) {
      new AwsEbsCsiDriver(
        props.app,
        "aws-ebs-csi-driver",
        {
          labels: props.AwsEbsCsiDriverHelmChartLabels,
        },
        props.AwsEbsCsiDriverHelmChartsFlags,
        props.AwsEbsCsiDriverHelmChartVersion,
        props.AwsEbsCsiDriverHelmChartValues,
      );
    }
    if (props.EnableAwsEfsCsiDriver) {
      new AwsEfsCsiDriver(
        props.app,
        "aws-efs-csi-driver",
        {
          labels: props.AwsEfsCsiDriverHelmChartLabels,
        },
        props.AwsEfsCsiDriverHelmChartsFlags,
        props.AwsEfsCsiDriverHelmChartVersion,
        props.AwsEfsCsiDriverHelmChartValues,
      );
    }
    if (props.EnableAwsFsxCsiDriver) {
      new AwsFsxCsiDriver(
        props.app,
        "aws-fsx-csi-driver",
        {
          labels: props.AwsFsxCsiDriverHelmChartLabels,
        },
        props.AwsFsxCsiDriverHelmChartsFlags,
        props.AwsFsxCsiDriverHelmChartVersion,
        props.AwsFsxCsiDriverHelmChartValues,
      );
    }
    if (props.EnableAwsLoadBalancerController) {
      new AwsLoadBalancerController(
        props.app,
        "aws-load-balancer-controller",
        {
          labels: props.AwsLoadBalancerControllerHelmChartLabels,
        },
        props.AwsLoadBalancerControllerHelmChartsFlags,
        props.AwsLoadBalancerControllerHelmChartVersion,
        props.AwsLoadBalancerControllerHelmChartValues,
      );
    }
    if (props.EnableAwsSecretStoreCsiDriver) {
      new AwsSecretStoreCsiDriver(
        props.app,
        "aws-secret-store-csi-driver",
        {
          labels: props.AwsSecretStoreCsiDriverHelmChartLabels,
        },
        props.AwsSecretStoreCsiDriverHelmChartsFlags,
        props.AwsSecretStoreCsiDriverHelmChartVersion,
        props.AwsSecretStoreCsiDriverHelmChartValues,
      );
    }
    if (props.EnableCertManager) {
      new CertManager(
        props.app,
        "cert-manager",
        {
          labels: props.CertManagerHelmChartLabels,
        },
        props.CertManagerHelmChartsFlags,
        props.CertManagerHelmChartVersion,
        props.CertManagerHelmChartValues,
      );
    }
    if (props.EnableClusterAutoscaler) {
      new ClusterAutoscaler(
        props.app,
        "cluster-autoscaler",
        {
          labels: props.ClusterAutoscalerHelmChartLabels,
        },
        props.ClusterAutoscalerHelmChartsFlags,
        props.ClusterAutoscalerHelmChartVersion,
        props.ClusterAutoscalerHelmChartValues,
      );
    }
    if (props.EnableConsul) {
      new Consul(
        props.app,
        "consul",
        {
          labels: props.ConsulHelmChartLabels,
        },
        props.ConsulHelmChartsFlags,
        props.ConsulHelmChartVersion,
        props.ConsulHelmChartValues,
      );
    }
    if (props.EnableKubeStateMetrics) {
      new KubeStateMetrics(
        props.app,
        "kube-state-metrics",
        {
          labels: props.KubeStateMetricsHelmChartLabels,
        },
        props.KubeStateMetricsHelmChartsFlags,
        props.KubeStateMetricsHelmChartVersion,
        props.KubeStateMetricsHelmChartValues,
      );
    }
    if (props.EnableMetricsServer) {
      new MetricsServer(
        props.app,
        "metrics-server",
        {
          labels: props.MetricsServerHelmChartLabels,
        },
        props.MetricsServerHelmChartsFlags,
        props.MetricsServerHelmChartVersion,
        props.MetricsServerHelmChartValues,
      );
    }
    if (props.EnablePrometheus) {
      new Prometheus(
        props.app,
        "prometheus",
        {
          labels: props.PrometheusHelmChartLabels,
        },
        props.PrometheusHelmChartsFlags,
        props.PrometheusHelmChartVersion,
        props.PrometheusHelmChartValues,
      );
    }
    if (props.EnableTekton) {
      new Tekton(
        props.app,
        "tekton",
        {
          labels: props.TektonHelmChartLabels,
        },
        props.TektonHelmChartsFlags,
        props.TektonHelmChartVersion,
        props.TektonHelmChartValues,
      );
    }
    if (props.EnableVault) {
      new Vault(
        props.app,
        "vault",
        {
          labels: props.VaultHelmChartLabels,
        },
        props.VaultHelmChartsFlags,
        props.VaultHelmChartVersion,
        props.VaultHelmChartValues,
      );
    }
    if (props.EnableVaultSecretStoreDriver) {
      new VaultSecretStoreDriver(
        props.app,
        "vault-secret-store-driver",
        {
          labels: props.VaultSecretStoreDriverHelmChartLabels,
        },
        props.VaultSecretStoreDriverHelmChartsFlags,
        props.VaultSecretStoreDriverHelmChartVersion,
        props.VaultSecretStoreDriverHelmChartValues,
      );
    }
  }
}
