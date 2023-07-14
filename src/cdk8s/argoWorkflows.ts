import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class ArgoWorkflows extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'argo-workflows', {
      chart: 'argo/argo-workflows',
      version: '0.31.0',
      namespace: 'argocd-workflows',
      releaseName: 'argocd-workflows',
      values: {},
    });
  }
}
