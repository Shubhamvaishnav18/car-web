import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './schemas/car.schema';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  // Create a new car
  async createCar(carData: any, userId: string): Promise<Car> {
    const newCar = new this.carModel({ ...carData, userId });
    return await newCar.save();
  }

  // Get all cars for logged-in user
  async getAllCars(userId: string): Promise<Car[]> {
    return await this.carModel.find({ userId });
  }

  // Get single car by ID
  async getCarById(id: string, userId: string): Promise<Car> {
    const car = await this.carModel.findOne({ _id: id, userId });
    if (!car) throw new NotFoundException('Car not found');
    return car;
  }

  // Update car
  async updateCar(id: string, carData: any, userId: string): Promise<Car> {
    const updatedCar = await this.carModel.findOneAndUpdate(
      { _id: id, userId },
      carData,
      { new: true, runValidators: true }
    );
    if (!updatedCar) throw new NotFoundException('Car not found');
    return updatedCar;
  }

  // Delete car
  async deleteCar(id: string, userId: string): Promise<{ message: string }> {
    const deletedCar = await this.carModel.findOneAndDelete({ _id: id, userId });
    if (!deletedCar) throw new NotFoundException('Car not found');
    return { message: 'Car deleted successfully' };
  }
}