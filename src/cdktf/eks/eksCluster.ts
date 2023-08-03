import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { NullProvider } from "@cdktf/provider-null/lib/provider";
import { Resource } from "@cdktf/provider-null/lib/resource";
import { Construct } from "constructs";
import { Eks } from "../../../.gen/modules/eks";
import { Vpc } from "../../../.gen/modules/vpc";
import { AwsRegion } from "../../properties/const";

export interface EksClusterProps {
  readonly AccountId: string;
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
  readonly eksInstallArgoCd: boolean;
  readonly eksInstallArgoCdPath: string;
  readonly eksCrossPlaneIamRoleArn: string;
  readonly eksCrossPlaneServiceAccountName: string;
  readonly eksCrossPlaneNamespace: string;
}

export class EksCluster extends Construct {
  private readonly vpc?: Vpc;
  private readonly eks?: Eks;

  constructor(scope: Construct, name: string, props: EksClusterProps) {
    super(scope, name);

    // Create VPC
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

    // Create EKS Cluster
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

    new IamRole(this, "iam-eks-node-role", {
      dependsOn: [this.eks],
      name: props.eksIamRoleName,
      managedPolicyArns: ["arn:aws:iam::aws:policy/AdministratorAccess"],
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "AllowCrossplaneToAssumeRole",
            Effect: "Allow",
            Principal: {
              Federated: `arn:aws:iam::${props.AccountId}:oidc-provider/oidc.eks.${props.eksRegion}.amazonaws.com/id/${props.eksCrossPlaneIamRoleArn}`,
            },
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
              StringEquals: {
                [`oidc.eks.${props.eksRegion}.amazonaws.com/id/${props.eksCrossPlaneIamRoleArn}:sub`]: `system:serviceaccount:${props.eksCrossPlaneNamespace}:${props.eksCrossPlaneServiceAccountName}`,
                [`oidc.eks.${props.eksRegion}.amazonaws.com/id/${props.eksCrossPlaneIamRoleArn}:aud`]:
                  "sts.amazonaws.com",
              },
            },
          },
        ],
      }),
    });

    // Install ArgoCD on EKS Cluster
    if (props.eksInstallArgoCd) {
      // TODO Currently, we are using null provider to install ArgoCD on Kubernetes Cluster
      //  Use Terraform Kubernetes Provider or cdktf Kubernetes Provider when there is a version
      //  which supports applying mainifests on Kubernetes Cluster that's not exists
      //  To avoid the `Cannot create REST client: no client config` error during the terraform plan
      //  OR Use kubectl terraform provider when it is officially trusted by Hashicorp'
      const eks_null_provider = new NullProvider(this, "eks-null-provider", {
        alias: "eks_null",
      });
      new Resource(this, "argo-cd-eks-install-null", {
        dependsOn: [this.eks],
        provider: eks_null_provider,
        provisioners: [
          {
            type: "local-exec",
            when: "create",
            interpreter: ["bash", "-c"],
            workingDir: "./",
            environment: {
              CLUSTER_PROVIDER: "aks",
              CLUSTER_NAME: props.eksClusterName,
              EKS_REGION: props.eksRegion as string,
              MANIFEST_PATH: props.eksInstallArgoCdPath,
            },
            command: "./scripts/InstallConfigureArgoCD.sh",
          },
        ],
      });
    }
  }
}
