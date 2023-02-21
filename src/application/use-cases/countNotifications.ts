import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { Injectable } from '@nestjs/common';

export interface CountNotificationProps {
  recipientId: string;
}

export interface CountNotificationResponse {
  count: number;
}

@Injectable()
export class CountNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    props: CountNotificationProps,
  ): Promise<CountNotificationResponse> {
    const { recipientId } = props;

    const count = await this.notificationRepository.countByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
