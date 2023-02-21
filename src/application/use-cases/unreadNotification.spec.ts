import { HttpException } from '@nestjs/common';
import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { ReadNotification } from './readNotification';
import { SendNotification } from './sendNotification';
import { UnreadNotification } from './unreadNotification';

describe('unread notification', () => {
  it('should mark a existing notification as unread', async () => {
    const inMemoryRepository = new InMemoryNotificationRepository();

    const NOTIFICATION_ID = 'notification-id';

    await inMemoryRepository.create(makeNotification({ id: NOTIFICATION_ID }));
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());

    const unreadNotification = new UnreadNotification(inMemoryRepository);

    const { notification } = await unreadNotification.execute({
      notificationId: NOTIFICATION_ID,
    });

    expect(notification.readAt).toBeNull();
  });

  it('should not be able to mark a existing notification as unread', async () => {
    const inMemoryRepository = new InMemoryNotificationRepository();

    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());

    const unreadNotification = new UnreadNotification(inMemoryRepository);

    expect(async () => {
      const { notification } = await unreadNotification.execute({
        notificationId: 'NOTIFICATION_ID',
      });
    }).rejects.toThrow(HttpException);
  });
});
