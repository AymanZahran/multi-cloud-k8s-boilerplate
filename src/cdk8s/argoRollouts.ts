import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class ArgoRollouts extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'argo-rollouts', {
      chart: 'argo/argo-rollouts',
      version: '2.31.0',
      namespace: 'argocd-rollouts',
      releaseName: 'argocd-rollouts',
      values: {},
    });
  }
}
