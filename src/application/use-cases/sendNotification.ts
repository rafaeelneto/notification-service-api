import { Content } from '../entities/content';
import { Notification } from '../entities/Notification';
import { NotificationRepository } from '../repositories/NotificationRepository';

export interface SendNotificationPropsRequirements {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationPropsResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    request: SendNotificationPropsRequirements,
  ): Promise<SendNotificationPropsResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    // Persistir no DB
    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
