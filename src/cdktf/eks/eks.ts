import { HelmProvider } from "@cdktf/provider-helm/lib/provider";
import { Release } from "@cdktf/provider-helm/lib/release";
import { Manifest } from "@cdktf/provider-kubernetes/lib/manifest";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { Fn } from "cdktf";
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
  readonly eksInstallArgoCd: boolean;
  readonly eksArgoCdNamespace: string;
  readonly eksArgoCdCreateNamespace: boolean;
  readonly eksArgoCdReleaseName: string;
  readonly eksArgoCdChartVersion: string;
  readonly eksArgoCdTargetRepoUrl: string;
  readonly eksArgoCdProjectName: string;
  readonly eksArgoCdApplicationName: string;
  readonly eksArgoCdApplicationNamespace: string;
  readonly eksArgoCdApplicationSourcePath: string;
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

    if (props.eksInstallArgoCd) {
      const eks_kubernetes_provider = new KubernetesProvider(
        this,
        "EKS_KUBERNETES",
        {
          host: this.eks.clusterEndpointOutput,
          clusterCaCertificate: Fn.base64decode(
            this.eks.clusterCertificateAuthorityDataOutput,
          ),
          token: this.eks.toMetadata().token,
          alias: "eks_kubernetes",
        },
      );

      // Create EKS Helm Provider
      const eks_helm_provider = new HelmProvider(this, "EKS_HELM", {
        kubernetes: {
          host: this.eks.clusterEndpointOutput,
          clusterCaCertificate: Fn.base64decode(
            this.eks.clusterCertificateAuthorityDataOutput,
          ),
        },
        alias: "eks_helm",
      });

      const eks_argocd_install = new Release(this, "argo-cd-eks-install", {
        dependsOn: [this.eks],
        provider: eks_helm_provider,
        chart: "argo/argo-cd",
        repository: "https://argoproj.github.io/argo-helm",
        name: props.eksArgoCdReleaseName,
        namespace: props.eksArgoCdNamespace,
        createNamespace: props.eksArgoCdCreateNamespace,
        version: props.eksArgoCdChartVersion,
      });

      new Manifest(this, "argo-cd-eks-application", {
        dependsOn: [eks_argocd_install],
        provider: eks_kubernetes_provider,
        manifest: {
          apiVersion: "argoproj.io/v1alpha1",
          kind: "Application",
          metadata: {
            name: props.eksArgoCdApplicationName,
            namespace: props.eksArgoCdApplicationNamespace,
            finalizers: ["resources-finalizer.argocd.argoproj.io"],
          },
          spec: {
            destination: {
              namespace: props.eksArgoCdNamespace,
              server: "https://kubernetes.default.svc",
            },
            project: props.eksArgoCdProjectName,
            source: {
              path: props.eksArgoCdApplicationSourcePath,
              repoURL: props.eksArgoCdTargetRepoUrl,
              targetRevision: "HEAD",
            },
          },
        },
      });
    }
  }
}
