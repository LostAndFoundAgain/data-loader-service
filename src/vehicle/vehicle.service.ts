import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import * as csv from 'csvtojson'
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
    constructor(private vehicleRepository: VehicleRepository) {
    }
    async processCSV(
        csvFile: Express.Multer.File) {
        const csvString = csvFile.buffer.toString('utf-8');
        const parsedCsv = await csv().fromString(csvString)
        const requestId: UUID = randomUUID()

       // Create processable data
        const vehicleData = parsedCsv.map((vehicle) => {
            return {
                requestId: requestId,
                serialNumber: vehicle['S. No.'],
                productName: vehicle['Product Name'],
                inputUrl: vehicle['Input Image Urls'].split(',')
            }
        })

        // send data to IPS
        


        // Save in DB
        await this.vehicleRepository.create(vehicleData)

        // return requestId
        return requestId;
    }
}
