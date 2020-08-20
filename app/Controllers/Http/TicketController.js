"use strict";

const Ticket = use("App/Models/Ticket");

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
      .orderBy("id", "desc")
      .fetch();
    return ticket;
  }

  async indexClosedTickets({ request, response, params }) {
    const { order = "asc", page = 1, qtd = 5 } = request.all();

    const ticket = await Ticket.query()
      .with("user")
      .with("setor")
      .with("operador")
      .with("ticketStatus")
      .where("resolvido", true)
      .orderBy("id", order)
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
        .orderBy("id", "desc")
        .fetch();

      if (!tickets) {
        return response.status(400).  json({
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
    const ticket = await Ticket.query().where('id' , params.id).with('anexo').fetch();
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
        .fetch();
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
