import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class ClusterAutoscaler extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'cluster-autoscaler', {
      chart: 'autoscaler/cluster-autoscaler',
      version: '9.29.1',
      namespace: 'cluster-autoscaler',
      releaseName: 'cluster-autoscaler',
      values: {},
    });
  }
}
