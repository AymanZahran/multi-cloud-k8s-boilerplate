import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

export interface ConsulProps extends ChartProps {
  readonly helmFlags?: string[];
  readonly version?: string;
  readonly values?: any;
}

export class Consul extends Chart {
  constructor(scope: Construct, id: string, props: ConsulProps) {
    super(scope, id, props);

    new Helm(this, "consul", {
      chart: "hashicorp/consul",
      releaseName: "consul",
      namespace: "consul",
      helmFlags: props.helmFlags,
      version: props.version,
      values: props.values,
    });
  }
}
