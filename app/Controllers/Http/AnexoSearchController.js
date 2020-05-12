
const Ticket = use('App/Models/Ticket');

class AnexoSearchController { 

    async  anexosByTickets ({ request, response, params, view }){

        const { ticketId } = params;

        try{
            const ticket = await Ticket.query().where('id', ticketId).with('anexo').fetch();

            if(!ticket){
                return response.status(400).json({ message : 'Não foi encontrado nenhum anexo'});
            }

            return response.status(200).json(ticket);
        }catch(err) {
            return response.status(400).json({ message : "Ocorreu um erro:" , err});
        }
        
    }

}

module.exports  = AnexoSearchController;