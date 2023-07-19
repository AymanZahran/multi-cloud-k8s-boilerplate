import {Construct} from "constructs";
import {Eks} from "../../../.gen/modules/eks";
import {Vpc} from "../../../.gen/modules/vpc";
import {AwsRegion} from "../../const";

export interface EksClusterProps {
    readonly region: AwsRegion | undefined;
    readonly environment: string;
    readonly createVpc: boolean;
    readonly createIgw: boolean;
    readonly azs: string[];
    readonly intraSubnetNames: string[];
    readonly privateSubnetNames: string[];
    readonly publicSubnets: string[];
    readonly enableNatGateway: boolean;
    readonly vpcName: string;
    readonly eksClusterName: string;
    readonly createAwsAuthConfigmap: boolean;
    readonly manageAwsAuthConfigmap: boolean;
    readonly createNodeSecurityGroup: boolean
    readonly createClusterSecurityGroup: boolean;
    readonly createCloudwatchLogGroup: boolean;
    readonly createIamRole: boolean;
    readonly iamRoleName: string;
    readonly managedNodeGroupName: string;
    readonly managedNodeGroupInstanceType: string;
    readonly managedNodeGroupMinSize: number;
    readonly managedNodeGroupMaxSize: number;
    readonly managedNodeGroupDesiredSize: number;
    readonly managedNodeGroupCustomLaunchTemplate: boolean;
    readonly tags: { [key: string]: string };
}

export class EksCluster extends Construct {
    private readonly vpc?: Vpc;
    private readonly eks?: Eks;

    constructor(scope: Construct, name: string, props: EksClusterProps) {
        super(scope, name);

        this.vpc = new Vpc(this, "vpc", {
            name: props.vpcName,
            createVpc: props.createVpc,
            createIgw: props.createIgw,
            enableNatGateway: props.enableNatGateway,
            intraSubnetNames: props.intraSubnetNames,
            privateSubnetNames: props.privateSubnetNames,
            publicSubnets: props.publicSubnets,
            publicSubnetTags: props.tags,
            tags: props.tags,
            vpcTags: props.tags,
            natEipTags: props.tags,
            natGatewayTags: props.tags,
            igwTags: props.tags,
            privateSubnetTags: props.tags,
        });

        this.eks = new Eks(this, "eks", {
            dependsOn: [this.vpc],
            clusterName: props.eksClusterName,
            vpcId: this.vpc.vpcIdOutput,
            subnetIds: [this.vpc.publicSubnetsOutput],
            createAwsAuthConfigmap: props.createAwsAuthConfigmap,
            manageAwsAuthConfigmap: props.manageAwsAuthConfigmap,
            create: true,
            createNodeSecurityGroup: props.createNodeSecurityGroup,
            createClusterSecurityGroup: props.createClusterSecurityGroup,
            createCloudwatchLogGroup: props.createCloudwatchLogGroup,
            createIamRole: props.createIamRole,
            iamRoleName: props.iamRoleName,
            eksManagedNodeGroups: {
                name: props.managedNodeGroupName,
                instanceType: props.managedNodeGroupInstanceType,
                use_custom_launch_template: props.managedNodeGroupCustomLaunchTemplate,
                minSize: props.managedNodeGroupMinSize,
                maxSize: props.managedNodeGroupMaxSize,
                desiredSize: props.managedNodeGroupDesiredSize,
                labels: props.tags,
                tags: props.tags,
            },
            iamRoleTags: props.tags,
            clusterTags: props.tags,
            tags: props.tags,
        });
    }

    public get getEksEndpoint(): string | undefined {
        return this.eks?.clusterEndpointOutput as string | undefined;
    }

    public get getEksCertificateAutothority(): string {
        return this.eks?.clusterCertificateAuthorityDataOutput as string;
    }
}
