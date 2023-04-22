import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ConfigModule, ProductsModule],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
