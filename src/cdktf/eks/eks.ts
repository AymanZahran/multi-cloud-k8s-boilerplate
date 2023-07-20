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
  readonly eksPublicSubnets: string[];
  readonly eksEnableNatGateway: boolean;
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
  readonly eksManagedNodeGroupCustomLaunchTemplate: boolean;
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
      privateSubnetNames: props.eksPrivateSubnetNames,
      publicSubnets: props.eksPublicSubnets,
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
      subnetIds: [this.vpc.publicSubnetsOutput],
      createAwsAuthConfigmap: props.eksCreateAwsAuthConfigmap,
      manageAwsAuthConfigmap: props.eksManageAwsAuthConfigmap,
      create: true,
      createNodeSecurityGroup: props.eksCreateNodeSecurityGroup,
      createClusterSecurityGroup: props.eksCreateClusterSecurityGroup,
      createCloudwatchLogGroup: props.eksCreateCloudwatchLogGroup,
      createIamRole: props.eksCreateIamRole,
      iamRoleName: props.eksIamRoleName,
      eksManagedNodeGroups: {
        name: props.eksManagedNodeGroupName,
        instanceType: props.eksManagedNodeGroupInstanceType,
        use_custom_launch_template:
          props.eksManagedNodeGroupCustomLaunchTemplate,
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

  public get getEksEndpoint(): string | undefined {
    return this.eks?.clusterEndpointOutput as string | undefined;
  }

  public get getEksCertificateAutothority(): string {
    return this.eks?.clusterCertificateAuthorityDataOutput as string;
  }
}
