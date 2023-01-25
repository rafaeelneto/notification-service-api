import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
        id: notification.id,
      },
    });
  }
}
