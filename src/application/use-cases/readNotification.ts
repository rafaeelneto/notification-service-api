import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { NotificationNotFound } from './errors/notification-not-found.error';

export interface ReadNotificationPropsRequirements {
  notificationId: string;
}

export type ReadNotificationPropsResponse = {
  notification: Notification;
};

export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    props: ReadNotificationPropsRequirements,
  ): Promise<ReadNotificationPropsResponse> {
    const { notificationId } = props;

    const notification = await this.notificationRepository.findByNotificationId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);

    return {
      notification,
    };
  }
}
