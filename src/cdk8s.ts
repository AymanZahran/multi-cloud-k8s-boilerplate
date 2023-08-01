import { App, YamlOutputType } from "cdk8s";
import { ManagementCluster } from "./cdk8s/managementCluster";
import { AksHelmChartFlags } from "./cdk8s/properties/aks/flags";
import { AksHelmChartLabels } from "./cdk8s/properties/aks/labels";
import { AksHelmChartValues } from "./cdk8s/properties/aks/values";
import { AksHelmChartVersions } from "./cdk8s/properties/aks/versions";
import { EksHelmChartFlags } from "./cdk8s/properties/eks/flags";
import { EksHelmChartLabels } from "./cdk8s/properties/eks/labels";
import { EksHelmChartValues } from "./cdk8s/properties/eks/values";
import { EksHelmChartVersions } from "./cdk8s/properties/eks/versions";
import { WorkloadCluster } from "./cdk8s/workloadCluster";
import { Environment } from "./const";

for (const env of Object.values(Environment)) {
  const eksManagementApp = new App({
    outdir: "dist/management/eks/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });
  new ManagementCluster(eksManagementApp, "management-eks-cluster", {
    app: eksManagementApp,
    environment: env,
    provider: "eks",
    ArgoCdHelmChartLabels: EksHelmChartLabels.argo_cd[env],
    ArgoCdHelmChartsFlags: EksHelmChartFlags.argo_cd[env],
    ArgoCdHelmChartVersion: EksHelmChartVersions.argo_cd[env],
    ArgoCdHelmChartValues: EksHelmChartValues.argo_cd[env],
    CrossPlaneHelmChartLabels: EksHelmChartLabels.crossplane[env],
    CrossPlaneHelmChartsFlags: EksHelmChartFlags.crossplane[env],
    CrossPlaneHelmChartVersion: EksHelmChartVersions.crossplane[env],
    CrossPlaneHelmChartValues: EksHelmChartValues.crossplane[env],
    iamRoleArn: "arn:aws:iam::123456789012:role/eks-crossplane-role",
  });
  eksManagementApp.synth();

  const aksManagementApp = new App({
    outdir: "dist/management/aks/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });
  new ManagementCluster(aksManagementApp, "management-aks-cluster", {
    app: aksManagementApp,
    environment: env,
    provider: "aks",
    ArgoCdHelmChartLabels: AksHelmChartLabels.argo_cd[env],
    ArgoCdHelmChartsFlags: AksHelmChartFlags.argo_cd[env],
    ArgoCdHelmChartVersion: AksHelmChartVersions.argo_cd[env],
    ArgoCdHelmChartValues: AksHelmChartValues.argo_cd[env],
    CrossPlaneHelmChartLabels: AksHelmChartLabels.crossplane[env],
    CrossPlaneHelmChartsFlags: AksHelmChartFlags.crossplane[env],
    CrossPlaneHelmChartVersion: AksHelmChartVersions.crossplane[env],
    CrossPlaneHelmChartValues: AksHelmChartValues.crossplane[env],
    clientId: "12345678901234567890123456789012",
    subscriptionId: "12345678-9012-3456-7890-123456789012",
    tenantId: "12345678-9012-3456-7890-123456789012",
  });
  aksManagementApp.synth();

  const eksWorkloadApp = new App({
    outdir: "dist/workload/eks/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });
  new WorkloadCluster(eksWorkloadApp, "management-eks-cluster", {
    app: eksWorkloadApp,
    provider: "eks",
    environment: env,
    ArgoCdHelmChartLabels: AksHelmChartLabels.argo_cd[env],
    ArgoCdHelmChartsFlags: AksHelmChartFlags.argo_cd[env],
    ArgoCdHelmChartVersion: AksHelmChartVersions.argo_cd[env],
    ArgoCdHelmChartValues: AksHelmChartValues.argo_cd[env],
    EnableArgoImageUpdater: true,
    ArgoImageUpdaterHelmChartLabels:
      EksHelmChartLabels.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartsFlags:
      EksHelmChartFlags.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartVersion:
      EksHelmChartVersions.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartValues:
      EksHelmChartValues.argocd_image_updater[env],
    EnableArgoNotifications: true,
    ArgoNotificationsHelmChartLabels:
      EksHelmChartLabels.argo_notifications[env],
    ArgoNotificationsHelmChartsFlags: EksHelmChartFlags.argo_notifications[env],
    ArgoNotificationsHelmChartVersion:
      EksHelmChartVersions.argo_notifications[env],
    ArgoNotificationsHelmChartValues:
      EksHelmChartValues.argo_notifications[env],
    EnableArgoRollouts: true,
    ArgoRolloutsHelmChartLabels: EksHelmChartLabels.argo_rollouts[env],
    ArgoRolloutsHelmChartsFlags: EksHelmChartFlags.argo_rollouts[env],
    ArgoRolloutsHelmChartVersion: EksHelmChartVersions.argo_rollouts[env],
    ArgoRolloutsHelmChartValues: EksHelmChartValues.argo_rollouts[env],
    EnableArgoWorkflows: true,
    ArgoWorkflowsHelmChartLabels: EksHelmChartLabels.argo_workflows[env],
    ArgoWorkflowsHelmChartsFlags: EksHelmChartFlags.argo_workflows[env],
    ArgoWorkflowsHelmChartVersion: EksHelmChartVersions.argo_workflows[env],
    ArgoWorkflowsHelmChartValues: EksHelmChartValues.argo_workflows[env],
    EnableAwsCloudWatchAgent: false,
    AwsCloudWatchAgentHelmChartLabels:
      EksHelmChartLabels.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartsFlags:
      EksHelmChartFlags.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartVersion:
      EksHelmChartVersions.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartValues:
      EksHelmChartValues.aws_cloudwatch_agent[env],
    EnableAwsEbsCsiDriver: false,
    AwsEbsCsiDriverHelmChartLabels: EksHelmChartLabels.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartValues: EksHelmChartValues.aws_ebs_csi_driver[env],
    EnableAwsEfsCsiDriver: false,
    AwsEfsCsiDriverHelmChartLabels: EksHelmChartLabels.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartValues: EksHelmChartValues.aws_efs_csi_driver[env],
    EnableAwsFsxCsiDriver: false,
    AwsFsxCsiDriverHelmChartLabels: EksHelmChartLabels.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartValues: EksHelmChartValues.aws_fsx_csi_driver[env],
    EnableAwsLoadBalancerController: false,
    AwsLoadBalancerControllerHelmChartLabels:
      EksHelmChartLabels.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartsFlags:
      EksHelmChartFlags.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartVersion:
      EksHelmChartVersions.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartValues:
      EksHelmChartValues.aws_load_balancer_controller[env],
    EnableAwsSecretStoreCsiDriver: false,
    AwsSecretStoreCsiDriverHelmChartLabels:
      EksHelmChartLabels.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartsFlags:
      EksHelmChartFlags.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartValues:
      EksHelmChartValues.aws_secret_store_csi_driver[env],
    EnableCertManager: true,
    CertManagerHelmChartLabels: EksHelmChartLabels.cert_manager[env],
    CertManagerHelmChartsFlags: EksHelmChartFlags.cert_manager[env],
    CertManagerHelmChartVersion: EksHelmChartVersions.cert_manager[env],
    CertManagerHelmChartValues: EksHelmChartValues.cert_manager[env],
    EnableClusterAutoscaler: true,
    ClusterAutoscalerHelmChartLabels:
      EksHelmChartLabels.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartsFlags: EksHelmChartFlags.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartVersion:
      EksHelmChartVersions.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartValues:
      EksHelmChartValues.cluster_autoscaler[env],
    EnableConsul: true,
    ConsulHelmChartLabels: EksHelmChartLabels.consul[env],
    ConsulHelmChartsFlags: EksHelmChartFlags.consul[env],
    ConsulHelmChartVersion: EksHelmChartVersions.consul[env],
    ConsulHelmChartValues: EksHelmChartValues.consul[env],
    EnableKubeStateMetrics: true,
    KubeStateMetricsHelmChartLabels: EksHelmChartLabels.kube_state_metrics[env],
    KubeStateMetricsHelmChartsFlags: EksHelmChartFlags.kube_state_metrics[env],
    KubeStateMetricsHelmChartVersion:
      EksHelmChartVersions.kube_state_metrics[env],
    KubeStateMetricsHelmChartValues: EksHelmChartValues.kube_state_metrics[env],
    EnableMetricsServer: true,
    MetricsServerHelmChartLabels: EksHelmChartLabels.metrics_server[env],
    MetricsServerHelmChartsFlags: EksHelmChartFlags.metrics_server[env],
    MetricsServerHelmChartVersion: EksHelmChartVersions.metrics_server[env],
    MetricsServerHelmChartValues: EksHelmChartValues.metrics_server[env],
    EnablePrometheus: true,
    PrometheusHelmChartLabels: EksHelmChartLabels.prometheus[env],
    PrometheusHelmChartsFlags: EksHelmChartFlags.prometheus[env],
    PrometheusHelmChartVersion: EksHelmChartVersions.prometheus[env],
    PrometheusHelmChartValues: EksHelmChartValues.prometheus[env],
    EnableTekton: true,
    TektonHelmChartLabels: EksHelmChartLabels.tekton[env],
    TektonHelmChartsFlags: EksHelmChartFlags.tekton[env],
    TektonHelmChartVersion: EksHelmChartVersions.tekton[env],
    TektonHelmChartValues: EksHelmChartValues.tekton[env],
    EnableVault: true,
    VaultHelmChartLabels: EksHelmChartLabels.vault[env],
    VaultHelmChartsFlags: EksHelmChartFlags.vault[env],
    VaultHelmChartVersion: EksHelmChartVersions.vault[env],
    VaultHelmChartValues: EksHelmChartValues.vault[env],
    EnableVaultSecretStoreDriver: true,
    VaultSecretStoreDriverHelmChartLabels:
      EksHelmChartLabels.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartsFlags:
      EksHelmChartFlags.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartVersion:
      EksHelmChartVersions.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartValues:
      EksHelmChartValues.vault_secret_store_driver[env],
  });
  eksWorkloadApp.synth();

  const aksWorkloadApp = new App({
    outdir: "dist/workload/aks/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });

  new WorkloadCluster(aksWorkloadApp, "management-aks-cluster", {
    app: aksWorkloadApp,
    provider: "aks",
    environment: env,
    ArgoCdHelmChartLabels: AksHelmChartLabels.argo_cd[env],
    ArgoCdHelmChartsFlags: AksHelmChartFlags.argo_cd[env],
    ArgoCdHelmChartVersion: AksHelmChartVersions.argo_cd[env],
    ArgoCdHelmChartValues: AksHelmChartValues.argo_cd[env],
    EnableArgoImageUpdater: true,
    ArgoImageUpdaterHelmChartLabels:
      AksHelmChartLabels.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartsFlags:
      AksHelmChartFlags.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartVersion:
      AksHelmChartVersions.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartValues:
      AksHelmChartValues.argocd_image_updater[env],
    EnableArgoNotifications: true,
    ArgoNotificationsHelmChartLabels:
      AksHelmChartLabels.argo_notifications[env],
    ArgoNotificationsHelmChartsFlags: AksHelmChartFlags.argo_notifications[env],
    ArgoNotificationsHelmChartVersion:
      AksHelmChartVersions.argo_notifications[env],
    ArgoNotificationsHelmChartValues:
      AksHelmChartValues.argo_notifications[env],
    EnableArgoRollouts: true,
    ArgoRolloutsHelmChartLabels: AksHelmChartLabels.argo_rollouts[env],
    ArgoRolloutsHelmChartsFlags: AksHelmChartFlags.argo_rollouts[env],
    ArgoRolloutsHelmChartVersion: AksHelmChartVersions.argo_rollouts[env],
    ArgoRolloutsHelmChartValues: AksHelmChartValues.argo_rollouts[env],
    EnableArgoWorkflows: true,
    ArgoWorkflowsHelmChartLabels: AksHelmChartLabels.argo_workflows[env],
    ArgoWorkflowsHelmChartsFlags: AksHelmChartFlags.argo_workflows[env],
    ArgoWorkflowsHelmChartVersion: AksHelmChartVersions.argo_workflows[env],
    ArgoWorkflowsHelmChartValues: AksHelmChartValues.argo_workflows[env],
    EnableAwsCloudWatchAgent: false,
    AwsCloudWatchAgentHelmChartLabels:
      AksHelmChartLabels.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartsFlags:
      AksHelmChartFlags.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartVersion:
      AksHelmChartVersions.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartValues:
      AksHelmChartValues.aws_cloudwatch_agent[env],
    EnableAwsEbsCsiDriver: false,
    AwsEbsCsiDriverHelmChartLabels: AksHelmChartLabels.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartValues: AksHelmChartValues.aws_ebs_csi_driver[env],
    EnableAwsEfsCsiDriver: false,
    AwsEfsCsiDriverHelmChartLabels: AksHelmChartLabels.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartValues: AksHelmChartValues.aws_efs_csi_driver[env],
    EnableAwsFsxCsiDriver: false,
    AwsFsxCsiDriverHelmChartLabels: AksHelmChartLabels.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartValues: AksHelmChartValues.aws_fsx_csi_driver[env],
    EnableAwsLoadBalancerController: false,
    AwsLoadBalancerControllerHelmChartLabels:
      AksHelmChartLabels.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartsFlags:
      AksHelmChartFlags.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartVersion:
      AksHelmChartVersions.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartValues:
      AksHelmChartValues.aws_load_balancer_controller[env],
    EnableAwsSecretStoreCsiDriver: false,
    AwsSecretStoreCsiDriverHelmChartLabels:
      AksHelmChartLabels.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartsFlags:
      AksHelmChartFlags.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartValues:
      AksHelmChartValues.aws_secret_store_csi_driver[env],
    EnableCertManager: true,
    CertManagerHelmChartLabels: AksHelmChartLabels.cert_manager[env],
    CertManagerHelmChartsFlags: AksHelmChartFlags.cert_manager[env],
    CertManagerHelmChartVersion: AksHelmChartVersions.cert_manager[env],
    CertManagerHelmChartValues: AksHelmChartValues.cert_manager[env],
    EnableClusterAutoscaler: true,
    ClusterAutoscalerHelmChartLabels:
      AksHelmChartLabels.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartsFlags: AksHelmChartFlags.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartVersion:
      AksHelmChartVersions.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartValues:
      AksHelmChartValues.cluster_autoscaler[env],
    EnableConsul: true,
    ConsulHelmChartLabels: AksHelmChartLabels.consul[env],
    ConsulHelmChartsFlags: AksHelmChartFlags.consul[env],
    ConsulHelmChartVersion: AksHelmChartVersions.consul[env],
    ConsulHelmChartValues: AksHelmChartValues.consul[env],
    EnableKubeStateMetrics: true,
    KubeStateMetricsHelmChartLabels: AksHelmChartLabels.kube_state_metrics[env],
    KubeStateMetricsHelmChartsFlags: AksHelmChartFlags.kube_state_metrics[env],
    KubeStateMetricsHelmChartVersion:
      AksHelmChartVersions.kube_state_metrics[env],
    KubeStateMetricsHelmChartValues: AksHelmChartValues.kube_state_metrics[env],
    EnableMetricsServer: true,
    MetricsServerHelmChartLabels: AksHelmChartLabels.metrics_server[env],
    MetricsServerHelmChartsFlags: AksHelmChartFlags.metrics_server[env],
    MetricsServerHelmChartVersion: AksHelmChartVersions.metrics_server[env],
    MetricsServerHelmChartValues: AksHelmChartValues.metrics_server[env],
    EnablePrometheus: true,
    PrometheusHelmChartLabels: AksHelmChartLabels.prometheus[env],
    PrometheusHelmChartsFlags: AksHelmChartFlags.prometheus[env],
    PrometheusHelmChartVersion: AksHelmChartVersions.prometheus[env],
    PrometheusHelmChartValues: AksHelmChartValues.prometheus[env],
    EnableTekton: true,
    TektonHelmChartLabels: AksHelmChartLabels.tekton[env],
    TektonHelmChartsFlags: AksHelmChartFlags.tekton[env],
    TektonHelmChartVersion: AksHelmChartVersions.tekton[env],
    TektonHelmChartValues: AksHelmChartValues.tekton[env],
    EnableVault: true,
    VaultHelmChartLabels: AksHelmChartLabels.vault[env],
    VaultHelmChartsFlags: AksHelmChartFlags.vault[env],
    VaultHelmChartVersion: AksHelmChartVersions.vault[env],
    VaultHelmChartValues: AksHelmChartValues.vault[env],
    EnableVaultSecretStoreDriver: true,
    VaultSecretStoreDriverHelmChartLabels:
      AksHelmChartLabels.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartsFlags:
      AksHelmChartFlags.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartVersion:
      AksHelmChartVersions.vault_secret_store_driver[env],
    VaultSecretStoreDriverHelmChartValues:
      AksHelmChartValues.vault_secret_store_driver[env],
  });
  aksWorkloadApp.synth();
}
