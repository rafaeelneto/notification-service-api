import { Notification } from '@application/entities/Notification';

export class ViewNotificationMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      createdAt: notification.createdAt,
      category: notification.category,
      readAt: notification.readAt,
    };
  }
}
