import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },

  ];

  findAllCars() {
    return this.cars;
  }

  findCarById(id: string) {
    const car = this.cars.find(car => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);

    return car;
  }
  updateCar(id: string, updateCarDto: UpdateCarDto) {
    const car = this.findCarById(id);

    if(updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Cannot change car id');
    

    const updatedCar = {
      ...car,
      ...updateCarDto,
      id
    };

    this.cars = this.cars.map(car => (car.id === id ? updatedCar : car));

    return updatedCar;
  }

  deleteCar(id: string){
    const car = this.findCarById(id)
    this.cars = this.cars.filter(car => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
