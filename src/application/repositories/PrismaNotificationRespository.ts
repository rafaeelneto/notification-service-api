import { Notification } from '../entities/Notification';
import { NotificationRepository } from './NotificationRepository';

export class PrismaNotificationRepository implements NotificationRepository {
  async create(notification: Notification): Promise<void> {}
}
