import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {randomUUID} from 'node:crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: any) {
    console.log(body);
    // await this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content: 'Voce tem solicitação de amizade',
    //     category: 'social',
    //     recipientId: randomUUID()
    //   }
    // })
  }
}
