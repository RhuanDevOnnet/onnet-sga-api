"use strict";

const Anexo = use("App/Models/Anexo");
const Ticket = use("App/Models/Ticket");
const crypto = use("crypto");
const Helpers = use("Helpers");

class AnexoFileController {
  async storeFile({ request, response, auth, view, params }) {
    const _file = request.file("file");
    const title = request.input("title");
    const { ticketId } = request.params;

    if (_file == null) {
      return response
        .status(400)
        .json({
          message: "Não foi enviado nenhum arquivo. Por favor tente novamente",
        });
      }
    try {

      const ticket = await Ticket.findOrFail(ticketId);

      if(!ticket){
        return response.status(400).json({ message: "Não foi encontrado nenhum ticket "});
      }      
      
      const fileName = `${crypto.randomBytes(10).toString('hex')}-${_file.clientName}`;
      
      await _file.move(Helpers.publicPath("uploads/anexoFiles"), {
        name: fileName,
      });
      
      let fileUrl = "uploads/anexoFiles/" + fileName;
      let type = _file.type;
      let subType = _file.subtype;

      const newAnexo = await Anexo.create({
        title: title,
        url: fileUrl,
        type: type,
        sub_type: subType,
        usuario_criacao: auth.user.username,
      });

      await ticket.anexo().attach([newAnexo.id]);
      ticket.anexos = await ticket.anexo().fetch();

      return response.status(200).json(ticket);

    } catch (err) {
      return response.status(400).json({ message: `Ocorreu um erro : ${err}` });
    }
  }

  async downloadFile({ request, params, response}) {

    const {anexoId} = params;

    try{
      const anexo = await Anexo.findOrFail(anexoId);

      if(!anexo){
        return response.status(400).json({ message : "Não foi encontrado o anexo "});
      }


    response.download(Helpers.publicPath(anexo.url));

    }catch(err ) {
      console.log(err)
      response.status(400).json({ message : "Ocorreu um erro: " , err });
    }
  }

}

module.exports = AnexoFileController;
