'use strict'

const Notification = use('App/Models/Notification')

class NotificationController {
    async index({ request, response, view }) {
        try {
            const notifications = await Notification.query()
                .with('ticket')
                .with('user')
                .with('operador')
                .fetch()

            if (!notifications) {
                return response
                    .status(400)
                    .json({
                        message: 'Não foi encontrado nenhuma notificação ',
                    })
            }

            return response.status(200).json(notifications)
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'Ocorreu um erro: ', err })
        }
    }

    async store({ request, response }) {
        const {
            operador_id,
            user_id,
            ticket_id,
            protocolo,
            text,
            visited,
        } = request.body
        const data = new Date()
        console.log(operador_id, user_id, ticket_id, protocolo, text, visited)

        console.log(data)
        try {
            const newNotification = await Notification.create({
                operador_id: operador_id,
                user_id: user_id,
                ticket_id: ticket_id,
                protocolo: protocolo,
                text: text,
                data: data,
                visited: visited,
            })

            return response.status(200).json(newNotification)
        } catch (err) {
            console.log(err)
            return response
                .status(400)
                .json({ message: 'Ocorreu um erro: ', err: err })
        }
    }

    async show({ params, request, response, view }) {
        const notificationId = params.id

        try {
            const notification = await Notification.findOrFail(notificationId)

            if (!notification) {
                return response.status(400).json({
                    message:
                        'Não foi encontrado nenhuma notificação com esse ID',
                })
            }

            return response.status(200).json(notification)
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'Ocorreu um erro: ', err })
        }
    }

    async disableNotification({ request, response, params }) {
        const { notificationId } = params

        try {
            const notification = await Notification.findOrFail(notificationId)

            if (!notification) {
                return response.status(400).json({
                    message:
                        'Não foi encontrado nenhuma notificação com essse ID: ',
                })
            }

            notification.visited = true
            await notification.save()
            return response
                .status(200)
                .json({ message: 'Notificação visitada' })
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'ocorre um erro: ', err: err })
        }
    }

    async destroy({ params, request, response }) {
        const notificationId = params.id

        try {
            const notification = await Notification.findOrFail(notificationId)

            if (!notification) {
                return response.status(400).json({
                    message:
                        'Não foi encontrado nenhuma notificação com esse Id ',
                })
            }

            await notification.delete()
            return response
                .status(200)
                .json({ message: 'Notificação excluida com sucesso ' })
        } catch (err) {
            return response
                .status(200)
                .json({ message: 'Ocorreu um erro: ' + err })
        }
    }

    async destroyAll({ request, response, params }) {
        const { userId } = params

        try {
            const deletedNotifications = await Notification.query()
                .where('user_id', userId)
                .delete()

            return response
                .status(200)
                .json({ message: 'Todas notificações foram limpadas ' })
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'Ocorreu um erro: ', err: err })
        }
    }
}

module.exports = NotificationController
