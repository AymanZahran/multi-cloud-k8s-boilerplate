import {Helm, Chart, ChartProps, ApiObject} from "cdk8s";
import {Construct} from "constructs";

interface CrossPlaneProps extends ChartProps {
    provider: string;
    helmFlags?: string[];
    version?: string;
    values?: any;
    iamRoleArn?: string;
    clientId?: string;
    subscriptionId?: string;
    tenantId?: string;
}

export class CrossPlane extends Chart {
    constructor(scope: Construct, id: string, props: CrossPlaneProps) {
        super(scope, id, props);

        new Helm(this, "crossplane", {
            chart: "crossplane-stable/crossplane",
            releaseName: "crossplane",
            namespace: "crossplane-system",
            helmFlags: props.helmFlags,
            version: props.version,
            values: props.values,
        });

        if (props.provider === "eks") {
            // For Security purposes and secrets leakage, Let's use IRSA
            new ApiObject(this, "crossplane-aws-sa", {
                apiVersion: "v1",
                kind: "ServiceAccount",
                metadata: {
                    name: "crossplane-aws-sa",
                    namespace: "crossplane-system",
                    annotations: {
                        "eks.amazonaws.com/role-arn": props.iamRoleArn as string,
                    },
                }
            });
            new ApiObject(this, "crossplane-aws-controller-config", {
                apiVersion: "pkg.crossplane.io/v1alpha1",
                kind: "ControllerConfig",
                metadata: {
                    name: "irsa-controllerconfig",
                    annotations: {
                        "eks.amazonaws.com/role-arn": props.iamRoleArn as string,
                    }
                },
                spec: {
                    podSecurityContext: {
                        fsGroup: 2000,
                    }
                }
            });
            new ApiObject(this, "crossplane-aws-provider", {
                apiVersion: "pkg.crossplane.io/v1",
                kind: "Provider",
                metadata: {
                    name: "provider-aws",
                },
                spec: {
                    package: "xpkg.upbound.io/upbound/provider-aws:v0.37.0",
                    packagePullSecrets: {
                        name: "package-pull-secret",
                    },
                    controllerConfigRef: {
                        name: "irsa-controllerconfig",
                    }
                }
            });
            new ApiObject(this, "crossplane-aws-provider-config", {
                apiVersion: "aws.upbound.io/v1beta1",
                kind: "ProviderConfig",
                metadata: {
                    name: "irsa",
                },
                spec: {
                    credentials: {
                        source: "IRSA",
                    }
                }
            });
        } else {
            new ApiObject(this, "crossplane-azure-provider", {
                apiVersion: "pkg.crossplane.io/v1",
                kind: "Provider",
                metadata: {
                    name: "provider-azure",
                },
                spec: {
                    package: "xpkg.upbound.io/upbound/provider-azure:v0.34.0",
                }
            });
            // For Security purposes and secrets leakage, Let's use User Assigned Managed Identity
            new ApiObject(this, "crossplane-azure-provider-config", {
                apiVersion: "azure.upbound.io/v1beta1",
                kind: "ProviderConfig",
                metadata: {
                    name: "default",
                },
                spec: {
                    credentials: {
                        source: "UserAssignedIdentity",
                    },
                    clientID: props.clientId,
                    subscriptionID: props.subscriptionId,
                    tenantID: props.tenantId,
                },
            });
        }
    }
}
