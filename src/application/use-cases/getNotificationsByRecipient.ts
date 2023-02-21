import { Notification } from '@application/entities/Notification';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { Injectable } from '@nestjs/common';

export interface GetNotificationsProps {
  recipientId: string;
}

export interface GetNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetNotificationsByRecipient {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    props: GetNotificationsProps,
  ): Promise<GetNotificationsResponse> {
    const { recipientId } = props;

    const notifications = await this.notificationRepository.findByRecipientId(
      recipientId,
    );

    return {
      notifications,
    };
  }
}
