import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export class AwsLoadBalancerController extends Chart {
  constructor(
    scope: Construct,
    id: string,
    props: ChartProps,
    helmFlags?: string[],
    version?: string,
    values?: any,
  ) {
    super(scope, id, props);

    new Helm(this, "aws-load-balancer-controller", {
      chart: "eks/aws-load-balancer-controller",
      releaseName: "aws-load-balancer-controller",
      namespace: "aws-load-balancer-controller",
      helmFlags: helmFlags,
      version: version,
      values: values,
    });
  }
}