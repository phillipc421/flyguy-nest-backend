import Stripe from 'stripe';
import { StripeModule } from './stripe.module';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  CartDataInterface,
  CartItemInterface,
} from 'src/interfaces/cart-data.interface';
import { ProductsService } from 'src/products/products.service';
import { CartDataDto } from 'src/dtos/cart-data.dto';

// https://github.com/stripe/stripe-node#usage-with-typescript
@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    private productsService: ProductsService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SANDBOX_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async calculateAmount() {}

  async createPaymentIntent(body: CartDataDto) {
    console.log(body);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent.client_secret;
  }
}
