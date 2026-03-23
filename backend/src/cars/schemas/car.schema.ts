import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Car extends Document {
  // Basic Info
  @Prop({ required: true }) manufacturer: string;
  @Prop({ required: true }) modelName: string;
  @Prop({ required: true }) modelYear: number;
  @Prop({ required: true, unique: true }) vin: string;
  @Prop() description: string;

  @Prop([String]) images: string[];

  @Prop() powertrain: string; 
  @Prop() horsepower: number;
  @Prop() topSpeed: number;
  @Prop() engineDisplacement: string;
  @Prop() colorHex: string;
  @Prop() finish: string;
  
  @Prop({ required: true }) mileage: number;

  @Prop({ required: true }) userId: string; 
}

export const CarSchema = SchemaFactory.createForClass(Car);