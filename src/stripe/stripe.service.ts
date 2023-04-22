import Stripe from 'stripe';
import { StripeModule } from './stripe.module';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

// https://github.com/stripe/stripe-node#usage-with-typescript
@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SANDBOX_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(order?: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 20000,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  }
}
