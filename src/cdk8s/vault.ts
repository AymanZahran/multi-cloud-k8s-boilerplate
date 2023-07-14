import {Helm, Chart, ChartProps} from 'cdk8s';
import {Construct} from 'constructs';

export class Vault extends Chart {
    constructor(scope: Construct, id: string, props: ChartProps = {}) {
        super(scope, id, props);

        // Storage Backend
        new Helm(this, 'consul', {
            chart: 'hashicorp/consul',
            version: '1.1.2',
            namespace: 'consul',
            releaseName: 'consul',
            values: {}
        });

        // Vault
        new Helm(this, 'vault', {
            chart: 'hashicorp/vault',
            version: '0.25.0',
            namespace: 'vault',
            releaseName: 'vault',
            values: {}
        });
    }
}
