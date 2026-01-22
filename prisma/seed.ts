// Script untuk membuat admin user
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Buat admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hajiutong.com' },
    update: {},
    create: {
      email: 'admin@hajiutong.com',
      username: 'admin',
      name: 'Admin HajiUtong',
      password: 'admin123', // Password sederhana untuk development
      role: 'ADMIN',
      emailVerified: true,
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('📧 Email/Username: admin');
  console.log('🔐 Password: admin123');
  console.log('═══════════════════════════════════════════');
  console.log('');
  console.log('Login at: http://localhost:3000/login');
  console.log('Admin panel: http://localhost:3000/admin');
  console.log('');
  
  // Buat beberapa user biasa untuk testing
  await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      username: 'user1',
      name: 'User One',
      password: 'password123',
      role: 'USER',
      emailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      username: 'user2',
      name: 'User Two',
      password: 'password123',
      role: 'USER',
      emailVerified: false,
    },
  });

  console.log(`✅ Created 2 test users`);
  
  // Create games
  const fortnite = await prisma.game.upsert({
    where: { slug: 'fortnite' },
    update: {},
    create: {
      name: 'Fortnite',
      slug: 'fortnite',
      icon: '/games/fortnite.png',
      platform: 'Desktop',
      productCount: 0,
    },
  });

  const valorant = await prisma.game.upsert({
    where: { slug: 'valorant' },
    update: {},
    create: {
      name: 'Valorant',
      slug: 'valorant',
      icon: '/games/valorant.png',
      platform: 'Desktop',
      productCount: 0,
    },
  });

  const apex = await prisma.game.upsert({
    where: { slug: 'apex-legends' },
    update: {},
    create: {
      name: 'Apex Legends',
      slug: 'apex-legends',
      icon: '/games/apex.png',
      platform: 'Desktop',
      productCount: 0,
    },
  });

  console.log(`✅ Created 3 games`);

  // Create products
  const fortniteEsp = await prisma.product.create({
    data: {
      name: 'Fortnite ESP',
      slug: 'fortnite-esp',
      description: 'Advanced ESP for Fortnite with player highlighting',
      image: '/products/fortnite-esp.png',
      price: 29.99,
      status: 'AVAILABLE',
      badge: 'BEST_SELLER',
      gameId: fortnite.id,
    },
  });

  const valorantAimbot = await prisma.product.create({
    data: {
      name: 'Valorant Aimbot',
      slug: 'valorant-aimbot',
      description: 'Professional aimbot for Valorant',
      image: '/products/valorant-aimbot.png',
      price: 39.99,
      status: 'AVAILABLE',
      badge: 'POPULAR',
      gameId: valorant.id,
    },
  });

  const apexRadar = await prisma.product.create({
    data: {
      name: 'Apex Legends Radar',
      slug: 'apex-legends-radar',
      description: 'Enemy radar for Apex Legends',
      image: '/products/apex-radar.png',
      price: 34.99,
      status: 'AVAILABLE',
      badge: 'NEW',
      gameId: apex.id,
    },
  });

  // Update game product counts
  await prisma.game.update({
    where: { id: fortnite.id },
    data: { productCount: 1 },
  });

  await prisma.game.update({
    where: { id: valorant.id },
    data: { productCount: 1 },
  });

  await prisma.game.update({
    where: { id: apex.id },
    data: { productCount: 1 },
  });

  console.log(`✅ Created 3 products`);
  console.log('');
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
