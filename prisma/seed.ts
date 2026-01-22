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
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
