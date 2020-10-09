'use strict'

const Operador = use('App/Models/Operador');
const User = use('App/Models/User');
class OperadorController {

  async index({ request, response, view }) {
    const operador = await Operador.query().with('setor').with('user').fetch();
    return operador;
  }

  async indexBySetor({ request, response, params, view }) {
    const operadores = await Operador.query().with('setor').with('user').where('setor_id', '=', params.id).fetch();

    return operadores;
  }

  async indexByUser({ request, auth, response, params, view }) {
    const operadors = await Operador.query().with('setor').with('user').where('user_id', '=', auth.user.id).fetch();

    return operadors;
  }

  async indexByUserAuth({ request, auth, response }) {
    const operadores = await Operador.query()
      .with('setor')
      .with('user')
      .where('user_id', auth.user.id)
      .fetch();

    return response.json(operadores);
  }

  async store({ request, response }) {
    const data = request.body;

    const user = await Operador.query().where('user_id', '=', data.user_id).where('setor_id', '=', data.setor_id).pluck('user_id')
    if (user == 1) {
      return response.status(412).send("It is not possible to give the same sector");
    }

    const operador = await Operador.create({ ...data });
    return operador;
  }

  async show({ params, request, response, view }) {
    const operador = await Operador.findOrFail(params.id);
    return operador;
  }

  async update({ params, request, response }) {
    const data = request.body;
    const operador = await Operador.findOrFail(params.id);

    operador.merge(data);
    await operador.save();
    return operador;
  }

  async destroy({ params, request, response }) {
    const operador = await Operador.findOrFail(params.id);
    await operador.delete();
  }
}

module.exports = OperadorController
