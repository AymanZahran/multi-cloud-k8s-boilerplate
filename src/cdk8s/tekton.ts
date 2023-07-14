import { Helm, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class Tekton extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Helm(this, 'tekton', {
      chart: 'cdf/tekton-pipeline',
      version: '0.6.4',
      namespace: 'tekton-pipelines',
      releaseName: 'tekton',
      values: {},
    });
  }
}
