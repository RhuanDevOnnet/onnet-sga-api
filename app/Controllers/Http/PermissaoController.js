'use strict'

const Permissao = use('App/Models/Permissao');

class PermissaoController {

  async index({ request, response, view }) {
    const permissao = await Permissao.all();
    return permissao;
  }

  async store({ request, auth, response }) {
    const data = request.body;
    const permissao = await Permissao.create({ 'usuario_criacao': auth.user.username, ...data });
    return permissao;
  }

  async show({ params, request, response, view }) {
    const permissao = await Permissao.findOrFail(params.id);
    return permissao;
  }

  async update({ params, request, response }) {
    const data = request.body;
    const permissao = await Permissao.findOrFail(params.id);

    permissao.merge(data);
    await permissao.save();
    return permissao;
  }

  async destroy({ params, request, response }) {
    const permissao = await Permissao.findOrFail(params.id);
    permissao.delete();
  }
}

module.exports = PermissaoController
