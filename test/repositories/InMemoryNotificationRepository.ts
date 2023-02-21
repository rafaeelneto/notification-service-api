import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<string> {
    const notificationIndex = this.notifications.findIndex((n) => {
      return n.id === notification.id;
    });

    if (notificationIndex < 0) {
      throw new Error("Couldn't find notification");
    }
    this.notifications[notificationIndex] = notification;

    return this.notifications[notificationIndex].id;
  }

  async findByNotificationId(
    notificationId: string,
  ): Promise<Notification | null> {
    const notification =
      this.notifications.find((n) => {
        return n.id === notificationId;
      }) || null;

    return notification;
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => recipientId === n.recipientId);
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const recipientNotifications = await this.findByRecipientId(recipientId);

    return recipientNotifications.length;
  }
}
