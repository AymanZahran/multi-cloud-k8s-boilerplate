import { ITerraformDependable } from "cdktf";
import { Construct } from "constructs";
import { Eks } from "../../../.gen/modules/eks";
import { Vpc } from "../../../.gen/modules/vpc";
import { AwsRegion } from "../../const";

export interface EksClusterProps {
  readonly eksRegion: AwsRegion | undefined;
  readonly eksCreateVpc: boolean;
  readonly eksCreateIgw: boolean;
  readonly eksAzs: string[];
  readonly eksPrivateSubnetNames: string[];
  readonly eksPublicSubnetNames: string[];
  readonly eksEnableNatGateway: boolean;
  readonly eksCidr: string;
  readonly eksVpcName: string;
  readonly eksClusterName: string;
  readonly eksCreateAwsAuthConfigmap: boolean;
  readonly eksManageAwsAuthConfigmap: boolean;
  readonly eksCreateNodeSecurityGroup: boolean;
  readonly eksCreateClusterSecurityGroup: boolean;
  readonly eksCreateCloudwatchLogGroup: boolean;
  readonly eksCreateIamRole: boolean;
  readonly eksIamRoleName: string;
  readonly eksManagedNodeGroupName: string;
  readonly eksManagedNodeGroupInstanceType: string;
  readonly eksManagedNodeGroupMinSize: number;
  readonly eksManagedNodeGroupMaxSize: number;
  readonly eksManagedNodeGroupDesiredSize: number;
  readonly eksTags: { [key: string]: string };
}

export class EksCluster extends Construct {
  private readonly vpc?: Vpc;
  private readonly eks?: Eks;

  constructor(scope: Construct, name: string, props: EksClusterProps) {
    super(scope, name);

    this.vpc = new Vpc(this, "vpc", {
      name: props.eksVpcName,
      createVpc: props.eksCreateVpc,
      createIgw: props.eksCreateIgw,
      enableNatGateway: props.eksEnableNatGateway,
      azs: props.eksAzs,
      cidr: props.eksCidr,
      privateSubnetNames: props.eksPrivateSubnetNames,
      publicSubnetNames: props.eksPublicSubnetNames,
      publicSubnetTags: props.eksTags,
      tags: props.eksTags,
      vpcTags: props.eksTags,
      natEipTags: props.eksTags,
      natGatewayTags: props.eksTags,
      igwTags: props.eksTags,
      privateSubnetTags: props.eksTags,
    });

    this.eks = new Eks(this, "eks", {
      dependsOn: [this.vpc],
      clusterName: props.eksClusterName,
      vpcId: this.vpc.vpcIdOutput,
      controlPlaneSubnetIds: this.vpc.publicSubnetNames,
      subnetIds: this.vpc.publicSubnetNames,
      createAwsAuthConfigmap: props.eksCreateAwsAuthConfigmap,
      manageAwsAuthConfigmap: props.eksManageAwsAuthConfigmap,
      create: true,
      createNodeSecurityGroup: props.eksCreateNodeSecurityGroup,
      createClusterSecurityGroup: props.eksCreateClusterSecurityGroup,
      createCloudwatchLogGroup: props.eksCreateCloudwatchLogGroup,
      createIamRole: props.eksCreateIamRole,
      iamRoleName: props.eksIamRoleName,
      eksManagedNodeGroupDefaults: {
        name: props.eksManagedNodeGroupName,
        instanceType: props.eksManagedNodeGroupInstanceType,
        minSize: props.eksManagedNodeGroupMinSize,
        maxSize: props.eksManagedNodeGroupMaxSize,
        desiredSize: props.eksManagedNodeGroupDesiredSize,
        labels: props.eksTags,
      },
      iamRoleTags: props.eksTags,
      clusterTags: props.eksTags,
      tags: props.eksTags,
    });
  }

  public get getEksCluster(): ITerraformDependable {
    return this.eks as ITerraformDependable;
  }

  public get getEksEndpoint(): string | undefined {
    return this.eks?.clusterEndpointOutput as string | undefined;
  }

  public get getEksCertificateAutothority(): string {
    return this.eks?.clusterCertificateAuthorityDataOutput as string;
  }
  public get getEksClusterToken(): string {
    return this.eks?.toMetadata().token as string;
  }
}
