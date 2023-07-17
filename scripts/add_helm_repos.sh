#!/bin/bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add jetstack https://charts.jetstack.io
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm repo add autoscaler https://kubernetes.github.io/autoscaler
helm repo add cdf https://cdfoundation.github.io/tekton-helm-chart/
helm repo add secrets-store-csi-driver https://kubernetes-sigs.github.io/secrets-store-csi-driver/charts
helm repo add argo-cd https://argoproj.github.io/argo-helm
helm repo add argo https://argoproj.github.io/argo-helm
helm repo add crossplane-stable https://charts.crossplane.io/stable
helm repo update
