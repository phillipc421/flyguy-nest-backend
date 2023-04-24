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

  findProduct(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  async getMultipleProducts(ids: string[]) {
    return this.productRepo
      .createQueryBuilder('product')
      .where('product.id IN (:...ids)', { ids })
      .getMany();
  }

  async createProduct(body: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  }) {
    const existingProduct = await this.productRepo.findOne({
      where: { name: ILike(body.name) },
    });
    if (existingProduct)
      throw new BadRequestException(
        'Product: ' + body.name + ' already exists!',
      );
    const newProduct = this.productRepo.create(body);
    return this.productRepo.save(newProduct);
  }

  async updateProduct(id: string, body: Partial<Product>) {
    const existingProduct = await this.findProduct(id);
    if (!existingProduct)
      throw new NotFoundException('Product ID: ' + id + ' not found!');
    Object.assign(existingProduct, body);
    return this.productRepo.save(existingProduct);
  }

  async deleteProduct(id: string) {
    const productToDelete = await this.findProduct(id);
    if (!productToDelete)
      throw new NotFoundException('Product ID: ' + id + ' not found!');
    return this.productRepo.remove(productToDelete);
  }
}
