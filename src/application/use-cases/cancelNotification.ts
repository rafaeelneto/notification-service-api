import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';
import { NotificationNotFound } from './errors/notification-not-found.error';

export interface CancelNotificationPropsRequirements {
  notificationId: string;
}

export type CancelNotificationPropsResponse = {
  notification: Notification;
};

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: CancelNotificationPropsRequirements,
  ): Promise<CancelNotificationPropsResponse> {
    const { notificationId } = request;

    // Find on DB
    const notification = await this.notificationRepository.findByNotificationId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    // Persist on DB
    await this.notificationRepository.save(notification);

    return {
      notification,
    };
  }
}
