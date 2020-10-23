'use strict'

const Notification = use('App/Models/Notification')

class NotificationController {
    async index({ request, response, view }) {
        try {
            const notifications = await Notification.query()
                .with('ticket.operador')
                .with('from_user')
                .with('to_user')
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

    async indexByUser({ request, response, view, params }) {
        const { to_user_id } = params

        try {
            const notification = await Notification.query()
                .with('ticket.operador')
                .with('from_user')
                .with('to_user')
                .where("to_user_id", to_user_id)
                .where('visited', false)
                .orderBy("created_at", "desc")
                .fetch()

            if (!notification) {
                return response
                    .status(400)
                    .json({
                        message: 'Não foi encontrado nenhuma notificação.',
                    })
            }

            return response.status(200).json(notification)
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'Ocorreu um erro: ', err: err })
        }
    }

    async store({ request, response }) {
        const {
            ticket_id,
            to_user_id,
            from_user_id,
            text,
            visited
        } = request.body

        try {
            const newNotification = await Notification.create({
                ticket_id,
                to_user_id,
                from_user_id,
                text,
                visited,
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

    async setVisited({ request, response, params }) {
        const { notificationId } = params

        try {
            const notification = await Notification.findOrFail(notificationId)

            if (!notification) {
                return response.status(400).json({
                    message:
                        'Não foi encontrado nenhuma notificação com essse ID: ',
                })
            }

            notification.visited = true;

            await notification.save();

            return response
                .status(200)
                .json({ message: 'Notificação visitada' })
        } catch (err) {
            return response
                .status(400)
                .json({ message: 'ocorre um erro: ', err: err })
        }
    }

    async setAllVisited({ request, response, params }) {
        const { userId } = params;
        const { ticket_id } = request.get() || null;

        try {
            const notification = Notification.query()
                .where('to_user_id', userId)
                .where('visited', false)

            if (ticket_id)
                notification.where('ticket_id', ticket_id)

            const visiteds = await notification.update({ visited: true });

            return response.json(visiteds);
        }
        catch (err) {
            return response.status(400).json({ message: 'ocorre um erro: ', err: err })
        }
    }

    async destroy({ params, request, response }) {
        const notificationId = params.id

        try {
            const notification = await Notification.findOrFail(notificationId)

            if (!notification) {
                return response.status(400).json({
                    message: 'Não foi encontrado nenhuma notificação com esse Id '
                })
            }

            await notification.delete();

            return response.status(200).json({ message: 'Notificação excluida com sucesso ' })
        }
        catch (err) {
            return response.status(200).json({ message: 'Ocorreu um erro: ' + err })
        }
    }
}

module.exports = NotificationController
