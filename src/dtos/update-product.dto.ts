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
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  stock: number;
}
