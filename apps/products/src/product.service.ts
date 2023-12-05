import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductInput } from './dto/update-product.input';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from 'libs/db/typeorm/typeorm/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productInput: CreateProductInput): Promise<Product> {
    return await this.productRepository.save({ ...productInput });
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async removeProduct(id: number): Promise<number> {
    await this.productRepository.delete({ id });
    return id;
  }

  async updateProduct(
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    await this.productRepository.update(
      { id: updateProductInput.id },
      { ...updateProductInput },
    );

    return await this.getProductById(updateProductInput.id);
  }
}
