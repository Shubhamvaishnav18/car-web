import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UnauthorizedException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CarsService } from './cars.service';
import { JwtService } from '@nestjs/jwt';

@Controller('cars')
export class CarsController {
  constructor(
    private carsService: CarsService,
    private jwtService: JwtService
  ) {}

  private getUserIdFromToken(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('No token provided');
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token, { secret: 'access-secret-key' });
      return decoded.id;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, { // Max 5 images
    storage: diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  createCar(
    @UploadedFiles() files: Array<Express.Multer.File>, 
    @Body() carData: any, 
    @Headers('authorization') authHeader: string
  ) {
    const userId = this.getUserIdFromToken(authHeader);
    
    if (files && files.length > 0) {
      carData.images = files.map(file => `http://localhost:3000/uploads/${file.filename}`);
    } else {
      carData.images = [];
    }

    return this.carsService.createCar(carData, userId);
  }

  @Get()
  getAllCars(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.carsService.getAllCars(userId);
  }

  @Get(':id')
  getCarById(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.carsService.getCarById(id, userId);
  }

  @Put(':id')
  updateCar(@Param('id') id: string, @Body() carData: any, @Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.carsService.updateCar(id, carData, userId);
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.carsService.deleteCar(id, userId);
  }
}