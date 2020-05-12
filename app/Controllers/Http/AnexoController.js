"use strict";

const Anexo = use("App/Models/Anexo");

class AnexoController{
  async index({ request, response, view }) {
    try {
      const anexos = await Anexo.all();

      if (!anexos) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum anexo " });
      }

      return response.status(200).json(anexos);
    } catch (err) {
      return response
        .status(400)
        .json({ message: `Ocorreu o seguinte erro: ${err}` });
    }
  }

  async show({ params, request, response, view }) {
    const { anexoId } = params;

    try {
      const anexo = await Anexo.findOrFail(anexoId);

      if (!anexo) {
        return response
          .status(400)
          .json({ message: "Não foi encontrado nenhum ticket com este id " });
      }

      return response.status(200).json(anexo);
    } catch (err) {
      return response
        .status(400)
        .json({ message: `Ocorreu o seguinte erro: ${err}` });
    }
  }

  async store({ request, response, auth }) {
    const { title, url } = request.body;

    try {
      const newAnexo = await Anexo.create({
        title: title,
        url: url,
        usuario_criacao: auth.user.username,
      });
    } catch (err) {
      return response.json({ message: `Ocorreu o seguinte erro: ${err}` });
    }
  }

  async update({ params, request, response }) {
    const { anexoId } = params;
    const newAnexo = request.body;

    try {
      const anexo = await Anexo.findOrFail(anexoId);

      if (!anexo) {
        return response.json({
          message: "Não foi encontrado nenhum ticket com este id ",
        });
      }

      anexo.merge(newAnexo);
      await anexo.save();
      return response.json(anexo);
    } catch (err) {
      return response.json({ message: "Ocorreu o seguinte erro: ${err}" });
    }
  }

  async destroy({ params, request, response }) {
    const { id } = params;

    try{
      const anexo = await Anexo.findOrFail(id);
      await anexo.delete();
      return response.status(200).json({ message : "O anexo foi excluido."});
    }catch(err){
      return response.json({ message:  `Ocorreu o seguinte erro : ${err}`});
    }

  }
}

module.exports = AnexoController;
