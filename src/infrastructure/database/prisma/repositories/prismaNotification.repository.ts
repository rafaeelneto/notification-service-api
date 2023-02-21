import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification),
    });
  }

  async save(notification: Notification): Promise<string> {
    const updatedNotification = await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        ...PrismaNotificationMapper.toPrisma(notification),
      },
    });

    return updatedNotification.id;
  }
  async findByNotificationId(
    notificationId: string,
  ): Promise<Notification | null> {
    const raw = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!raw) return null;

    return PrismaNotificationMapper.fromPrisma(raw);
  }
  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const raw = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return raw.map(PrismaNotificationMapper.fromPrisma);
  }
  async countByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }
}
