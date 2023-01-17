import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
