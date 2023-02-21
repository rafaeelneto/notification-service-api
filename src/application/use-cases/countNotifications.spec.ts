import { Notification } from '@application/entities/Notification';
import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { CountNotification } from './countNotifications';
import {
  SendNotification,
  SendNotificationPropsRequirements,
} from './sendNotification';

describe('count notification', () => {
  it('should return the corrent count of notifications by recipient', async () => {
    const recipientId = 'example-recipient-id';

    const inMemoryRepository = new InMemoryNotificationRepository();

    inMemoryRepository.create(makeNotification({ recipientId }));
    inMemoryRepository.create(makeNotification({ recipientId }));
    inMemoryRepository.create(makeNotification({ recipientId }));
    inMemoryRepository.create(makeNotification({ recipientId }));

    const countNotification = new CountNotification(inMemoryRepository);

    const { count } = await countNotification.execute({ recipientId });

    expect(count).toEqual(4);
  });
});
