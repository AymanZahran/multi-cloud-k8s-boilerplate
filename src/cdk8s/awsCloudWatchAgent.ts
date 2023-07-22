import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsCloudWatchAgent extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "cloud-watch-agent", {
      chart: "eks/aws-cloudwatch-metrics",
      releaseName: "amazon-cloudwatch",
      namespace: "amazon-cloudwatch",
      version: version,
      values: values,
    });
  }
}
