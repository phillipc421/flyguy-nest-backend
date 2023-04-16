import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product } from 'src/entities/Product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  getProducts() {
    return this.productRepo.find();
  }

  async createProduct(product: {
    name: string;
    price: number;
    stock: number;
    description: string;
  }) {
    const existingProduct = await this.productRepo.findOne({
      where: { name: ILike(product.name) },
    });
    if (existingProduct)
      throw new BadRequestException(
        'Product: ' + product.name + ' already exists!',
      );
    const newProduct = this.productRepo.create(product);
    return this.productRepo.save(newProduct);
  }

  async deleteProduct(id: string) {
    const productToDelete = await this.productRepo.findOne({ where: { id } });
    if (!productToDelete)
      throw new NotFoundException('Product ID: ' + id + ' not found!');
    return this.productRepo.remove(productToDelete);
  }
}
