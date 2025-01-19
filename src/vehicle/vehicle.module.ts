import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';
import { ProducerModule } from 'src/queue-handler/producer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    ProducerModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService, VehicleRepository],
})
export class VehicleModule {}
