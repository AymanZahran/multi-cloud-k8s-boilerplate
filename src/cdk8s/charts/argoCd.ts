import {Helm, Chart, ChartProps, ApiObject} from "cdk8s";
import { Construct } from "constructs";

export class ArgoCd extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "argo-cd", {
      chart: "argo/argo-cd",
      releaseName: "argocd",
      namespace: "argocd",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });

    new ApiObject(this, "argo-cd-application", {
      apiVersion: "argoproj.io/v1alpha1",
      kind: "Application",
      metadata: {
        name: "argo-cd",
        namespace: "argocd",
      },
      spec: {
        destination: {
          namespace: "argocd",
          server: "https://kubernetes.default.svc",
        },
        project: "default",
        source: {
          path: "kubernetes/management/aks/dev",
          repoURL: "https://github.com/AymanZahran/multi-cloud-k8s-boilerplate"
        }
      }
    });
  }
}
