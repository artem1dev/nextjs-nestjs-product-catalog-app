import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  Min,
  IsInt,
} from 'class-validator';

enum ProductCategory {
  Clothing = 'Clothing',
  Shoes = 'Shoes',
  Electronics = 'Electronics',
  Accessories = 'Accessories',
  Other = 'Other',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;

  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @IsInt()
  @Min(0)
  price: number;

  @IsBoolean()
  availability: boolean;
}