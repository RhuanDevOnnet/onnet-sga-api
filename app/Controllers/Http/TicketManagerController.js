const Ticket = use('App/Models/Ticket')

class TicketManagerController {
  // Realiza a troca de setor do ticket
  async TicketSectorChange({ request, params, response, auth, view }) {
    const { id } = params
    const { sectorId } = request.body

    try {
      const ticket = await Ticket.findOrFail(id);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: 'Não foi encontrado nenhum ticket com esse ID' })
      }

      const ticketUser = await Ticket.query()
        .select('operadors.user_id')
        .innerJoin('operadors', 'tickets.operador_responsavel', 'operadors.id')
        .where('tickets.id', id).first()

      if (ticketUser.user_id != auth.user.id) {
        return response.status(400)
          .json({ message: 'Somente o usuário responsavel pode transferir o ticket' });
      }

      ticket.setor_id = sectorId
      await ticket.save()
      return response.status(200).json(ticket)
    } catch (err) {
      return response.status(400).json({ message: 'Ocorreu um erro: ' + err })
    }
  }

  async leaveTicket({ request, auth, response, params }) {
    const { id } = params;

    try {
      const ticket = await Ticket.findOrFail(id);

      if (!ticket) {
        return response
          .status(400)
          .json({ message: 'Não foi encontrado nenhum ticket com esse ID' })
      }

      const ticketUser = await Ticket.query()
        .select('operadors.user_id')
        .innerJoin('operadors', 'tickets.operador_responsavel', 'operadors.id')
        .where('tickets.id', id).first()

      if (ticketUser.user_id != auth.user.id) {
        return response.status(400).json({ message: 'Somente o usuário responsavel pode soltar o ticket' });
      }

      ticket.operador_responsavel = null
      await ticket.save()
      return response.status(200).json(ticket)
    } catch (err) {
      return response.status(400).json({ message: 'Ocorreu um erro : ' + err })
    }
  }
}

module.exports = TicketManagerController
