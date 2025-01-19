import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Nest'), VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
