import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CartDataDto, CartItemDto } from 'src/dtos/cart-data.dto';

@UsePipes(new ValidationPipe())
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  createPaymentIntent(@Body() body: CartDataDto) {
    return this.stripeService.createPaymentIntent(body);
  }

  @Post('/webhook')
  readEvent(@Body() body: any) {
    console.log(body);
    return 'hi';
  }
}
