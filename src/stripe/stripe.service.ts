import Stripe from 'stripe';
import { StripeModule } from './stripe.module';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CartDataInterface,
  CartItemInterface,
} from 'src/interfaces/cart-data.interface';
import { ProductsService } from 'src/products/products.service';

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

  async calculateAmount(body: CartDataInterface) {
    const cartItems = body.items;
    const cartIds = Object.values(cartItems).map((item) => item.id);
    const products = await this.productsService.getMultipleProducts(cartIds);
    if (!products)
      throw new NotFoundException(
        'No products founds for the given identifiers.',
      );
    // calculate total cart amount
    let total = 0;

    return products;
  }

  async createPaymentIntent(body: CartDataInterface) {
    const calc = await this.calculateAmount(body);
    console.log('CALC', calc);
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
