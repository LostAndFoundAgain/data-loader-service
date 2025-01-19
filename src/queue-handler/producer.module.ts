import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ProducerService } from './producer.service';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: 'ImageProcessingQueue.fifo',
          queueUrl:
            'https://sqs.ap-south-1.amazonaws.com/600627360383/ImageProcessingQueue.fifo',
          region: 'ap-south-1',
        },
      ],
    }),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
