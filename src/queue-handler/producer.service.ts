import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { randomUUID } from 'crypto';

@Injectable()
export class ProducerService {
  constructor(private readonly sqsService: SqsService) {}

  async sendMessage(body: any) {
    const message: any = JSON.stringify(body);
    try {
      await this.sqsService.send('ImageProcessingQueue.fifo', {
        id: randomUUID(),
        body: message,
        groupId: randomUUID(),
      });
    } catch (exception) {
      console.log('Unable to send message', exception);
    }
  }
}
