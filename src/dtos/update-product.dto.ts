import { IsString, IsNumber, IsInt, IsOptional, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @IsInt()
  stock: number;
}
