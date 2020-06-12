'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PhoneColaborattor = use('App/Models/PhoneColaborador')
const Chip = use('App/Models/Chip')
const MobileEmail = use('App/Models/MobileEmail')
const Celular = use('App/Models/Phone')
class PhoneColaboradorController {
  /**
   * Show a list of all phonecolaboradors.
   * GET phonecolaboradors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const phoneColab = await PhoneColaborattor.query()
      .with('phone.modelo')
      .with('collaborator')
      .with('chip')
      .with('mobileEmail')
      .fetch()
    return phoneColab
  }

  async indexWithFilter({ request, response, view }) {
    const { colaborador, celular, data_inicio, data_fim } = request.get()

    try {
      const query = PhoneColaborattor.query()

      if (colaborador && !colaborador == '') {
        console.log('colaborador')
        query.where('collaborators_id', colaborador)
      }
      if (celular && !celular == '') {
        console.log('celular acessando')
        query.where('phones_id', celular)
      }
      if (data_inicio && data_fim && !data_fim == null && data_inicio == null) {
        console.log(data_inicio, data_fim)
        query.whereBetween('data_comodato', [data_inicio, data_fim])
      }

      query
        .whereNotNull('data_devolucao')
        .with('phone.modelo')
        .with('collaborator')
        .with('chip')
        .with('mobileEmail')

      const phones = await query.fetch()

      return response.json(phones)
    } catch (err) {
      console.log(err)
      return response.json({ message: 'erro' })
    }
  }

  async indexByColaboratorPhones({ request, params, response, view }) {
    const celulares = await PhoneColaborattor.query()
      .with('phone.modelo.marca')
      .with('collaborator')
      .with('chip')
      .with('mobileEmail')
      .where('collaborators_id', '=', params.colab)
      .where('data_devolucao', null)
      .fetch()
    return celulares
  }

  async indexAllPhoneInUse({ request, params, response, view }) {
    const celularesEmUso = await PhoneColaborattor.query()
      .with('phone.modelo')
      .with('collaborator')
      .with('chip')
      .with('mobileEmail')
      .whereNull('data_devolucao')
      .fetch()
    return celularesEmUso
  }

  async indexAllPhoneReturned({ request, params, response, view }) {
    const returnedPhones = await PhoneColaborattor.query()
      .with('phone.modelo')
      .with('collaborator')
      .with('chip')
      .with('mobileEmail')
      .whereNotNull('data_devolucao')
      .fetch()
    return returnedPhones
  }

  /**
   * Create/save a new phonecolaborador.
   * POST phonecolaboradors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    const data = request.body

    try {
      const phoneColab = await PhoneColaborattor.create({
        usuario_criacao: auth.user.username,
        ...data,
      })

      // atualizar parametros do celular
      if (data.phones_id) {
        const celular = await Celular.findOrFail(data.phones_id)
        celular.alocado = true
        await celular.save()
      }

      if (data.chip_id) {
        const chip = await Chip.findOrFail(data.chip_id)
        chip.em_uso = true
        await chip.save()
      }

      if (data.mobile_email_id) {
        const mobilEmail = await MobileEmail.findOrFail(data.mobile_email_id)
        mobilEmail.disponivel = false
        await mobilEmail.save()
      }

      return response.status(200).json(phoneColab)
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .json({ message: 'Ocorreu um erro ao tentar comodatar um celular' })
    }
  }

  /**
   * Display a single phonecolaborador.
   * GET phonecolaboradors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const phoneColab = await PhoneColaborattor.findOrFail(params.id)
    return phoneColab
  }

  /**
   * Update phonecolaborador details.
   * PUT or PATCH phonecolaboradors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.body
    const phoneColab = await PhoneColaborattor.findOrFail(params.id)

    phoneColab.merge(data)
    await phoneColab.save()
    return phoneColab
  }

  async devolucao({ params, request, response }) {
    const data = request.body
    const phoneComodato = await PhoneColaborattor.findOrFail(params.colab)
    phoneComodato.data_devolucao = data.data_devolucao
    await phoneComodato.save()

    // atualizar parametros do celular
    const celular = await Celular.findOrFail(data.phones_id)
    celular.alocado = false
    await celular.save()

    // Atualizar parametros de uso do chip
    const chip = await Chip.findOrFail(data.chip_id)
    chip.em_uso = false
    await chip.save()

    // Atualizar parametros do mobile email
    const mobilEmail = await MobileEmail.findOrFail(data.mobile_email_id)
    mobilEmail.disponivel = true
    await mobilEmail.save()

    return phoneComodato
  }

  /**
   * Delete a phonecolaborador with id.
   * DELETE phonecolaboradors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const phoneColab = await PhoneColaborattor.findOrFail(params.id)
    phoneColab.delete()
  }
}

module.exports = PhoneColaboradorController
