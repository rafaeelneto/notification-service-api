import { Body, Controller, Get, Post } from '@nestjs/common';
import { Content } from 'src/application/entities/content';
import { Notification } from 'src/application/entities/Notification';
import { SendNotification } from 'src/application/use-cases/sendNotification';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CreateNotificationBody } from '../dtos/create-notification-body';

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

    return notification;
  }
}
