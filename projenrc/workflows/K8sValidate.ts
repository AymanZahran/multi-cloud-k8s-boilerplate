import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";

export function K8sValidateWorkflows(project: typescript.TypeScriptAppProject) {
  for (const env of ["dev", "staging", "prod"]) {
    const k8s_validate = new GithubWorkflow(
      project.github!,
      "k8svalidate-" + env + "-build",
    );
    k8s_validate.on({
      pullRequest: {
        branches: ["master"],
      },
    });
    k8s_validate.addJob("build", {
      name: "k8svalidate-" + env + "-build",
      runsOn: ["ubuntu-latest"],
      permissions: {
        contents: JobPermission.READ,
      },
      env: {
        stack: env,
      },
      steps: [
        {
          name: "Checkout",
          uses: "actions/checkout@v3",
        },
        {
          name: "Install Kubeval",
          run:
            "wget https://github.com/instrumenta/kubeval/releases/latest/download/kubeval-linux-amd64.tar.gz\n" +
            "tar xf kubeval-linux-amd64.tar.gz\n" +
            "cp kubeval /usr/local/bin",
        },
        {
          name: "Validate K8s Manifests",
          run:
            'echo "Running kubeval validations..."\n' +
            'if ! [ -x "$(command -v kubeval)" ]; then\n' +
            "  echo 'Error: kubeval is not installed.' >&2\n" +
            "  exit 1\n" +
            "fi\n" +
            "if kubeval --ignore-missing-schemas kubernetes/*/*/${{ env.stack }}/*; then\n" +
            '  echo "Static analysis found no problems."\n' +
            "  exit 0\n" +
            "else\n" +
            '  echo 1>&2 "Static analysis found violations that need to be fixed."\n' +
            "  exit 1\n" +
            "fi",
        },
      ],
    });
  }
}
