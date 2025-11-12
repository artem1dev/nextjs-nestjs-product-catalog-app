import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule { }
