import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
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
  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CartItemDto)
  @ValidateNested({ each: true })
  items: CartItemDto[];
}
