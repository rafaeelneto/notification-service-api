import {
  CancelNotification,
  CancelNotificationPropsRequirements,
} from './cancelNotification';

import {
  SendNotification,
  SendNotificationPropsRequirements,
} from './sendNotification';

import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { HttpException } from '@nestjs/common';

describe('cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const request: SendNotificationPropsRequirements = {
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'Você recebeu notificação',
    };

    const inMemoryRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotification(inMemoryRepository);
    const { notification } = await sendNotification.execute(request);

    const cancelNotification = new CancelNotification(inMemoryRepository);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(inMemoryRepository.notifications).toBeTruthy();
    expect(inMemoryRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('shoud not be able to cancel a notification', async () => {
    const request: SendNotificationPropsRequirements = {
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'Você recebeu notificação',
    };

    const inMemoryRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotification(inMemoryRepository);
    const { notification } = await sendNotification.execute(request);

    const cancelNotification = new CancelNotification(inMemoryRepository);

    expect(async () => {
      await cancelNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(HttpException);
  });
});
