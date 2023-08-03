import {Chart, ChartProps, ApiObject} from "cdk8s";
import { Construct } from "constructs";

export interface VpcCrossPlaneProps extends ChartProps {
    readonly name?: string;
    readonly region?: string;
    readonly cidrBlock?: string;
    readonly enableDnsHostNames?: boolean;
    readonly enableDnsSupport?: boolean;
    readonly instanceTenancy?: string;
    readonly providerConfigRef?: string;
    readonly subnetName?: string;
    readonly availabilityZone?: string[];
    readonly subnetCidrBlock?: string[];
}

export class VpcCrossPlane extends Chart {
    constructor(scope: Construct, id: string, props: VpcCrossPlaneProps) {
        super(scope, id, props);

        new ApiObject(this, "crossplane-vpc", {
            apiVersion: "ec2.aws.crossplane.io/v1beta1",
            kind: "VPC",
            metadata: {
                name: props.name,
            },
            spec: {
                forProvider: {
                    cidrBlock: props.cidrBlock,
                },
                enableDnsHostNames: props.enableDnsHostNames,
                enableDnsSupport: props.enableDnsSupport,
                instanceTenancy: props.instanceTenancy,
                region: props.region,
                providerConfigRef: {
                    name: props.providerConfigRef
                }
            }
        });

        for (let i = 0; i < 3; i++) {
            new ApiObject(this, `crossplane-subnet${i}`, {
                apiVersion: "ec2.aws.crossplane.io/v1beta1",
                kind: "Subnet",
                metadata: {
                    name: `${props.subnetName}-${i}`,
                },
                spec: {
                    forProvider: {
                        availabilityZone: props.availabilityZone[i],
                        cidrBlock: props.subnetCidrBlock[i],
                        mapPublicIPOnLaunch: true,
                        vpcIdRef: {
                            name: props.name
                        }
                    },
                    providerConfigRef: {
                        name: props.providerConfigRef
                    }
                }
            });
        }
    }
}
