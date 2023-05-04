import Stripe from 'stripe';
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
    const idPriceMap = {};
    products.forEach((product) => (idPriceMap[product.id] = product.price));

    if (!products)
      throw new NotFoundException(
        'No products founds for the given identifiers.',
      );
    // calculate total cart amount
    // stripe wants smallest currency unit, ie cents, hence the * 100
    return (
      cartItems.reduce(
        (prev, curr) => prev + idPriceMap[curr.id] * curr.qty,
        0,
      ) * 100
    );
  }

  async createPaymentIntent(body: CartDataInterface) {
    const calc = await this.calculateAmount(body);
    const customer = await this.stripe.customers.create();
    const paymentIntent = await this.stripe.paymentIntents.create({
      customer: customer.id,
      setup_future_usage: 'off_session',
      amount: calc,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return { stripeClientSecret: paymentIntent.client_secret };
  }
}
