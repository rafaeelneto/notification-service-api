import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositories/NotificationRepository';
import { PrismaNotificationRepository } from 'src/application/repositories/PrismaNotificationRespository';
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
