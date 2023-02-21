import { HttpException } from '@nestjs/common';
import { makeNotification } from '@test/factories/makeNotification';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationRepository';
import { ReadNotification } from './readNotification';
import { SendNotification } from './sendNotification';

describe('read notification', () => {
  it('should mark a existing notification as read', async () => {
    const inMemoryRepository = new InMemoryNotificationRepository();

    const NOTIFICATION_ID = 'notification-id';

    await inMemoryRepository.create(makeNotification({ id: NOTIFICATION_ID }));
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());

    const readNotification = new ReadNotification(inMemoryRepository);

    const { notification } = await readNotification.execute({
      notificationId: NOTIFICATION_ID,
    });

    expect(notification.readAt).toBeTruthy();
  });

  it('should not be able to mark a existing notification as read', async () => {
    const inMemoryRepository = new InMemoryNotificationRepository();

    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());
    await inMemoryRepository.create(makeNotification());

    const readNotification = new ReadNotification(inMemoryRepository);

    expect(async () => {
      const { notification } = await readNotification.execute({
        notificationId: 'NOTIFICATION_ID',
      });
    }).rejects.toThrow(HttpException);
  });
});
