import { Controller, Get, Param } from '@nestjs/common';
import { ShareDBService } from './sharedb.provider';

@Controller('sharedb')
export class ShareDBController {
  constructor(private readonly shareDBService: ShareDBService) {}

  @Get(':docId')
  async getDocument(@Param('docId') docId: string) {
    const connection = this.shareDBService.getConnection();
    const doc = connection.get('documents', docId);

    return new Promise((resolve, reject) => {
      doc.fetch((err) => {
        if (err) return reject(err);
        if (!doc.type) {
          doc.create({}, 'json0', (createErr) => {
            if (createErr) return reject(createErr);
            resolve(doc.data);
          });
        } else {
          resolve(doc.data);
        }
      });
    });
  }
}
