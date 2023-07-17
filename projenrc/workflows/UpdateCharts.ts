import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";

export function UpdateCharts(project: typescript.TypeScriptAppProject) {
  const update_charts = new GithubWorkflow(project.github!, "update-charts");
  update_charts.on({
    schedule: [
      {
        cron: "0 0 * * *",
      },
    ],
  });
  update_charts.addJob("build", {
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
        name: "Add and update repos",
        run: "./scripts/add_helm_repos.sh",
      },
      {
        name: "Get latest chart versions",
        run: "./scripts/update_helm_charts.sh",
      },
    ],
  });
}
