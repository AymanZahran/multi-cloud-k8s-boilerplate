import { Construct } from "constructs";
import { Aks } from "../../../.gen/modules/aks";
import { Vnet } from "../../../.gen/modules/vnet";
import { AzureRegion } from "../../const";

export interface AksClusterProps {
  readonly location: AzureRegion | undefined;
  readonly vnetName: string;
  readonly clusterName: string;
  readonly resourceGroupName: string;
}

export class AksCluster extends Construct {
  private readonly vnet?: Vnet;
  private readonly aks?: Aks;

  constructor(scope: Construct, name: string, props: AksClusterProps) {
    super(scope, name);

    this.vnet = new Vnet(this, "vnet", {
      vnetName: props.vnetName,
      resourceGroupName: props.resourceGroupName,
      vnetLocation: `${props.location}`,
      useForEach: true,
    });

    this.aks = new Aks(this, "aks", {
      clusterName: props.clusterName,
      resourceGroupName: props.resourceGroupName,
      location: props.location,
      vnetSubnetId: this.vnet.vnetSubnetsOutput,
    });
  }

  public get getAksEndpoint(): string | undefined {
    return this.aks?.hostOutput as string | undefined;
  }
  public get getEksCertificateAutothority(): string {
    return this.aks?.kubeAdminConfigRawOutput as string;
  }
}
