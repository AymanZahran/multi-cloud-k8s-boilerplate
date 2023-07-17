#!/bin/bash

# Charts Array
Charts=(
    "argo/argo-cd"
    "argo/argocd-image-updater"
    "argo/argocd-notifications"
    "argo/argo-rollouts"
    "argo/argo-workflows"
    "jetstack/cert-manager"
    "autoscaler/cluster-autoscaler"
    "hashicorp/consul"
    "crossplane-stable/crossplane"
    "prometheus-community/kube-state-metrics"
    "metrics-server/metrics-server"
    "prometheus-community/kube-prometheus-stack"
    "secrets-store-csi-driver/secrets-store-csi-driver"
    "cdf/tekton-pipeline"
    "hashicorp/vault"
)

# Loop on Charts Array and get the latest version
for chart in "${Charts[@]}"
do
    # Get the latest version of the chart
    chart_latest_version=$(helm search repo $chart | awk '{ print $2 }' | tail -1)

    # Get chart const name
    chart_name=$(echo $chart | sed 's/-/_/g')

    # Replace the chart version in the const.ts file
    sed -i "s/$chart_name = \".*\";/$chart_name = \"$chart_latest_version\";/" const.ts
done
