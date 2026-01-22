import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all games
export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json({ games }, { status: 200 });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

// POST - Create new game
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, icon, platform } = body;

    // Validation
    if (!name || !slug || !icon || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingGame = await prisma.game.findUnique({
      where: { slug },
    });

    if (existingGame) {
      return NextResponse.json(
        { error: 'Game with this slug already exists' },
        { status: 409 }
      );
    }

    // Create game
    const game = await prisma.game.create({
      data: {
        name,
        slug,
        icon,
        platform,
        productCount: 0,
      },
    });

    return NextResponse.json({ game }, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}

// PUT - Update game
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug, icon, platform } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    const game = await prisma.game.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(slug && { slug }),
        ...(icon && { icon }),
        ...(platform && { platform }),
      },
    });

    return NextResponse.json({ game }, { status: 200 });
  } catch (error) {
    console.error('Error updating game:', error);
    return NextResponse.json(
      { error: 'Failed to update game' },
      { status: 500 }
    );
  }
}

// DELETE - Delete game
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    await prisma.game.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Game deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting game:', error);
    return NextResponse.json(
      { error: 'Failed to delete game' },
      { status: 500 }
    );
  }
}
