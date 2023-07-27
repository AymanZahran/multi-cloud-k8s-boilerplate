import {App, YamlOutputType} from "cdk8s";
import {ManagementCluster} from "./cdk8s/managementCluster";
import {HelmChartFlags} from "./cdk8s/properties/flags";
import {HelmChartLabels} from "./cdk8s/properties/labels";
import {HelmChartValues} from "./cdk8s/properties/values";
import {HelmChartVersions} from "./cdk8s/properties/versions";
import {WorkloadCluster} from "./cdk8s/workloadCluster";
import {Environment} from "./const";

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
        CrossPlaneHelmChartLabels: HelmChartLabels.crossplane[env],
        CrossPlaneHelmChartsFlags: HelmChartFlags.crossplane[env],
        CrossPlaneHelmChartVersion: HelmChartVersions.crossplane[env],
        CrossPlaneHelmChartValues: HelmChartValues.crossplane[env],
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
        CrossPlaneHelmChartLabels: HelmChartLabels.crossplane[env],
        CrossPlaneHelmChartsFlags: HelmChartFlags.crossplane[env],
        CrossPlaneHelmChartVersion: HelmChartVersions.crossplane[env],
        CrossPlaneHelmChartValues: HelmChartValues.crossplane[env],
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
        EnableArgoImageUpdater: true,
        ArgoImageUpdaterHelmChartLabels: HelmChartLabels.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartsFlags: HelmChartFlags.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartVersion:
            HelmChartVersions.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartValues: HelmChartValues.argocd_image_updater[env],
        EnableArgoNotifications: true,
        ArgoNotificationsHelmChartLabels: HelmChartLabels.argo_notifications[env],
        ArgoNotificationsHelmChartsFlags: HelmChartFlags.argo_notifications[env],
        ArgoNotificationsHelmChartVersion:
            HelmChartVersions.argo_notifications[env],
        ArgoNotificationsHelmChartValues: HelmChartValues.argo_notifications[env],
        EnableArgoRollouts: true,
        ArgoRolloutsHelmChartLabels: HelmChartLabels.argo_rollouts[env],
        ArgoRolloutsHelmChartsFlags: HelmChartFlags.argo_rollouts[env],
        ArgoRolloutsHelmChartVersion: HelmChartVersions.argo_rollouts[env],
        ArgoRolloutsHelmChartValues: HelmChartValues.argo_rollouts[env],
        EnableArgoWorkflows: true,
        ArgoWorkflowsHelmChartLabels: HelmChartLabels.argo_workflows[env],
        ArgoWorkflowsHelmChartsFlags: HelmChartFlags.argo_workflows[env],
        ArgoWorkflowsHelmChartVersion: HelmChartVersions.argo_workflows[env],
        ArgoWorkflowsHelmChartValues: HelmChartValues.argo_workflows[env],
        EnableAwsCloudWatchAgent: false,
        AwsCloudWatchAgentHelmChartLabels:
            HelmChartLabels.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartsFlags: HelmChartFlags.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartVersion:
            HelmChartVersions.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartValues:
            HelmChartValues.aws_cloudwatch_agent[env],
        EnableAwsEbsCsiDriver: false,
        AwsEbsCsiDriverHelmChartLabels: HelmChartLabels.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartsFlags: HelmChartFlags.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartVersion: HelmChartVersions.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartValues: HelmChartValues.aws_ebs_csi_driver[env],
        EnableAwsEfsCsiDriver: false,
        AwsEfsCsiDriverHelmChartLabels: HelmChartLabels.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartsFlags: HelmChartFlags.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartVersion: HelmChartVersions.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartValues: HelmChartValues.aws_efs_csi_driver[env],
        EnableAwsFsxCsiDriver: false,
        AwsFsxCsiDriverHelmChartLabels: HelmChartLabels.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartsFlags: HelmChartFlags.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartVersion: HelmChartVersions.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartValues: HelmChartValues.aws_fsx_csi_driver[env],
        EnableAwsLoadBalancerController: false,
        AwsLoadBalancerControllerHelmChartLabels:
            HelmChartLabels.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartsFlags:
            HelmChartFlags.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartVersion:
            HelmChartVersions.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartValues:
            HelmChartValues.aws_load_balancer_controller[env],
        EnableAwsSecretStoreCsiDriver: false,
        AwsSecretStoreCsiDriverHelmChartLabels:
            HelmChartLabels.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartsFlags:
            HelmChartFlags.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartVersion:
            HelmChartVersions.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartValues:
            HelmChartValues.aws_secret_store_csi_driver[env],
        EnableCertManager: true,
        CertManagerHelmChartLabels: HelmChartLabels.cert_manager[env],
        CertManagerHelmChartsFlags: HelmChartFlags.cert_manager[env],
        CertManagerHelmChartVersion: HelmChartVersions.cert_manager[env],
        CertManagerHelmChartValues: HelmChartValues.cert_manager[env],
        EnableClusterAutoscaler: true,
        ClusterAutoscalerHelmChartLabels: HelmChartLabels.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartsFlags: HelmChartFlags.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartVersion:
            HelmChartVersions.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartValues: HelmChartValues.cluster_autoscaler[env],
        EnableConsul: true,
        ConsulHelmChartLabels: HelmChartLabels.consul[env],
        ConsulHelmChartsFlags: HelmChartFlags.consul[env],
        ConsulHelmChartVersion: HelmChartVersions.consul[env],
        ConsulHelmChartValues: HelmChartValues.consul[env],
        EnableKubeStateMetrics: true,
        KubeStateMetricsHelmChartLabels: HelmChartLabels.kube_state_metrics[env],
        KubeStateMetricsHelmChartsFlags: HelmChartFlags.kube_state_metrics[env],
        KubeStateMetricsHelmChartVersion: HelmChartVersions.kube_state_metrics[env],
        KubeStateMetricsHelmChartValues: HelmChartValues.kube_state_metrics[env],
        EnableMetricsServer: true,
        MetricsServerHelmChartLabels: HelmChartLabels.metrics_server[env],
        MetricsServerHelmChartsFlags: HelmChartFlags.metrics_server[env],
        MetricsServerHelmChartVersion: HelmChartVersions.metrics_server[env],
        MetricsServerHelmChartValues: HelmChartValues.metrics_server[env],
        EnablePrometheus: true,
        PrometheusHelmChartLabels: HelmChartLabels.prometheus[env],
        PrometheusHelmChartsFlags: HelmChartFlags.prometheus[env],
        PrometheusHelmChartVersion: HelmChartVersions.prometheus[env],
        PrometheusHelmChartValues: HelmChartValues.prometheus[env],
        EnableTekton: true,
        TektonHelmChartLabels: HelmChartLabels.tekton[env],
        TektonHelmChartsFlags: HelmChartFlags.tekton[env],
        TektonHelmChartVersion: HelmChartVersions.tekton[env],
        TektonHelmChartValues: HelmChartValues.tekton[env],
        EnableVault: true,
        VaultHelmChartLabels: HelmChartLabels.vault[env],
        VaultHelmChartsFlags: HelmChartFlags.vault[env],
        VaultHelmChartVersion: HelmChartVersions.vault[env],
        VaultHelmChartValues: HelmChartValues.vault[env],
        EnableVaultSecretStoreDriver: true,
        VaultSecretStoreDriverHelmChartLabels:
            HelmChartLabels.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartsFlags:
            HelmChartFlags.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartVersion:
            HelmChartVersions.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartValues:
            HelmChartValues.vault_secret_store_driver[env],
    });

    const aksWorkloadApp = new App({
        outdir: "dist/workload/aks/" + env,
        outputFileExtension: ".yaml",
        yamlOutputType: YamlOutputType.FILE_PER_CHART,
    });

    new WorkloadCluster(aksWorkloadApp, "management-aks-cluster", {
        app: aksWorkloadApp,
        provider: "aks",
        environment: env,
        EnableArgoImageUpdater: true,
        ArgoImageUpdaterHelmChartLabels: HelmChartLabels.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartsFlags: HelmChartFlags.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartVersion:
            HelmChartVersions.argocd_image_updater[env],
        ArgoImageUpdaterHelmChartValues: HelmChartValues.argocd_image_updater[env],
        EnableArgoNotifications: true,
        ArgoNotificationsHelmChartLabels: HelmChartLabels.argo_notifications[env],
        ArgoNotificationsHelmChartsFlags: HelmChartFlags.argo_notifications[env],
        ArgoNotificationsHelmChartVersion:
            HelmChartVersions.argo_notifications[env],
        ArgoNotificationsHelmChartValues: HelmChartValues.argo_notifications[env],
        EnableArgoRollouts: true,
        ArgoRolloutsHelmChartLabels: HelmChartLabels.argo_rollouts[env],
        ArgoRolloutsHelmChartsFlags: HelmChartFlags.argo_rollouts[env],
        ArgoRolloutsHelmChartVersion: HelmChartVersions.argo_rollouts[env],
        ArgoRolloutsHelmChartValues: HelmChartValues.argo_rollouts[env],
        EnableArgoWorkflows: true,
        ArgoWorkflowsHelmChartLabels: HelmChartLabels.argo_workflows[env],
        ArgoWorkflowsHelmChartsFlags: HelmChartFlags.argo_workflows[env],
        ArgoWorkflowsHelmChartVersion: HelmChartVersions.argo_workflows[env],
        ArgoWorkflowsHelmChartValues: HelmChartValues.argo_workflows[env],
        EnableAwsCloudWatchAgent: false,
        AwsCloudWatchAgentHelmChartLabels:
            HelmChartLabels.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartsFlags: HelmChartFlags.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartVersion:
            HelmChartVersions.aws_cloudwatch_agent[env],
        AwsCloudWatchAgentHelmChartValues:
            HelmChartValues.aws_cloudwatch_agent[env],
        EnableAwsEbsCsiDriver: false,
        AwsEbsCsiDriverHelmChartLabels: HelmChartLabels.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartsFlags: HelmChartFlags.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartVersion: HelmChartVersions.aws_ebs_csi_driver[env],
        AwsEbsCsiDriverHelmChartValues: HelmChartValues.aws_ebs_csi_driver[env],
        EnableAwsEfsCsiDriver: false,
        AwsEfsCsiDriverHelmChartLabels: HelmChartLabels.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartsFlags: HelmChartFlags.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartVersion: HelmChartVersions.aws_efs_csi_driver[env],
        AwsEfsCsiDriverHelmChartValues: HelmChartValues.aws_efs_csi_driver[env],
        EnableAwsFsxCsiDriver: false,
        AwsFsxCsiDriverHelmChartLabels: HelmChartLabels.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartsFlags: HelmChartFlags.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartVersion: HelmChartVersions.aws_fsx_csi_driver[env],
        AwsFsxCsiDriverHelmChartValues: HelmChartValues.aws_fsx_csi_driver[env],
        EnableAwsLoadBalancerController: false,
        AwsLoadBalancerControllerHelmChartLabels:
            HelmChartLabels.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartsFlags:
            HelmChartFlags.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartVersion:
            HelmChartVersions.aws_load_balancer_controller[env],
        AwsLoadBalancerControllerHelmChartValues:
            HelmChartValues.aws_load_balancer_controller[env],
        EnableAwsSecretStoreCsiDriver: false,
        AwsSecretStoreCsiDriverHelmChartLabels:
            HelmChartLabels.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartsFlags:
            HelmChartFlags.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartVersion:
            HelmChartVersions.aws_secret_store_csi_driver[env],
        AwsSecretStoreCsiDriverHelmChartValues:
            HelmChartValues.aws_secret_store_csi_driver[env],
        EnableCertManager: true,
        CertManagerHelmChartLabels: HelmChartLabels.cert_manager[env],
        CertManagerHelmChartsFlags: HelmChartFlags.cert_manager[env],
        CertManagerHelmChartVersion: HelmChartVersions.cert_manager[env],
        CertManagerHelmChartValues: HelmChartValues.cert_manager[env],
        EnableClusterAutoscaler: true,
        ClusterAutoscalerHelmChartLabels: HelmChartLabels.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartsFlags: HelmChartFlags.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartVersion:
            HelmChartVersions.cluster_autoscaler[env],
        ClusterAutoscalerHelmChartValues: HelmChartValues.cluster_autoscaler[env],
        EnableConsul: true,
        ConsulHelmChartLabels: HelmChartLabels.consul[env],
        ConsulHelmChartsFlags: HelmChartFlags.consul[env],
        ConsulHelmChartVersion: HelmChartVersions.consul[env],
        ConsulHelmChartValues: HelmChartValues.consul[env],
        EnableKubeStateMetrics: true,
        KubeStateMetricsHelmChartLabels: HelmChartLabels.kube_state_metrics[env],
        KubeStateMetricsHelmChartsFlags: HelmChartFlags.kube_state_metrics[env],
        KubeStateMetricsHelmChartVersion: HelmChartVersions.kube_state_metrics[env],
        KubeStateMetricsHelmChartValues: HelmChartValues.kube_state_metrics[env],
        EnableMetricsServer: true,
        MetricsServerHelmChartLabels: HelmChartLabels.metrics_server[env],
        MetricsServerHelmChartsFlags: HelmChartFlags.metrics_server[env],
        MetricsServerHelmChartVersion: HelmChartVersions.metrics_server[env],
        MetricsServerHelmChartValues: HelmChartValues.metrics_server[env],
        EnablePrometheus: true,
        PrometheusHelmChartLabels: HelmChartLabels.prometheus[env],
        PrometheusHelmChartsFlags: HelmChartFlags.prometheus[env],
        PrometheusHelmChartVersion: HelmChartVersions.prometheus[env],
        PrometheusHelmChartValues: HelmChartValues.prometheus[env],
        EnableTekton: true,
        TektonHelmChartLabels: HelmChartLabels.tekton[env],
        TektonHelmChartsFlags: HelmChartFlags.tekton[env],
        TektonHelmChartVersion: HelmChartVersions.tekton[env],
        TektonHelmChartValues: HelmChartValues.tekton[env],
        EnableVault: true,
        VaultHelmChartLabels: HelmChartLabels.vault[env],
        VaultHelmChartsFlags: HelmChartFlags.vault[env],
        VaultHelmChartVersion: HelmChartVersions.vault[env],
        VaultHelmChartValues: HelmChartValues.vault[env],
        EnableVaultSecretStoreDriver: true,
        VaultSecretStoreDriverHelmChartLabels:
            HelmChartLabels.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartsFlags:
            HelmChartFlags.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartVersion:
            HelmChartVersions.vault_secret_store_driver[env],
        VaultSecretStoreDriverHelmChartValues:
            HelmChartValues.vault_secret_store_driver[env],
    });

    aksWorkloadApp.synth();
}
