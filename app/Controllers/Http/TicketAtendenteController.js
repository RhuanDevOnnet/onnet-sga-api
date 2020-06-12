'use strict'

const TicketChat = use('App/models/TicketAtendente');
const Ticket = use('App/Models/Ticket');
const Helpers = use('Helpers');


class TicketAtendenteController {

  async index({ request, response, view }) {
    const chat = await TicketChat.all();
    return chat;
  }

  async indexByTicketId({ request, response, view, params }) {
    const chats = await TicketChat.query().with('user').with('ticket').where('ticket_id', params.id).fetch();
    return chats; 
  }

  async indexByMonth({ request, response, view, params }) {

    let mili = Date.now();
    let today = Date.parse(mili);
    const ballons = await TicketChat.query().where('created_at', '<=', today).fetch();
  }

  async downloadExcel({ request, response, view, params }) {
    response.attachment(
      Helpers.publicPath('uploads/chatImages/') + params.filename
    )
  }

  async create({ request, response, view }) {
  }

  async store({ request, auth, response }) {

    const _mensagem = request.input('mensagem');
    const ticketid = request.input('ticketid');
    const _fileName = request.input('filename');
    const _operatorId = request.input('operator');

    let imageUrl = "";

    if(_operatorId == null || _operatorId == ''){
      await Ticket.query().where('id', ticketid).update({ ticket_status_id : 2 });
    } else {  
      await Ticket.query().where('id', ticketid).update({ ticket_status_id : 3 });
    }

    const image = request.file('picture')

    if (image != null) {
      const fileName = `${new Date().getTime()}${_fileName}`;

      await image.move(Helpers.publicPath('uploads/chatImages'), {
        name: fileName
      })

      imageUrl = 'uploads/chatImages/' + fileName;
    }

    const chatData = await TicketChat.create({ operador_id: _operatorId, ticket_id: ticketid, mensagem: _mensagem, imagem: imageUrl, user_id: auth.user.id });
    return chatData;

  }

  async show({ params, request, response, view }) {
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = TicketAtendenteController
