import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";

export function UpdatePackages(project: typescript.TypeScriptAppProject) {
  const update_packages = new GithubWorkflow(
    project.github!,
    "update-packages",
  );
  update_packages.on({
    schedule: [
      {
        cron: "0 0 * * *",
      },
    ],
  });
  update_packages.addJob("build", {
    runsOn: ["ubuntu-latest"],
    permissions: {
      pullRequests: JobPermission.WRITE,
      actions: JobPermission.WRITE,
      contents: JobPermission.WRITE,
    },
    steps: [
      {
        name: "Checkout",
        uses: "actions/checkout@v3",
      },
      {
        name: "Get latest chart versions",
        run: "./scripts/update_packages.sh",
      },
    ],
  });
}
