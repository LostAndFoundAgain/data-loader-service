import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import * as csv from 'csvtojson';
import { VehicleRepository } from './vehicle.repository';
import { ProducerService } from '../queue-handler/producer.service';

@Injectable()
export class VehicleService {
  constructor(
    private vehicleRepository: VehicleRepository,
    private producerService: ProducerService,
  ) {}

  async processCSV(csvFile: Express.Multer.File) {
    const csvString = csvFile.buffer.toString('utf-8');
    const parsedCsv = await csv().fromString(csvString);
    const requestId: UUID = randomUUID();

    const vehicleData = parsedCsv.map((vehicle) => {
      return {
        requestId: requestId,
        serialNumber: vehicle['S. No.'],
        productName: vehicle['Product Name'],
        inputUrl: vehicle['Input Image Urls'].split(','),
      };
    });

    await this.producerService.sendMessage(vehicleData);
    await this.vehicleRepository.create(vehicleData);

    return requestId;
  }
}
