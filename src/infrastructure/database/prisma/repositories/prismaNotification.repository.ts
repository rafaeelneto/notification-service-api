import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    console.log('repo called');
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
