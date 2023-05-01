import {
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  longDescription: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  stock: number;
}
