import { typescript } from "projen";
import { GithubWorkflow } from "projen/lib/github";
import { JobPermission } from "projen/lib/github/workflows-model";

export function UpgradeCharts(project: typescript.TypeScriptAppProject) {
  const upgrade_charts = new GithubWorkflow(project.github!, "upgrade-charts");
  upgrade_charts.on({
    workflowDispatch: {},
    schedule: [
      {
        cron: "0 0 * * *",
      },
    ],
  });
  upgrade_charts.addJob("upgrade-charts", {
    runsOn: ["ubuntu-latest"],
    permissions: {
      contents: JobPermission.READ,
    },
    steps: [
      {
        name: "Checkout",
        uses: "actions/checkout@v3",
      },
      {
        name: "upgrade charts",
        run: "./scripts/upgrade_charts.sh",
      },
      {
        name: "Install dependencies",
        run: "yarn install --check-files --frozen-lockfile",
      },
      {
        name: "Build",
        run: "npx projen build",
      },
      {
        name: "Find mutations",
        id: "create_patch",
        run:
          "git add .\n" +
          'git diff --staged --patch --exit-code > .repo.patch || echo "patch_created=true" >> $GITHUB_OUTPUT',
      },
      {
        name: "Upload patch",
        if: "steps.create_patch.outputs.patch_created",
        uses: "actions/upload-artifact@v3",
        with: {
          name: ".repo.patch",
          path: ".repo.patch",
        },
      },
    ],
  });

  upgrade_charts.addJob("pr", {
    name: "Create Pull Request",
    needs: ["upgrade-charts"],
    runsOn: ["ubuntu-latest"],
    permissions: {
      contents: JobPermission.READ,
    },
    if: "${{ needs.upgrade.outputs.patch_created }}",
    steps: [
      {
        name: "Checkout",
        uses: "actions/checkout@v3",
        with: {
          ref: "master",
        },
      },
      {
        name: "Download patch",
        uses: "actions/download-artifact@v3",
        with: {
          name: ".repo.patch",
          path: "${{ runner.temp }}",
        },
      },
      {
        name: "Apply patch",
        run: '[ -s ${{ runner.temp }}/.repo.patch ] && git apply ${{ runner.temp }}/.repo.patch || echo "Empty patch. Skipping."',
      },
      {
        name: "Set git identity",
        run:
          'git config user.name "github-actions"\n' +
          'git config user.email "github-actions@github.com"\n',
      },
      {
        name: "Create Pull Request",
        id: "create_pr",
        uses: "peter-evans/create-pull-request@v4",
        with: {
          token: "${{ secrets.PROJEN_GITHUB_TOKEN }}",
          commitMessage:
            "chore: upgrade charts\n" +
            "Upgrades project dependencies. See details in [workflow run].\n" +
            "\n" +
            "[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\n" +
            "\n" +
            "------\n" +
            "\n" +
            '*Automatically created by projen via the "upgrade-charts" workflow*',
          branch: "github-actions/upgrade-charts",
          title: "chore(deps): upgrade charts",
          body:
            "Upgrades project dependencies. See details in [workflow run].\n" +
            "\n" +
            "[Workflow Run]: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\n" +
            "\n" +
            "------\n" +
            "\n" +
            '*Automatically created by projen via the "upgrade-charts" workflow*',
          author: "github-actions <github-actions@github.com>",
          committer: "github-actions <github-actions@github.com>",
          signoff: true,
        },
      },
    ],
  });
}
