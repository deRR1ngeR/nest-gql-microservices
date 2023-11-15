import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateProductInput } from './dto/create-product.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'apps/account/src/apps/auth/guards/gql-auth.guard';

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Mutation(() => ProductEntity)
  @UseGuards(GqlAuthGuard)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productService.createProduct(createProductInput);
  }

  @Query(() => [ProductEntity], { name: 'product' })
  findAll() {
    return this.productService.getAllProducts();
  }

  @Query(() => ProductEntity, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.getProductById(id);
  }

  @Mutation(() => ProductEntity)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productService.updateProduct(updateProductInput);
  }

  @Mutation(() => ProductEntity)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.removeProduct(id);
  }

}
