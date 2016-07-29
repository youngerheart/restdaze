import Project from '../models/project';
import {setToken, removeToken} from '../services/model';

export default {
  async add(ctx) {
    var {projectName} = ctx.params;
    var name = Math.random().toString(36).substr(2, 10);
    await setToken(name, projectName);
    await Project.editField({name: projectName}, 'tokens', name, true);
    ctx.body = {name};
  },
  async del(ctx) {
    var {name, projectName} = ctx.params;
    await removeToken(name, projectName);
    await Project.editField({name: projectName}, 'tokens', name);
  },
  async list(ctx) {
    var {projectName} = ctx.params;
    var project = await Project.findOne({name: projectName});
    ctx.body = project.tokens.map((token) => ({name: token}));
  }
};
