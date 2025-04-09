import { typescript } from "projen";
import { Scripts } from "../src/properties/const";

export function ConfigureTasks(project: typescript.TypeScriptAppProject) {
  const scripts = {
    "cdktf-cli-install": Scripts.cdktf_cli_install,
    "cdktf-get": Scripts.cdktf_get,
    "cdktf-synth": Scripts.cdktf_synth,
    "cdktf-deploy": Scripts.cdktf_deploy,
    "cdktf-upgrade": Scripts.cdktf_upgrade,
    "cdktf-upgrade:next": Scripts.cdktf_upgrade_next,
    "cdk8s-add-helm-repos": Scripts.cdk8s_add_helm_repos,
    "cdk8s-cli-install": Scripts.cdk8s_cli_install,
    "cdk8s-synth": Scripts.cdk8s_synth,
    "cdk8s-get": Scripts.cdk8s_get,
    "cdk8s-diff": Scripts.cdk8s_diff,
    "cdk8s-import": Scripts.cdk8s_import,
    "cdk8s-upgrade": Scripts.cdk8s_upgrade,
    "cdk8s-upgrade:next": Scripts.cdk8s_upgrade_next,
  };

  const tasks: any = {};
  for (const [key, value] of Object.entries(scripts)) {
    tasks[key] = project.addTask(key, {
      exec: value,
      description: key,
    });
  }

  project.compileTask.reset();
  const compile_tasks = [
    tasks["cdk8s-add-helm-repos"],
    tasks["cdk8s-synth"],
    tasks["cdk8s-get"],
    tasks["cdktf-get"],
    tasks["cdktf-synth"],
  ];
  for (const task of compile_tasks) project.compileTask.spawn(task);
}
