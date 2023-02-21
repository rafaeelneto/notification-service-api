import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { NotificationNotFound } from './errors/notification-not-found.error';

export interface UnreadNotificationPropsRequirements {
  notificationId: string;
}

export type UnreadNotificationPropsResponse = {
  notification: Notification;
};

export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    props: UnreadNotificationPropsRequirements,
  ): Promise<UnreadNotificationPropsResponse> {
    const { notificationId } = props;

    const notification = await this.notificationRepository.findByNotificationId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);

    return {
      notification,
    };
  }
}
