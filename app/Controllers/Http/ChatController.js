const Ticket = use("App/models/Ticket");
const TicketAtendente = use("App/models/TicketAtendente");

class ChatController {

  async initOperatorChat({ request, response, view, params }) {
    const operador = request.body;

    try {
      const ticket = await Ticket.findOrFail(params.id);
      ticket.operador_responsavel = operador.operador_responsavel;
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ message: "Não foi possivel iniciar o chat" });
    }
  }

  async changeTicketStatus({ request, response, params }) {
    const { ticketId, statusId } = request.body;

    try {
      let ticket = await Ticket.findOrFail(ticketId);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket " });
      }

      ticket.ticket_status_id = statusId;
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ message: "Não foi possivel atualizar o status do ticket" });
    }

    return response.status(200).json(data);
  }

  async changeTicketSector({ request, response, params }) {
    const { ticketId, setorId } = request.body;

    try {
      let ticket = await Ticket.findOrFail(ticketId);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket " });
      }

      ticket.setor_id = setorId;
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ message: "Não foi possivel atualizar o setor do ticket " });
    }
  }

  async CloseChatTicket({ request, response, params }) {
    const ticketId = params.ticketId;

    try {
      let ticket = await Ticket.findOrFail(ticketId);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket " });
      }

      ticket.resolvido = true;
      ticket.ticket_status_id = 4;
      await ticket.save();
      return response
        .status(200)
        .json({ message: "Ticket finalizado com sucesso " });
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ message: "Ocorreu um erro ao tentar encerrar o ticket " });
    }
  }

  async LoadChatMessage({ request, response, params }) {
    const { page, qtd } = request.all();
    const ticketId  = params.ticketId;

    const messages = await TicketAtendente.query()
      .with("user")
      .with("ticket")
      .where("ticket_id", ticketId)
      .orderBy('created_at', 'asc')
      .paginate(page, 20);

    if(!messages){
      return response.status(400).json({ message : "Não foi encontrado nenhuma messagem !"});
    }

    return response.status(200).json(messages);
  }
}

module.exports = ChatController;
