import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';
import { PrismaNotificationRepository } from 'src/infrastructure/database/prisma/repositories/prismaNotification.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
