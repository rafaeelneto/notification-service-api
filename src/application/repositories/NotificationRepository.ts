import { Notification } from '../entities/Notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<string>;
  abstract findByNotificationId(
    notificationId: string,
  ): Promise<Notification | null>;
  abstract findByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
}
