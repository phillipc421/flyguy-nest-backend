import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemDto {
  @IsUUID()
  id: string;
  @IsNumber()
  @IsPositive()
  qty: number;
}

export class CartDataDto {
  @IsArray()
  @IsDefined()
  @Type(() => CartItemDto)
  @ValidateNested()
  items: CartItemDto[];
}
