import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        game: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image, price, status, badge, gameId } = body;

    // Validation
    if (!name || !price || !gameId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, gameId' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        image,
        price: parseFloat(price),
        status: status || 'AVAILABLE',
        badge,
        gameId,
      },
      include: {
        game: true,
      },
    });

    // Update game product count
    await prisma.game.update({
      where: { id: gameId },
      data: {
        productCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, image, price, status, badge, gameId } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get old product to check if gameId changed
    const oldProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!oldProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Generate new slug if name changed
    const slug = name ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(price && { price: parseFloat(price) }),
        ...(status && { status }),
        ...(badge !== undefined && { badge }),
        ...(gameId && { gameId }),
      },
      include: {
        game: true,
      },
    });

    // Update product counts if game changed
    if (gameId && gameId !== oldProduct.gameId) {
      // Decrement old game
      await prisma.game.update({
        where: { id: oldProduct.gameId },
        data: {
          productCount: {
            decrement: 1,
          },
        },
      });

      // Increment new game
      await prisma.game.update({
        where: { id: gameId },
        data: {
          productCount: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get product to update game count
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    // Update game product count
    await prisma.game.update({
      where: { id: product.gameId },
      data: {
        productCount: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
