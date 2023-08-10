import { Notification } from "@application/entities/notification"
import { NotificationsRepository } from "@application/repositories/notifications-reposiory"

export class InMemoryNotificationRepository implements NotificationsRepository {
    public notifications: Notification[] = []

    async create(notification: Notification){
        //console.log(notification)
        this.notifications.push(notification)
    }
}