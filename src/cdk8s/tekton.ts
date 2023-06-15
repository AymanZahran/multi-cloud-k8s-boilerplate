import { ApiObject, Chart, ChartProps } from 'cdk8s';
import { Construct } from 'constructs';

export class Tekton extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const label = {
      app: 'nginx',
      environment: 'dev',
    };

    new ApiObject(this, 'deployment', {
      apiVersion: 'v1',
      kind: 'Pod',
      metadata: {
        namespace: 'frontend',
        name: 'nginx',
        labels: label,
      },
      spec: {
        containers: [{
          name: 'nginx',
          image: 'nginx:1.14-alpine',
          resources: {
            limits: {
              memory: '20Mi',
              cpu: 0.2,
            },
          },
        }],
      },
    });
  }
}