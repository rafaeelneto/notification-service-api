import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/sendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { ViewNotificationMapper } from '../mappers/viewNotificationMappers';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return ViewNotificationMapper.toHTTP(notification);
  }
}
