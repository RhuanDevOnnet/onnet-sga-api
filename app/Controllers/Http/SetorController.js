'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Setor = use('App/Models/Setor')
class SetorController {
  async index({ request, response, view }) {
    const setores = await Setor.query().with('cargo').fetch()
    return setores
  }

  async store({ request, auth, response }) {
    const { cargos, nome, supervisor } = request.body

    try {
      const setor = await Setor.create({
        usuario_criacao: auth.user.username,
        nome,
        supervisor,
      })

      if (cargos && cargos.length > 0) {
        await setor.cargo().attach(cargos)
        await setor.load('cargo')
      }

      return setor
    } catch (err) {
      console.log(err)
      return response
        .status(400)
        .json({ message: 'Ocorreu um erro ao tentar salvar o setor' })
    }
  }

  async show({ params, request, response, view }) {
    try {
      const setor = await Setor.query()
        .where('id', params.id)
        .with('cargo')
        .fetch()
      if (!setor) {
        return response
          .status(400)
          .json({ message: 'Não foi encontrado setor com esse id ' })
      }
      return response.status(200).json(setor)
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'Ocorreu um erro ao procurar pelo setor: ', err })
    }
  }

  async update({ params, request, response }) {
    const { cargos, ...data } = request.body

    const setor = await Setor.findOrFail(params.id)

    setor.merge(data)
    setor.save()

    if (cargos && cargos.length > 0) {
      await setor.cargo().sync(cargos)
      await setor.load('cargo')
    }
    return setor
  }

  async updateCargos({ params, request, response }) {
    const { cargos } = request.body
    const setor = await Setor.findOrFail(params.id)

    try {
      if (cargos && cargos.length > 0) {
        await setor.cargo().sync(cargos)
        await setor.load('cargo')
      }
      return response.status(200).json(setor)
    } catch (err) {
      return response.status(400).json({
        message: 'Ocorreu um erro ao mudar cargos deste setor : ',
        err,
      })
    }
  }

  async destroy({ params, request, response }) {
    const setor = await Setor.findOrFail(params.id)
    await setor.delete()
  }
}

module.exports = SetorController
