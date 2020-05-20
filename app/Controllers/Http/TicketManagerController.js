const Ticket = use("App/Models/Ticket");

class TicketManagerController {
  async TicketSectorChange({ request, params, response, view }) {
    const { id } = params;
    const { sectorId } = request.body;

    console.log(sectorId);

    try {
      const ticket = await Ticket.findOrFail(id);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket com esse ID " });
      }

      ticket.setor_id = sectorId;
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      return response.status(400).json({ message: "Ocorreu um erro: " + err });
    }
  }

  async leaveTicket({ request, response, params }) {
    const { id } = params;

    try {
      const ticket = await Ticket.findOrFail(id);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket com esse ID" });
      }

      ticket.operador_responsavel = null;
      await ticket.save();
      return response.status(200).json(ticket);
    } catch (err) {
      return response.status(400).json({ message: "Ocorreu um erro : " + err });
    }
  }
}

module.exports = TicketManagerController;
