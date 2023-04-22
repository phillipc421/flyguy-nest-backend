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
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { UpdateProductDto } from 'src/dtos/update-product.dto';

@UsePipes(new ValidationPipe({ whitelist: true }))
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findProduct(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Put('/:id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
