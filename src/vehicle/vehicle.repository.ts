import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Vehicle, VehicleDocument } from "./entities/vehicle.entity";

export class VehicleRepository {
    constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) {
    }

    async create(data) {
        return this.vehicleModel.create(data)
    }
}