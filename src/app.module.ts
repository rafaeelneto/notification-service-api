import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/app.controller';
import { PrismaService } from './infrastructure/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
