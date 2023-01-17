import {
  SendNotification,
  SendNotificationPropsRequirements,
} from './sendNotification';
import { InMemoryNotificationRepository } from '../../../test/repositories/InMemoryNotificationRepository';

describe('send notification', () => {
  it('should be able to send a notification', async () => {
    const request: SendNotificationPropsRequirements = {
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'Você recebeu notificação',
    };

    const inMemoryRepository = new InMemoryNotificationRepository();

    const sendNotification = new SendNotification(inMemoryRepository);
    const { notification } = await sendNotification.execute(request);

    expect(inMemoryRepository.notifications).toBeTruthy();
    expect(inMemoryRepository.notifications[0]).toEqual(notification);
  });
});
