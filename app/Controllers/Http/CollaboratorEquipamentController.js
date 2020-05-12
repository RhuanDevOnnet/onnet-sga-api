"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ColabEquip = use("App/Models/CollaboratorEquipament");
const Equip = use("App/Models/Equipament");
class CollaboratorEquipamentController {
  async index({ request, response, view }) {
    const colab_equipaments = await ColabEquip.query()
      .with("colaborador.email")
      .with("equipamento.modelo")
      .fetch();
    return colab_equipaments;
  }

  async indexAllComodatoColaborador({ request, response, params, view }) {
    const equipaments = await ColabEquip.query()
      .with("colaborador")
      .with("equipamento.modelo")
      .where("colaborador_id", "=", params.id)
      .whereNull("data_devolucao")
      .fetch();
    return equipaments;
  }

  async indexEquipamentosAlocados({ request, response }) {
    const equipaments = await ColabEquip.query()
      .with("colaborador.email")
      .with("equipamento.modelo")
      .whereNull("data_devolucao")
      .fetch();
    response.status(200).json(equipaments);
  }

  async store({ request, auth, response }) {
    const data = request.body;
    const newColabEquip = await ColabEquip.create({
      usuario_criacao: auth.user.username,
      data_comodato: data.data_comodato,
      observacao: data.observacao,
      termo_assinado: data.termo_assinado,
      colaborador_id: data.colaborador_id,
      equipament_id: data.equipament_id.id,
    });

    const equipamento = await Equip.findOrFail(data.equipament_id.id);
    equipamento.alocado = true;
    await equipamento.save();
    return newColabEquip;
  }

  async show({ params, request, response, view }) {
    const colabEquip = await ColabEquip.findOrFail(params.id);
    return colabEquip;
  }

  async update({ params, request, response }) {
    const data = request.body;
    const colabEquip = ColabEquip.findOrFail(params.id);

    colabEquip.merge(data);
    await colabEquip.save();
    return colabEquip;
  }

  async devolucaoEquipamento({ params, request, response }) {
    const data = request.only([
      "colaborador_id",
      "created_at",
      "data_comodato",
      "data_devolucao",
      "equipament_id",
      "id",
      "observacao",
      "termo_assinado",
      "updated_at",
      "usuario_criacao",
    ]);
    const colabEquipamento = await ColabEquip.findOrFail(params.id);

    const equipamentoDev = await Equip.findOrFail(data.equipament_id);
    equipamentoDev.alocado = false;
    await equipamentoDev.save();

    colabEquipamento.merge(data);
    await colabEquipamento.save();
    return colabEquipamento;
  }

  async destroy({ params, request, response }) {
    const colabEquip = await ColabEquip.findOrFail(parmas.id);
    colabEquip.delete();
  }
}

module.exports = CollaboratorEquipamentController;
