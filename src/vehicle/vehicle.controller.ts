import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('data'))
  uploadFile(@UploadedFile() csvFile: Express.Multer.File) {
    return this.vehicleService.processCSV(csvFile);
  }
}
