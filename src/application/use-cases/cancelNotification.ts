import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';

export interface CancelNotificationPropsRequirements {
  recipientId: string;
}

export interface CancelNotificationPropsResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: CancelNotificationPropsRequirements,
  ): Promise<CancelNotificationPropsResponse> {
    const { recipientId } = request;

    const notification = new Notification({
      recipientId,
    });

    // Persistir no DB
    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
