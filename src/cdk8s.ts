import { App, YamlOutputType } from "cdk8s";
import { ManagementCluster } from "./cdk8s/managementCluster";
import { WorkloadCluster } from "./cdk8s/workloadCluster";
import { AksCrossPlaneVariables } from "./properties/aks/aksCrossPlaneVariables";
import { AksHelmChartFeatures } from "./properties/aks/aksHelmChartFeatures";
import { AksHelmChartFlags } from "./properties/aks/aksHelmChartFlags";
import { AksHelmChartLabels } from "./properties/aks/aksHelmChartLabels";
import { AksHelmChartValues } from "./properties/aks/aksHelmChartValues";
import { AksHelmChartVersions } from "./properties/aks/aksHelmChartVersions";
import {
  Environment,
  AwsAccountId,
  AzureSubscriptionId,
  AzureCrossPlaneClientId,
  AzureTenantId,
} from "./properties/const";
import { EksCrossPlaneVariables } from "./properties/eks/eksCrossPlaneVariables";
import { EksHelmChartFeatures } from "./properties/eks/eksHelmChartFeatures";
import { EksHelmChartFlags } from "./properties/eks/eksHelmChartFlags";
import { EksHelmChartLabels } from "./properties/eks/eksHelmChartLabels";
import { EksHelmChartValues } from "./properties/eks/eksHelmChartValues";
import { EksHelmChartVersions } from "./properties/eks/eksHelmChartVersions";
import { EksTerraformVariables } from "./properties/eks/eksTerraformVariables";

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
    iamRoleArn:
      "arn:aws:iam::" +
      AwsAccountId[env] +
      ":role/" +
      EksTerraformVariables.eksCrossPlaneIamRoleName[env],
    crossPlaneServiceAccountName:
      EksTerraformVariables.eksCrossPlaneServiceAccountName[env],
    eksVpcName: EksCrossPlaneVariables.eksVpcName[env],
    eksRegion: EksCrossPlaneVariables.eksRegion[env],
    eksCidrBlock: EksCrossPlaneVariables.eksCidrBlock[env],
    eksEnableDnsHostNames: EksCrossPlaneVariables.eksEnableDnsHostNames[env],
    eksEnableDnsSupport: EksCrossPlaneVariables.eksEnableDnsSupport[env],
    eksInstanceTenancy: EksCrossPlaneVariables.eksInstanceTenancy[env],
    eksProviderConfigRef: EksCrossPlaneVariables.eksProviderConfigRef[env],
    eksSubnetName: EksCrossPlaneVariables.eksSubnetName[env],
    eksAvailabilityZone: EksCrossPlaneVariables.eksAvailabilityZone[env],
    eksSubnetCidrBlock: EksCrossPlaneVariables.eksSubnetCidrBlock[env],
    eksClusterName: EksCrossPlaneVariables.eksClusterName[env],
    eksEndpointPrivateAccess:
      EksCrossPlaneVariables.eksEndpointPrivateAccess[env],
    eksEndpointPublicAccess:
      EksCrossPlaneVariables.eksEndpointPublicAccess[env],
    eksSecurityGroupIdRefs: EksCrossPlaneVariables.eksSecurityGroupIdRefs[env],
    eksSubnetIdRefs: EksCrossPlaneVariables.eksSubnetIdRefs[env],
    eksRoleArnRef: EksCrossPlaneVariables.eksRoleArnRef[env],
    eksVersion: EksCrossPlaneVariables.eksVersion[env],
    eksWriteConnectionSecretToRef:
      EksCrossPlaneVariables.eksWriteConnectionSecretToRef[env],
    eksWriteConnectionSecretToRefNamespace:
      EksCrossPlaneVariables.eksWriteConnectionSecretToRefNamespace[env],
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
    tenantId: AzureTenantId[env],
    subscriptionId: AzureSubscriptionId[env],
    clientId: AzureCrossPlaneClientId[env],
    aksVnetName: AksCrossPlaneVariables.aksVnetName[env],
    aksLocation: AksCrossPlaneVariables.aksLocation[env],
    aksAddressPrefixes: AksCrossPlaneVariables.aksAddressPrefixes[env],
    aksProviderConfigRef: AksCrossPlaneVariables.aksProviderConfigRef[env],
    aksResourceGroupNameRef:
      AksCrossPlaneVariables.aksResourceGroupNameRef[env],
    aksSubnetName: AksCrossPlaneVariables.aksSubnetName[env],
    aksAvailabilityZone: AksCrossPlaneVariables.aksAvailabilityZone[env],
    aksCidrBlock: AksCrossPlaneVariables.aksCidrBlock[env],
    aksMapPublicIpOnLaunch: AksCrossPlaneVariables.aksMapPublicIpOnLaunch[env],
    aksClusterName: AksCrossPlaneVariables.aksClusterName[env],
    aksDisableRBAC: AksCrossPlaneVariables.aksDisableRBAC[env],
    aksDnsNamePrefix: AksCrossPlaneVariables.aksDnsNamePrefix[env],
    aksNodeCount: AksCrossPlaneVariables.aksNodeCount[env],
    aksNodeVMSize: AksCrossPlaneVariables.aksNodeVMSize[env],
    aksVersion: AksCrossPlaneVariables.aksVersion[env],
    aksVnetSubnetIDRef: AksCrossPlaneVariables.aksVnetSubnetIDRef[env],
    aksWriteConnectionSecretToRef:
      AksCrossPlaneVariables.aksWriteConnectionSecretToRef[env],
    aksWriteConnectionSecretToRefNamespace:
      AksCrossPlaneVariables.aksWriteConnectionSecretToRefNamespace[env],
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
    ArgoCdHelmChartLabels: EksHelmChartLabels.argo_cd[env],
    ArgoCdHelmChartsFlags: EksHelmChartFlags.argo_cd[env],
    ArgoCdHelmChartVersion: EksHelmChartVersions.argo_cd[env],
    ArgoCdHelmChartValues: EksHelmChartValues.argo_cd[env],
    EnableArgoImageUpdater: EksHelmChartFeatures.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartLabels:
      EksHelmChartLabels.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartsFlags:
      EksHelmChartFlags.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartVersion:
      EksHelmChartVersions.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartValues:
      EksHelmChartValues.argocd_image_updater[env],
    EnableArgoNotifications: EksHelmChartFeatures.argo_notifications[env],
    ArgoNotificationsHelmChartLabels:
      EksHelmChartLabels.argo_notifications[env],
    ArgoNotificationsHelmChartsFlags: EksHelmChartFlags.argo_notifications[env],
    ArgoNotificationsHelmChartVersion:
      EksHelmChartVersions.argo_notifications[env],
    ArgoNotificationsHelmChartValues:
      EksHelmChartValues.argo_notifications[env],
    EnableArgoRollouts: EksHelmChartFeatures.argo_rollouts[env],
    ArgoRolloutsHelmChartLabels: EksHelmChartLabels.argo_rollouts[env],
    ArgoRolloutsHelmChartsFlags: EksHelmChartFlags.argo_rollouts[env],
    ArgoRolloutsHelmChartVersion: EksHelmChartVersions.argo_rollouts[env],
    ArgoRolloutsHelmChartValues: EksHelmChartValues.argo_rollouts[env],
    EnableArgoWorkflows: EksHelmChartFeatures.argo_workflows[env],
    ArgoWorkflowsHelmChartLabels: EksHelmChartLabels.argo_workflows[env],
    ArgoWorkflowsHelmChartsFlags: EksHelmChartFlags.argo_workflows[env],
    ArgoWorkflowsHelmChartVersion: EksHelmChartVersions.argo_workflows[env],
    ArgoWorkflowsHelmChartValues: EksHelmChartValues.argo_workflows[env],
    EnableAwsCloudWatchAgent: EksHelmChartFeatures.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartLabels:
      EksHelmChartLabels.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartsFlags:
      EksHelmChartFlags.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartVersion:
      EksHelmChartVersions.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartValues:
      EksHelmChartValues.aws_cloudwatch_agent[env],
    EnableAwsEbsCsiDriver: EksHelmChartFeatures.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartLabels: EksHelmChartLabels.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartValues: EksHelmChartValues.aws_ebs_csi_driver[env],
    EnableAwsEfsCsiDriver: EksHelmChartFeatures.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartLabels: EksHelmChartLabels.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartValues: EksHelmChartValues.aws_efs_csi_driver[env],
    EnableAwsFsxCsiDriver: EksHelmChartFeatures.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartLabels: EksHelmChartLabels.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartsFlags: EksHelmChartFlags.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartValues: EksHelmChartValues.aws_fsx_csi_driver[env],
    EnableAwsLoadBalancerController:
      EksHelmChartFeatures.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartLabels:
      EksHelmChartLabels.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartsFlags:
      EksHelmChartFlags.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartVersion:
      EksHelmChartVersions.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartValues:
      EksHelmChartValues.aws_load_balancer_controller[env],
    EnableAwsSecretStoreCsiDriver:
      EksHelmChartFeatures.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartLabels:
      EksHelmChartLabels.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartsFlags:
      EksHelmChartFlags.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartVersion:
      EksHelmChartVersions.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartValues:
      EksHelmChartValues.aws_secret_store_csi_driver[env],
    EnableCertManager: EksHelmChartFeatures.cert_manager[env],
    CertManagerHelmChartLabels: EksHelmChartLabels.cert_manager[env],
    CertManagerHelmChartsFlags: EksHelmChartFlags.cert_manager[env],
    CertManagerHelmChartVersion: EksHelmChartVersions.cert_manager[env],
    CertManagerHelmChartValues: EksHelmChartValues.cert_manager[env],
    EnableClusterAutoscaler: EksHelmChartFeatures.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartLabels:
      EksHelmChartLabels.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartsFlags: EksHelmChartFlags.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartVersion:
      EksHelmChartVersions.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartValues:
      EksHelmChartValues.cluster_autoscaler[env],
    EnableConsul: EksHelmChartFeatures.consul[env],
    ConsulHelmChartLabels: EksHelmChartLabels.consul[env],
    ConsulHelmChartsFlags: EksHelmChartFlags.consul[env],
    ConsulHelmChartVersion: EksHelmChartVersions.consul[env],
    ConsulHelmChartValues: EksHelmChartValues.consul[env],
    EnableKubeStateMetrics: EksHelmChartFeatures.kube_state_metrics[env],
    KubeStateMetricsHelmChartLabels: EksHelmChartLabels.kube_state_metrics[env],
    KubeStateMetricsHelmChartsFlags: EksHelmChartFlags.kube_state_metrics[env],
    KubeStateMetricsHelmChartVersion:
      EksHelmChartVersions.kube_state_metrics[env],
    KubeStateMetricsHelmChartValues: EksHelmChartValues.kube_state_metrics[env],
    EnableMetricsServer: EksHelmChartFeatures.metrics_server[env],
    MetricsServerHelmChartLabels: EksHelmChartLabels.metrics_server[env],
    MetricsServerHelmChartsFlags: EksHelmChartFlags.metrics_server[env],
    MetricsServerHelmChartVersion: EksHelmChartVersions.metrics_server[env],
    MetricsServerHelmChartValues: EksHelmChartValues.metrics_server[env],
    EnablePrometheus: EksHelmChartFeatures.prometheus[env],
    PrometheusHelmChartLabels: EksHelmChartLabels.prometheus[env],
    PrometheusHelmChartsFlags: EksHelmChartFlags.prometheus[env],
    PrometheusHelmChartVersion: EksHelmChartVersions.prometheus[env],
    PrometheusHelmChartValues: EksHelmChartValues.prometheus[env],
    EnableTekton: EksHelmChartFeatures.tekton[env],
    TektonHelmChartLabels: EksHelmChartLabels.tekton[env],
    TektonHelmChartsFlags: EksHelmChartFlags.tekton[env],
    TektonHelmChartVersion: EksHelmChartVersions.tekton[env],
    TektonHelmChartValues: EksHelmChartValues.tekton[env],
    EnableVault: EksHelmChartFeatures.vault[env],
    VaultHelmChartLabels: EksHelmChartLabels.vault[env],
    VaultHelmChartsFlags: EksHelmChartFlags.vault[env],
    VaultHelmChartVersion: EksHelmChartVersions.vault[env],
    VaultHelmChartValues: EksHelmChartValues.vault[env],
    EnableVaultSecretStoreDriver:
      EksHelmChartFeatures.vault_secret_store_driver[env],
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
    EnableArgoImageUpdater: AksHelmChartFeatures.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartLabels:
      AksHelmChartLabels.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartsFlags:
      AksHelmChartFlags.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartVersion:
      AksHelmChartVersions.argocd_image_updater[env],
    ArgoImageUpdaterHelmChartValues:
      AksHelmChartValues.argocd_image_updater[env],
    EnableArgoNotifications: AksHelmChartFeatures.argo_notifications[env],
    ArgoNotificationsHelmChartLabels:
      AksHelmChartLabels.argo_notifications[env],
    ArgoNotificationsHelmChartsFlags: AksHelmChartFlags.argo_notifications[env],
    ArgoNotificationsHelmChartVersion:
      AksHelmChartVersions.argo_notifications[env],
    ArgoNotificationsHelmChartValues:
      AksHelmChartValues.argo_notifications[env],
    EnableArgoRollouts: AksHelmChartFeatures.argo_rollouts[env],
    ArgoRolloutsHelmChartLabels: AksHelmChartLabels.argo_rollouts[env],
    ArgoRolloutsHelmChartsFlags: AksHelmChartFlags.argo_rollouts[env],
    ArgoRolloutsHelmChartVersion: AksHelmChartVersions.argo_rollouts[env],
    ArgoRolloutsHelmChartValues: AksHelmChartValues.argo_rollouts[env],
    EnableArgoWorkflows: AksHelmChartFeatures.argo_workflows[env],
    ArgoWorkflowsHelmChartLabels: AksHelmChartLabels.argo_workflows[env],
    ArgoWorkflowsHelmChartsFlags: AksHelmChartFlags.argo_workflows[env],
    ArgoWorkflowsHelmChartVersion: AksHelmChartVersions.argo_workflows[env],
    ArgoWorkflowsHelmChartValues: AksHelmChartValues.argo_workflows[env],
    EnableAwsCloudWatchAgent: AksHelmChartFeatures.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartLabels:
      AksHelmChartLabels.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartsFlags:
      AksHelmChartFlags.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartVersion:
      AksHelmChartVersions.aws_cloudwatch_agent[env],
    AwsCloudWatchAgentHelmChartValues:
      AksHelmChartValues.aws_cloudwatch_agent[env],
    EnableAwsEbsCsiDriver: AksHelmChartFeatures.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartLabels: AksHelmChartLabels.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_ebs_csi_driver[env],
    AwsEbsCsiDriverHelmChartValues: AksHelmChartValues.aws_ebs_csi_driver[env],
    EnableAwsEfsCsiDriver: AksHelmChartFeatures.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartLabels: AksHelmChartLabels.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_efs_csi_driver[env],
    AwsEfsCsiDriverHelmChartValues: AksHelmChartValues.aws_efs_csi_driver[env],
    EnableAwsFsxCsiDriver: AksHelmChartFeatures.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartLabels: AksHelmChartLabels.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartsFlags: AksHelmChartFlags.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_fsx_csi_driver[env],
    AwsFsxCsiDriverHelmChartValues: AksHelmChartValues.aws_fsx_csi_driver[env],
    EnableAwsLoadBalancerController:
      AksHelmChartFeatures.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartLabels:
      AksHelmChartLabels.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartsFlags:
      AksHelmChartFlags.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartVersion:
      AksHelmChartVersions.aws_load_balancer_controller[env],
    AwsLoadBalancerControllerHelmChartValues:
      AksHelmChartValues.aws_load_balancer_controller[env],
    EnableAwsSecretStoreCsiDriver:
      AksHelmChartFeatures.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartLabels:
      AksHelmChartLabels.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartsFlags:
      AksHelmChartFlags.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartVersion:
      AksHelmChartVersions.aws_secret_store_csi_driver[env],
    AwsSecretStoreCsiDriverHelmChartValues:
      AksHelmChartValues.aws_secret_store_csi_driver[env],
    EnableCertManager: AksHelmChartFeatures.cert_manager[env],
    CertManagerHelmChartLabels: AksHelmChartLabels.cert_manager[env],
    CertManagerHelmChartsFlags: AksHelmChartFlags.cert_manager[env],
    CertManagerHelmChartVersion: AksHelmChartVersions.cert_manager[env],
    CertManagerHelmChartValues: AksHelmChartValues.cert_manager[env],
    EnableClusterAutoscaler: AksHelmChartFeatures.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartLabels:
      AksHelmChartLabels.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartsFlags: AksHelmChartFlags.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartVersion:
      AksHelmChartVersions.cluster_autoscaler[env],
    ClusterAutoscalerHelmChartValues:
      AksHelmChartValues.cluster_autoscaler[env],
    EnableConsul: AksHelmChartFeatures.consul[env],
    ConsulHelmChartLabels: AksHelmChartLabels.consul[env],
    ConsulHelmChartsFlags: AksHelmChartFlags.consul[env],
    ConsulHelmChartVersion: AksHelmChartVersions.consul[env],
    ConsulHelmChartValues: AksHelmChartValues.consul[env],
    EnableKubeStateMetrics: AksHelmChartFeatures.kube_state_metrics[env],
    KubeStateMetricsHelmChartLabels: AksHelmChartLabels.kube_state_metrics[env],
    KubeStateMetricsHelmChartsFlags: AksHelmChartFlags.kube_state_metrics[env],
    KubeStateMetricsHelmChartVersion:
      AksHelmChartVersions.kube_state_metrics[env],
    KubeStateMetricsHelmChartValues: AksHelmChartValues.kube_state_metrics[env],
    EnableMetricsServer: AksHelmChartFeatures.metrics_server[env],
    MetricsServerHelmChartLabels: AksHelmChartLabels.metrics_server[env],
    MetricsServerHelmChartsFlags: AksHelmChartFlags.metrics_server[env],
    MetricsServerHelmChartVersion: AksHelmChartVersions.metrics_server[env],
    MetricsServerHelmChartValues: AksHelmChartValues.metrics_server[env],
    EnablePrometheus: AksHelmChartFeatures.prometheus[env],
    PrometheusHelmChartLabels: AksHelmChartLabels.prometheus[env],
    PrometheusHelmChartsFlags: AksHelmChartFlags.prometheus[env],
    PrometheusHelmChartVersion: AksHelmChartVersions.prometheus[env],
    PrometheusHelmChartValues: AksHelmChartValues.prometheus[env],
    EnableTekton: AksHelmChartFeatures.tekton[env],
    TektonHelmChartLabels: AksHelmChartLabels.tekton[env],
    TektonHelmChartsFlags: AksHelmChartFlags.tekton[env],
    TektonHelmChartVersion: AksHelmChartVersions.tekton[env],
    TektonHelmChartValues: AksHelmChartValues.tekton[env],
    EnableVault: AksHelmChartFeatures.vault[env],
    VaultHelmChartLabels: AksHelmChartLabels.vault[env],
    VaultHelmChartsFlags: AksHelmChartFlags.vault[env],
    VaultHelmChartVersion: AksHelmChartVersions.vault[env],
    VaultHelmChartValues: AksHelmChartValues.vault[env],
    EnableVaultSecretStoreDriver:
      AksHelmChartFeatures.vault_secret_store_driver[env],
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
