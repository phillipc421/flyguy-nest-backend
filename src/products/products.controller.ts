import {
  Controller,
  Get,
  ValidationPipe,
  Post,
  Body,
  UsePipes,
  Delete,
  Param,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dtos/create-product.dto';

@UsePipes(ValidationPipe)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) throw new BadRequestException('Missing ID parameter.');
    return this.productsService.deleteProduct(id);
  }
}
