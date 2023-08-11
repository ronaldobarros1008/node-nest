import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) { }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    //console.log(body)
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    }
  }
}
