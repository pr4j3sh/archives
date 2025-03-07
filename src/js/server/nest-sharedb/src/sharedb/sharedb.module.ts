import { Module } from '@nestjs/common';
import { ShareDBService } from './sharedb.provider';

@Module({
  providers: [ShareDBService],
  exports: [ShareDBService],
})
export class ShareDBModule {}
