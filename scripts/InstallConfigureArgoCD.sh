#!/usr/bin/bash

if [ "$CLUSTER_PROVIDER" == "aks" ]; then
  az aks get-credentials --resource-group "$RESOURCE_GROUP" --name "$CLUSTER_NAME"
else # eks
  aws eks --region "$CLUSTER_REGION" update-kubeconfig --name "$CLUSTER_NAME"
fi

if [ $? -eq 0 ]; then
  echo "Connection to $CLUSTER_PROVIDER cluster succeeded"
else
  echo "Connection to $CLUSTER_PROVIDER cluster failed"
  exit 1
fi
