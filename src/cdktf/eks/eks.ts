import { Construct } from "constructs";
import { Eks } from "../../../.gen/modules/eks";
import { Vpc } from "../../../.gen/modules/vpc";
import { AwsRegion } from "../../const";

export interface EksClusterProps {
  readonly region: AwsRegion | undefined;
  readonly vpcName: string;
  readonly clusterName: string;
}

export class EksCluster extends Construct {
  private readonly vpc?: Vpc;
  private readonly eks?: Eks;

  constructor(scope: Construct, name: string, props: EksClusterProps) {
    super(scope, name);

    this.vpc = new Vpc(this, "vpc", {
      name: props.vpcName,
      azs: [`${props.region}a`, `${props.region}b`, `${props.region}c`],
    });

    this.eks = new Eks(this, "eks", {
      clusterName: props.clusterName,
      vpcId: this.vpc.vpcIdOutput,
    });
  }

  public get getEksEndpoint(): string | undefined {
    return this.eks?.clusterEndpointOutput as string | undefined;
  }
  public get getEksCertificateAutothority(): string {
    return this.eks?.clusterCertificateAuthorityDataOutput as string;
  }
}
