import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface AwsCloudWatchAgentProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class AwsCloudWatchAgent extends Chart {
  constructor(scope: Construct, id: string, props: AwsCloudWatchAgentProps) {
    super(scope, id, props);

    new Helm(this, "cloud-watch-agent", {
      chart: "eks/aws-cloudwatch-metrics",
      releaseName: "amazon-cloudwatch",
      namespace: "amazon-cloudwatch",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
