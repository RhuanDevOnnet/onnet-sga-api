'use strict'

const Notification = use('App/Models/Notification')

class NotificationSearchController {
    async searchNotificationByUser({ request, response, view, params }) {
        const { user_id } = params

        try {
            const notification = await Notification.query()
                .with('user')
                .with('operador')
                .with('ticket')
                .where('user_id', user_id)
                .orderBy('id', 'desc')
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
