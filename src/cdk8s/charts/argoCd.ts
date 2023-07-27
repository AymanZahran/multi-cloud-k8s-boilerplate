import { Helm, Chart, ChartProps, ApiObject } from "cdk8s";
import { Construct } from "constructs";
import { KubernetesDir, RepoURL } from "../../const";

export interface ArgoCdProps extends ChartProps {
  clusterType: string;
  provider: string;
  environment: string;
  helmFlags?: string[];
  version?: string;
  values?: any;
}

export class ArgoCd extends Chart {
  constructor(scope: Construct, id: string, props: ArgoCdProps) {
    super(scope, id, props);

    new Helm(this, "argo-cd", {
      chart: "argo/argo-cd",
      releaseName: "argocd",
      namespace: "argocd",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });

    new ApiObject(this, "argo-cd-application", {
      apiVersion: "argoproj.io/v1alpha1",
      kind: "Application",
      metadata: {
        name: "argo-cd-application",
        namespace: "argocd",
        finalizers: ["resources-finalizer.argocd.argoproj.io"],
      },
      spec: {
        destination: {
          namespace: "argocd",
          server: "https://kubernetes.default.svc",
        },
        project: "default",
        source: {
          path:
            KubernetesDir +
            "/" +
            props.clusterType +
            "/" +
            props.provider +
            "/" +
            props.environment,
          repoURL: RepoURL,
          targetRevision: "HEAD",
        },
      },
    });
  }
}
