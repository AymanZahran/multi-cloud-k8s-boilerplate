export const EksHelmChartFlags: any = {
  argo_cd: {
    dev: ["--set", "application.resourceTrackingMethod=annotation"],
    staging: ["--set", "application.resourceTrackingMethod=annotation"],
    prod: ["--set", "application.resourceTrackingMethod=annotation"],
  },
  argocd_image_updater: {
    dev: [],
    staging: [],
    prod: [],
  },
  argo_notifications: {
    dev: [],
    staging: [],
    prod: [],
  },
  argo_rollouts: {
    dev: [],
    staging: [],
    prod: [],
  },
  argo_workflows: {
    dev: [],
    staging: [],
    prod: [],
  },
  cert_manager: {
    dev: [],
    staging: [],
    prod: [],
  },
  cluster_autoscaler: {
    dev: [],
    staging: [],
    prod: [],
  },
  consul: {
    dev: [],
    staging: [],
    prod: [],
  },
  crossplane: {
    dev: [],
    staging: [],
    prod: [],
  },
  kube_state_metrics: {
    dev: [],
    staging: [],
    prod: [],
  },
  metrics_server: {
    dev: [],
    staging: [],
    prod: [],
  },
  prometheus: {
    dev: [],
    staging: [],
    prod: [],
  },
  vault_secret_store_driver: {
    dev: [],
    staging: [],
    prod: [],
  },
  tekton: {
    dev: [],
    staging: [],
    prod: [],
  },
  vault: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_ebs_csi_driver: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_efs_csi_driver: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_fsx_csi_driver: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_secret_store_csi_driver: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_cloudwatch_agent: {
    dev: [],
    staging: [],
    prod: [],
  },
  aws_load_balancer_controller: {
    dev: [],
    staging: [],
    prod: [],
  },
};
