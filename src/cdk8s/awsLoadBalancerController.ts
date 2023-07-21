import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsLoadBalancerController extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps = {},
    version: string,
    values: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-load-balancer-controller", {
      chart: "eks/aws-load-balancer-controller",
      releaseName: "aws-load-balancer-controller",
      namespace: "aws-load-balancer-controller",
      version: version,
      values: values,
    });
  }
}