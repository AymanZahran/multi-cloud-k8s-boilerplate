import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";
import { HelmChartVersions } from "../const";

export class CrossPlane extends Chart {
    constructor(scope: Construct, id: string, props: ChartProps = {}) {
        super(scope, id, props);

        new Helm(this, "crossplane", {
            chart: "crossplane-stable/crossplane",
            version: HelmChartVersions.crossplane,
            namespace: "crossplane-system",
            releaseName: "crossplane",
            values: {},
        });
    }
}
