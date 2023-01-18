import { Body, Controller, Get, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/sendNotification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    console.log(content);

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return notification;
  }
}
