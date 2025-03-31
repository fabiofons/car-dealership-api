import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Suzuki',
    //   createdAt: new Date().getTime(),
    // }
  ]


  create(createBrandDto: CreateBrandDto) {
    const {name} = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime(),
    }
    this.brands.push(brand)
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if(!brand)
      throw new NotFoundException(`Brand with id "${id}" not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);

    const updatedBrand = {
      ...brand,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    }

    this.brands = this.brands.map(brand => brand.id === id ? updatedBrand : brand);

    return updatedBrand
  }

  remove(id: string) {
    return this.brands.filter(brand => brand.id !== id);
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
