import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareDBModule } from './sharedb/sharedb.module';
import { ShareDBController } from './sharedb/sharedb.controller';

@Module({
  imports: [ShareDBModule],
  controllers: [AppController, ShareDBController],
  providers: [AppService],
})
export class AppModule {}
