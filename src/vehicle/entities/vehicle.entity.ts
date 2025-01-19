import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto"
import { Document } from "mongoose"

export type VehicleDocument = Vehicle & Document

@Schema({ collection: 'vehicle' })
export class Vehicle {
    @Prop()
    requestId: UUID
    @Prop()
    serialNumber: number
    @Prop()
    productName: string
    @Prop()
    inputUrl: string[]
    @Prop()
    outputUrl: string[]
    @Prop({ default: 'IN_PROGRESS' })
    status: string
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle)