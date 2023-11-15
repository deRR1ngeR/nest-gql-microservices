import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>) { }

  async createProduct(productInput: CreateProductInput): Promise<ProductEntity> {
    return await this.productRepository.save({ ...productInput })
  }

  async getProductById(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOneBy({ id })
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async removeProduct(id: number): Promise<number> {
    await this.productRepository.delete({ id })
    return id;
  }

  async updateProduct(updateProductInput: UpdateProductInput): Promise<ProductEntity> {
    await this.productRepository.update({ id: updateProductInput.id }, { ...updateProductInput });

    return await this.getProductById(updateProductInput.id);
  }
}
