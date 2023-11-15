import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { Parent, ResolveField } from '@nestjs/graphql';

@Injectable()
export class CartService {

  constructor(@InjectRepository(CartEntity) private readonly cartRepository: Repository<CartEntity>) { }




}
