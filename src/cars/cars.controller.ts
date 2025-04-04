import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsService: CarsService
  ) { }

  @Get()
  getAllCars() {
    return this.carsService.findAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id });
    return this.carsService.findCarById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto) {

    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto ) {

    return this.carsService.updateCar(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
