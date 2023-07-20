import { App, YamlOutputType } from "cdk8s";
import { ArgoCd } from "./cdk8s/argoCd";
import { ArgoImageUpdater } from "./cdk8s/argoImageUpdater";
import { ArgoNotifications } from "./cdk8s/argoNotifications";
import { ArgoRollouts } from "./cdk8s/argoRollouts";
import { ArgoWorkflows } from "./cdk8s/argoWorkflows";
import { AwsCloudWatchAgent } from "./cdk8s/awsCloudWatchAgent";
import { AwsEbsCsiDriver } from "./cdk8s/awsEbsCsiDriver";
import { AwsEfsCsiDriver } from "./cdk8s/awsEfsCsiDriver";
import { AwsFsxCsiDriver } from "./cdk8s/awsFsxCsiDriver";
import { AwsLoadBalancerController } from "./cdk8s/awsLoadBalancerController";
import { AwsSecretStoreCsiDriver } from "./cdk8s/awsSecretStoreCsiDriver";
import { CertManager } from "./cdk8s/certManager";
import { ClusterAutoscaler } from "./cdk8s/clusterAutoscaler";
import { Consul } from "./cdk8s/consul";
import { CrossPlane } from "./cdk8s/crossPlane";
import { KubeStateMetrics } from "./cdk8s/kubeStateMetrics";
import { MetricsServer } from "./cdk8s/metricsServer";
import { Prometheus } from "./cdk8s/prometheus";
import { Tekton } from "./cdk8s/tekton";
import { HelmChartFeatureFlags } from "./cdk8s/vars/feature";
import { HelmChartValues } from "./cdk8s/vars/values";
import { HelmChartVersions } from "./cdk8s/vars/versions";
import { Vault } from "./cdk8s/vault";
import { VaultSecretStoreDriver } from "./cdk8s/vaultSecretStoreDriver";
import { Environment } from "./const";

for (const env of Object.values(Environment)) {
  const app = new App({
    outdir: "dist/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });
  if (HelmChartFeatureFlags.argo_cd) {
    new ArgoCd(
      app,
      "argo-cd",
      {},
      HelmChartVersions.argo_cd[env],
      HelmChartValues.argo_cd[env],
    );
  }
  if (HelmChartFeatureFlags.argo_image_updater) {
    new ArgoImageUpdater(
      app,
      "argo-image-updater",
      {},
      HelmChartVersions.argocd_image_updater[env],
      HelmChartValues.argocd_image_updater[env],
    );
  }
  if (HelmChartFeatureFlags.argo_notifications) {
    new ArgoNotifications(
      app,
      "argo-notifications",
      {},
      HelmChartVersions.argo_notifications[env],
      HelmChartValues.argo_notifications[env],
    );
  }
  if (HelmChartFeatureFlags.argo_rollouts) {
    new ArgoRollouts(
      app,
      "argo-rollouts",
      {},
      HelmChartVersions.argo_rollouts[env],
      HelmChartValues.argo_rollouts[env],
    );
  }
  if (HelmChartFeatureFlags.argo_workflows) {
    new ArgoWorkflows(
      app,
      "argo-workflows",
      {},
      HelmChartVersions.argo_workflows[env],
      HelmChartValues.argo_workflows[env],
    );
  }
  if (HelmChartFeatureFlags.cert_manager) {
    new CertManager(
      app,
      "cert-manager",
      {},
      HelmChartVersions.cert_manager[env],
      HelmChartValues.cluster_autoscaler[env],
    );
  }
  if (HelmChartFeatureFlags.cluster_autoscaler) {
    new ClusterAutoscaler(
      app,
      "cluster-autoscaler",
      {},
      HelmChartVersions.cluster_autoscaler[env],
      HelmChartValues.cluster_autoscaler[env],
    );
  }
  if (HelmChartFeatureFlags.consul) {
    new Consul(
      app,
      "consul",
      {},
      HelmChartVersions.consul[env],
      HelmChartValues.consul[env],
    );
  }
  if (HelmChartFeatureFlags.crossplane) {
    new CrossPlane(
      app,
      "crossplane",
      {},
      HelmChartVersions.crossplane[env],
      HelmChartValues.crossplane[env],
    );
  }
  if (HelmChartFeatureFlags.kube_state_metrics) {
    new KubeStateMetrics(
      app,
      "kube-state-metrics",
      {},
      HelmChartVersions.kube_state_metrics[env],
      HelmChartValues.kube_state_metrics[env],
    );
  }
  if (HelmChartFeatureFlags.metrics_server) {
    new MetricsServer(
      app,
      "metrics-server",
      {},
      HelmChartVersions.metrics_server[env],
      HelmChartValues.metrics_server[env],
    );
  }
  if (HelmChartFeatureFlags.kube_prometheus_stack) {
    new Prometheus(
      app,
      "prometheus",
      {},
      HelmChartVersions.kube_prometheus_stack[env],
      HelmChartValues.kube_prometheus_stack[env],
    );
  }
  if (HelmChartFeatureFlags.vault_secrets_store_csi_driver) {
    new VaultSecretStoreDriver(
      app,
      "secret-store-driver",
      {},
      HelmChartVersions.vault_secrets_store_csi_driver[env],
      HelmChartValues.vault_secrets_store_csi_driver[env],
    );
  }
  if (HelmChartFeatureFlags.tekton_pipeline) {
    new Tekton(
      app,
      "tekton",
      {},
      HelmChartVersions.tekton_pipeline[env],
      HelmChartValues.tekton_pipeline[env],
    );
  }
  if (HelmChartFeatureFlags.vault) {
    new Vault(
      app,
      "vault",
      {},
      HelmChartVersions.vault[env],
      HelmChartValues.vault[env],
    );
  }
  if (HelmChartFeatureFlags.aws_cloudwatch_agent) {
    new AwsCloudWatchAgent(
      app,
      "aws-cloudwatch-agent",
      {},
      HelmChartVersions.aws_cloudwatch_agent[env],
      HelmChartValues.aws_cloudwatch_agent[env],
    );
  }
  if (HelmChartFeatureFlags.aws_ebs_csi_driver) {
    new AwsEbsCsiDriver(
      app,
      "aws-ebs-csi-driver",
      {},
      HelmChartVersions.aws_ebs_csi_driver[env],
      HelmChartValues.aws_ebs_csi_driver[env],
    );
  }
  if (HelmChartFeatureFlags.aws_efs_csi_driver) {
    new AwsEfsCsiDriver(
      app,
      "aws-efs-csi-driver",
      {},
      HelmChartVersions.aws_efs_csi_driver[env],
      HelmChartValues.aws_efs_csi_driver[env],
    );
  }
  if (HelmChartFeatureFlags.aws_fsx_csi_driver) {
    new AwsFsxCsiDriver(
      app,
      "aws-fsx-csi-driver",
      {},
      HelmChartVersions.aws_fsx_csi_driver[env],
      HelmChartValues.aws_fsx_csi_driver[env],
    );
  }
  if (HelmChartFeatureFlags.secrets_store_csi_driver) {
    new AwsSecretStoreCsiDriver(
      app,
      "secrets-store-csi-driver",
      {},
      HelmChartVersions.secrets_store_csi_driver[env],
      HelmChartValues.secrets_store_csi_driver[env],
    );
  }
  if (HelmChartFeatureFlags.aws_load_balancer_controller) {
    new AwsLoadBalancerController(
      app,
      "aws-load-balancer-controller",
      {},
      HelmChartVersions.aws_load_balancer_controller[env],
      HelmChartValues.aws_load_balancer_controller[env],
    );
  }
  app.synth();
}
