import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class Prometheus extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'prometheus', {
      chart: 'prometheus-community/kube-prometheus-stack',
      version: '48.1.1',
      namespace: 'observability',
      releaseName: 'prometheus',
      values: {},
    });
  }
}
