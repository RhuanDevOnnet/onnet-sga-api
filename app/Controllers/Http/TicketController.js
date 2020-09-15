"use strict";

const Ticket = use("App/Models/Ticket");
const Operador = use("App/Models/Operador");

class TicketController {
  async index({ request, response, view }) {
    const ticket = await Ticket.query()
      .with("user")
      .with("setor")
      .with("operador")
      .with("ticketStatus")
      .with("anexo")
      .fetch();
    return ticket;
  }

  async indexTicketByUser({ request, auth, response, view, params }) {
    const ticket = await Ticket.query()
      .with("user")
      .with("setor")
      .with("operador")
      .with("ticketStatus")
      .where("user_id", "=", auth.user.id)
      .orderBy("created_at", "desc")
      .fetch();
    return ticket;
  }

  async countNewTickets({ request, auth, response, params, view }) {
    const { setores } = request.body;

    const tickets = await Ticket.query()
      .where('user_id', '!=', auth.user.id)
      .where('resolvido', false)
      .where('operador_responsavel', null)
      .whereIn('setor_id', setores)
      .fetch()

    return response.json(tickets)
  }

  async indexClosedTickets({ request, response, params }) {
    const { order = "desc", page = 1, qtd = 5 } = request.all();

    const ticket = await Ticket.query()
      .with("user")
      .with("setor")
      .with("operador")
      .with("ticketStatus")
      .where("resolvido", true)
      .orderBy("created_at", order)
      .paginate(page, qtd);

    if (!ticket) {
      return response
        .status(400)
        .json({ message: "Não foi encontrado nenhum ticket encerrado " });
    }

    return response.status(200).json(ticket);
  }

  async indexTicketBySector({ request, response, params }) {
    const sectorId = params.id;

    try {
      const tickets = await Ticket.query()
        .with("user")
        .with("setor")
        .with("cidade")
        .with("operador.user")
        .with("ticketStatus")
        .where("setor_id", "=", sectorId)
        .where("resolvido", false)
        .orderBy("created_at", "desc")
        .fetch();

      if (!tickets) {
        return response.status(400).json({
          message: "Não foi encontrado nenhum ticket para esse setor ",
        });
      }

      return response.status(200).json(tickets);
    } catch (err) {
      return response.status(400).json({
        message: "Ocorreu um erro ao tentar buscar os tickets. " + err,
      });
    }
  }

  async advancedIndex({ request, response, params }) {
    const {
      id,
      assunto,
      cliente_onnet,
      cliente_portabilidade,
      cpfCnpj,
      operadora_doadora,
      num_telefone,
      created_at,
      setor_id,
      cidade_id,
      operador_id,
      user_id,
      isPortability
    } = request.body;

    const tickets = Ticket.query()
      .with('setor')
      .with('cidade')
      .with('user')
      .with('operador')
      .where('resolvido', true);

    if (id)
      return response.json(await tickets.where('id', id).fetch());

    if (isPortability) {
      tickets.where('isPortability', true)

      if (cliente_onnet)
        tickets.where('cliente_onnet', 'LIKE', `%${cliente_onnet}%`)

      if (cliente_portabilidade)
        tickets.where('cliente_portabilidade', 'LIKE', `%${cliente_portabilidade}%`)

      if (cpfCnpj)
        tickets.where('cpfCnpj', 'LIKE', `%${cpfCnpj}%`)

      if (operadora_doadora)
        tickets.where('operadora_doadora', 'LIKE', `%${operadora_doadora}%`)

      if (num_telefone)
        tickets.where('num_telefone', 'LIKE', `%${num_telefone}%`)
    }

    if (assunto)
      tickets.where('assunto', 'LIKE', `%${assunto}%`)

    if (created_at)
      tickets.where('created_at', 'LIKE', `${created_at}%`)

    if (setor_id)
      tickets.where('setor_id', setor_id)

    if (cidade_id)
      tickets.where('cidade_id', cidade_id)

    if (user_id)
      tickets.where('user_id', user_id)

    if (operador_id) {
      const operador = await Operador.query().where('user_id', operador_id).fetch();

      const operadorIds = operador.rows.map(operador => operador.id);

      tickets.whereIn('operador_responsavel', operadorIds)
    }

    return response.json(await tickets.orderBy('created_at', 'desc').fetch());
  }

  async store({ request, auth, response }) {
    const data = request.body;

    data.resolvido = false;
    data.user_id = auth.user.id;

    const ticket = await Ticket.create({
      "usuario_criacao ": auth.user.username,
      ...data,
    });

    return response.status(201).json(ticket);
  }

  async show({ params, request, response, view }) {
    const ticket = await Ticket.query().where('id', params.id).with('anexo').fetch();
    return ticket;
  }

  async getTicketInfo({ params, request, response }) {
    try {
      const ticket = await Ticket.query()
        .with("ticketStatus")
        .with("operador")
        .with("setor")
        .with("user")
        .with("cidade")
        .with("anexo")
        .where("id", params.id)
        .first();

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não há nenhum registro desse ticket " });
      }

      return response.status(200).send(ticket);
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ message: "Ocorreu um erro ao tentar buscar os dados. " });
    }
  }

  async showByUser({ params, request, resposne, view }) {
    const user_id = request.only(["user_id"]);
    const tickets = await Ticket.query().where("user_id", "=", user_id).fetch();
    return tickets;
  }

  async update({ params, request, auth, response }) {
    const data = request.body;

    try {
      const ticket = await Ticket.findOrFail(params.id);

      ticket.merge(data);
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      return response
        .status(400)
        .json({ message: "Não foi possivel atualizar os dados " });
    }
  }

  async destroy({ params, request, response }) {
    const ticket = await Ticket.findOrFail(params.id);
    ticket.delete();
  }
}

module.exports = TicketController;
