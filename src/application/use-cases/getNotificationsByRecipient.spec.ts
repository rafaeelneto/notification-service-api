import { Notification } from '@application/entities/Notification';
import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CountNotification } from './countNotifications';
import { GetNotificationsByRecipient } from './getNotificationsByRecipient';
import {
  SendNotification,
  SendNotificationPropsRequirements,
} from './sendNotification';

describe('get notifications', () => {
  it('should get the notifications by recipient', async () => {
    const recipientId = 'example-recipient-id';

    const inMemoryRepository = new InMemoryNotificationRepository();

    await inMemoryRepository.create(makeNotification({ recipientId }));
    await inMemoryRepository.create(makeNotification({ recipientId }));
    await inMemoryRepository.create(makeNotification({ recipientId }));
    await inMemoryRepository.create(
      makeNotification({ recipientId: 'another-id' }),
    );

    const countNotification = new GetNotificationsByRecipient(
      inMemoryRepository,
    );

    const { notifications } = await countNotification.execute({ recipientId });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
  });
});
