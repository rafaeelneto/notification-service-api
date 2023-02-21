import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/Notification';

type rawNotificationPrisma = {
  category: string;
  content: string;
  recipientId: string;
  readAt: Date | null | undefined;
  createdAt: Date;
  id: string;
};

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      id: notification.id,
    };
  }

  static fromPrisma(raw: rawNotificationPrisma) {
    return new Notification({
      ...raw,
      content: new Content(raw.content),
    });
  }
}
