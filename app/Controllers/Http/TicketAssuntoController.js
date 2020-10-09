'use strict'

const TicketAssunto = use('App/models/TicketAssunto');

class TicketAssuntoController {

  async index({ request, response, view }) {
    const assunto = await TicketAssunto.all();

    return response.json(assunto);
  }

  async store({ request, response }) {
    const data = request.body;
    const assunto = await TicketAssunto.create(data);

    return response.json(assunto);
  }

  async show({ params, request, response, view }) {
    const assunto = await TicketAssunto.findOrFail(params.id);

    return response.json(assunto);
  }

  async update({ params, request, response }) {
    const data = request.body;
    const assunto = await TicketAssunto.findOrFail(params.id);

    assunto.merge(data);
    await assunto.save();

    return response.json(assunto);
  }

  async destroy({ params, request, response }) {
    const assunto = await TicketAssunto.findOrFail(params.id);

    assunto.delete();

    return response.status(200).send();
  }
}

module.exports = TicketAssuntoController
