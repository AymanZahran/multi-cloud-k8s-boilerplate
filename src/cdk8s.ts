import { App } from 'cdk8s';
import { Nginx } from './cdk8s/nginx';
import { Tekton } from './cdk8s/tekton';


const app = new App();
new Nginx(app, 'nginx');
new Tekton(app, 'tekton');
app.synth();