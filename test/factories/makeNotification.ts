import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/Notification';

export function makeNotification(
  customProps?: Partial<NotificationProps>,
): Notification {
  return new Notification({
    category: 'social',
    content: new Content('Generic Content'),
    recipientId: 'some-example-id',
    ...customProps,
  });
}
