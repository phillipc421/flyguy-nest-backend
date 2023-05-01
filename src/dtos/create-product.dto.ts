import { IsString, IsInt, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  longDescription: string;

  @IsString()
  ingredients: string;

  @IsUrl()
  image: string;

  @IsInt()
  stock: number;
}
