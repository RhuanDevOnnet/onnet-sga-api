'use strict'

const Notification = use('App/Models/Notification')

class NotificationSearchController {
    async searchNotificationByUser({ request, response, view, params }) {
        const { user_id } = params

        try {
            const notification = await Notification.query()
                .select(
                    "notifications.id",
                    "notifications.ticket_id",
                    "notifications.user_id",
                    "notifications.operador_id",
                    "notifications.text",
                    "notifications.visited",
                    "notifications.data",
                    "users.username as sender",
                    "operadors.user_id as operador"
                )
                .innerJoin("operadors", "notifications.operador_id", "operadors.id")
                .innerJoin("users", "operadors.user_id", "users.id")
                .where("notifications.user_id", user_id)
                .orderBy("notifications.id", "desc")
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
}

module.exports = NotificationSearchController
