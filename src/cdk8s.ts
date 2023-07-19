import { App, YamlOutputType } from "cdk8s";
import { ArgoCd } from "./cdk8s/argoCd";
import { ArgoImageUpdater } from "./cdk8s/argoImageUpdater";
import { ArgoNotifications } from "./cdk8s/argoNotifications";
import { ArgoRollouts } from "./cdk8s/argoRollouts";
import { ArgoWorkflows } from "./cdk8s/argoWorkflows";
import { CertManager } from "./cdk8s/certManager";
import { ClusterAutoscaler } from "./cdk8s/clusterAutoscaler";
import { Consul } from "./cdk8s/consul";
import { CrossPlane } from "./cdk8s/crossPlane";
import { KubeStateMetrics } from "./cdk8s/kubeStateMetrics";
import { MetricsServer } from "./cdk8s/metricsServer";
import { Prometheus } from "./cdk8s/prometheus";
import { SecretStoreDriver } from "./cdk8s/secretStoreDriver";
import { Tekton } from "./cdk8s/tekton";
import { Vault } from "./cdk8s/vault";
import {
  Environment,
  HelmChartVersions,
  HelmChartValues,
  HelmChartFeatureFlags,
} from "./const";

// Loop on dev, staging and prod
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
  if (HelmChartFeatureFlags.secrets_store_csi_driver) {
    new SecretStoreDriver(
      app,
      "secret-store-driver",
      {},
      HelmChartVersions.secrets_store_csi_driver[env],
      HelmChartValues.secrets_store_csi_driver[env],
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

  app.synth();
}
