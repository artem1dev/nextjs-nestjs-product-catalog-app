// src/product/product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductDto) {
    const slug = generateSlug(dto.title);
    return this.prisma.product.create({
      data: {
        ...dto,
        slug: slug,
      },
    });
  }

  async findAll(query: {
    search?: string;
    category?: string[];
    price_min?: string;
    price_max?: string;
    sort?: 'price-asc' | 'price-desc';
  }) {
    const where: Prisma.ProductWhereInput = {};
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};

    if (query.search) {
      where.title = {
        contains: query.search,
      };
    }

    if (query.category && query.category.length > 0) {
      const categories = Array.isArray(query.category) ? query.category : [query.category];
      const lowercaseCategories = categories.map(cat => cat.toLowerCase());

      where.category = {
        in: lowercaseCategories,
      };
    }

    if (query.price_min || query.price_max) {
      where.price = {};
      if (query.price_min) {
        where.price.gte = Math.floor(parseFloat(query.price_min) * 100);
      }
      if (query.price_max) {
        where.price.lte = Math.floor(parseFloat(query.price_max) * 100);
      }
    }

    if (query.sort === 'price-asc') {
      orderBy.price = 'asc';
    } else if (query.sort === 'price-desc') {
      orderBy.price = 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    return this.prisma.product.findMany({
      where,
      orderBy,
    });
  }

  async findOneBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }
    return product;
  }

  async findOneById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const data: Prisma.ProductUpdateInput = { ...dto };

    if (dto.title) {
      data.slug = generateSlug(dto.title);
    }

    try {
      return await this.prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with ID "${id}" not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with ID "${id}" not found`);
      }
      throw error;
    }
  }
}