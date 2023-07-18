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
import { HelmChartVersions, HelmChartValues } from "./const";

// Loop on dev, staging and prod

enum Environments {
  dev = "dev",
  staging = "staging",
  prod = "prod",
}

for (const env of Object.values(Environments)) {
  const app = new App({
    outdir: "dist/" + env,
    outputFileExtension: ".yaml",
    yamlOutputType: YamlOutputType.FILE_PER_CHART,
  });
  new ArgoCd(app, "argo-cd", {}, HelmChartVersions.argo_cd[env], {});
  new ArgoImageUpdater(
    app,
    "argo-image-updater",
    {},
    HelmChartVersions.argocd_image_updater[env],
    HelmChartValues.argocd_image_updater[env],
  );
  new ArgoNotifications(
    app,
    "argo-notifications",
    {},
    HelmChartVersions.argo_notifications[env],
    HelmChartValues.argo_notifications[env],
  );
  new ArgoRollouts(
    app,
    "argo-rollouts",
    {},
    HelmChartVersions.argo_rollouts[env],
    HelmChartValues.argo_rollouts[env],
  );
  new ArgoWorkflows(
    app,
    "argo-workflows",
    {},
    HelmChartVersions.argo_workflows[env],
    HelmChartValues.argo_workflows[env],
  );
  new CertManager(
    app,
    "cert-manager",
    {},
    HelmChartVersions.cert_manager[env],
    HelmChartValues.cluster_autoscaler[env],
  );
  new ClusterAutoscaler(
    app,
    "cluster-autoscaler",
    {},
    HelmChartVersions.cluster_autoscaler[env],
    HelmChartValues.cluster_autoscaler[env],
  );
  new Consul(app, "consul", {}, HelmChartVersions.consul[env], {});
  new CrossPlane(app, "crossplane", {}, HelmChartVersions.crossplane[env], {});
  new KubeStateMetrics(
    app,
    "kube-state-metrics",
    {},
    HelmChartVersions.kube_state_metrics[env],
    HelmChartValues.kube_state_metrics[env],
  );
  new MetricsServer(
    app,
    "metrics-server",
    {},
    HelmChartVersions.metrics_server[env],
    HelmChartValues.metrics_server[env],
  );
  new Prometheus(
    app,
    "prometheus",
    {},
    HelmChartVersions.kube_prometheus_stack[env],
    HelmChartValues.kube_prometheus_stack[env],
  );
  new SecretStoreDriver(
    app,
    "secret-store-driver",
    {},
    HelmChartVersions.secrets_store_csi_driver[env],
    HelmChartValues.secrets_store_csi_driver[env],
  );
  new Tekton(
    app,
    "tekton",
    {},
    HelmChartVersions.tekton_pipeline[env],
    HelmChartValues.tekton_pipeline[env],
  );
  new Vault(
    app,
    "vault",
    {},
    HelmChartVersions.vault[env],
    HelmChartValues.vault[env],
  );

  app.synth();
}
