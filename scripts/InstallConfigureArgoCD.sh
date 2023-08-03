#!/usr/bin/bash

if [ "$CLUSTER_PROVIDER" == "aks" ]; then
  az aks get-credentials --resource-group "$RESOURCE_GROUP" --name "$CLUSTER_NAME"
else # eks
  aws eks update-kubeconfig --region "$CLUSTER_REGION" --name "$CLUSTER_NAME"
fi

if [ $? -eq 0 ]; then
  echo "Connection to $CLUSTER_PROVIDER cluster succeeded"
  kubectl apply -f "$MANIFEST_PATH"
else
  echo "Connection to $CLUSTER_PROVIDER cluster failed"
  exit 1
fi
