import { IsString, IsInt, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  image: string;

  @IsInt()
  stock: number;
}
