import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { HttpModule } from './infrastructure/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
