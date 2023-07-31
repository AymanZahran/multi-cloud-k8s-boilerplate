import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface AwsLoadBalancerControllerProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class AwsLoadBalancerController extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: AwsLoadBalancerControllerProps,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-load-balancer-controller", {
      chart: "eks/aws-load-balancer-controller",
      releaseName: "aws-load-balancer-controller",
      namespace: "aws-load-balancer-controller",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
