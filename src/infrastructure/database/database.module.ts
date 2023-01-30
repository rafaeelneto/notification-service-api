import { Module } from '@nestjs/common';
import { NotificationRepository } from '@application/repositories/NotificationRepository';
import { PrismaNotificationRepository } from '@application/repositories/PrismaNotificationRespository';
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
