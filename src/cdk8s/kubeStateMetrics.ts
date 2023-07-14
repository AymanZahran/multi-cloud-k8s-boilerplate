import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class KubeStateMetrics extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'kube-state-metrics-dev', {
      chart: 'prometheus-community/kube-state-metrics',
      version: '5.9.0',
      namespace: 'observability',
      releaseName: 'kube-state-metrics',
      values: {},
    });
  }
}
