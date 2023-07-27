import { Helm, Chart, ChartProps } from "cdk8s";
import { Construct } from "constructs";

interface ConsulProps extends ChartProps {
  helmFlags?: string[];
  version?: string;
  values?: any;
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
