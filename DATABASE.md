# Database Setup & Management

## Database Information

- **Type**: SQLite
- **Location**: `prisma/dev.db`
- **ORM**: Prisma 6.19.2

## Accessing the Database

### Option 1: Prisma Studio (Recommended)
```bash
npx prisma studio
```
- Opens web GUI at http://localhost:5555
- Best for quick data viewing and editing
- Auto-updates on schema changes

### Option 2: HeidiSQL (For Advanced Users)

HeidiSQL doesn't support SQLite natively, but you can:

#### Method A: Convert to MySQL/PostgreSQL (Production Ready)

**For MySQL:**
1. Update `.env`:
```env
DATABASE_URL="mysql://root:password@localhost:3306/hajiutong"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

3. Run migration:
```bash
npx prisma migrate dev --name switch_to_mysql
npx prisma db seed
```

4. Connect HeidiSQL:
   - Host: localhost
   - User: root
   - Password: your_password
   - Database: hajiutong

**For PostgreSQL:**
1. Update `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/hajiutong"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Run migration:
```bash
npx prisma migrate dev --name switch_to_postgresql
npx prisma db seed
```

#### Method B: Use DB Browser for SQLite (Alternative)
- Download: https://sqlitebrowser.org/
- Open: `prisma/dev.db`
- View and edit tables directly

## API Endpoints

All data is now accessible via REST API:

### Games API
```bash
# Get all games
GET /api/games

# Create game
POST /api/games
{
  "name": "Game Name",
  "slug": "game-name",
  "icon": "/games/icon.png",
  "platform": "Desktop"
}

# Update game
PUT /api/games
{
  "id": "game_id",
  "name": "Updated Name",
  "icon": "/games/new-icon.png"
}

# Delete game
DELETE /api/games?id=game_id
```

### Products API
```bash
# Get all products
GET /api/products

# Create product
POST /api/products
{
  "name": "Product Name",
  "description": "Description",
  "image": "/products/image.png",
  "price": 29.99,
  "status": "AVAILABLE",
  "badge": "BEST_SELLER",
  "gameId": "game_id"
}

# Update product
PUT /api/products
{
  "id": "product_id",
  "name": "Updated Name",
  "price": 39.99
}

# Delete product
DELETE /api/products?id=product_id
```

## Database Schema

### Main Tables

**Game**
- id: String (CUID)
- name: String
- slug: String (unique)
- icon: String (image path)
- platform: Enum (Desktop, Android, iOS)
- productCount: Int
- createdAt, updatedAt: DateTime

**Product**
- id: String (CUID)
- name: String
- slug: String
- description: String (optional)
- image: String (optional)
- price: Float
- status: Enum (AVAILABLE, OUT_OF_STOCK, COMING_SOON)
- badge: Enum (BEST_SELLER, NEW, POPULAR)
- gameId: String (foreign key)
- hwidLocked: Boolean
- createdAt, updatedAt: DateTime

**User**
- id: String (CUID)
- name, username, email: String
- password: String (hashed)
- role: Enum (USER, ADMIN)
- emailVerified: Boolean
- createdAt, updatedAt: DateTime

**Order**
- id: String (CUID)
- orderNumber: String (unique)
- userId: String (foreign key)
- totalAmount: Float
- status: Enum (PENDING, COMPLETED, CANCELLED, REFUNDED)
- createdAt, updatedAt: DateTime

## Development Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed database with initial data
npx prisma db seed

# Generate Prisma Client after schema changes
npx prisma generate
```

## Production Deployment

For production, migrate to MySQL or PostgreSQL:

1. **Setup Database Server**
   - MySQL: Install and create database
   - PostgreSQL: Install and create database

2. **Update Environment Variables**
   ```env
   DATABASE_URL="mysql://user:pass@host:3306/db"
   # or
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   ```

3. **Update Prisma Schema**
   Change provider to `mysql` or `postgresql`

4. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

5. **Seed Production Data**
   ```bash
   npx prisma db seed
   ```

## Current Admin Panel Features

✅ **Connected to Database:**
- All games CRUD operations
- All products CRUD operations
- Image upload (stored as base64 or file paths)
- Real-time data sync
- Persistent across sessions

🔄 **Still Using Mock Data:**
- Users management
- Orders management
- Reviews management

## Backup & Restore

**SQLite Backup:**
```bash
# Backup
cp prisma/dev.db prisma/backup.db

# Restore
cp prisma/backup.db prisma/dev.db
```

**MySQL/PostgreSQL Backup:**
```bash
# MySQL
mysqldump -u user -p hajiutong > backup.sql
mysql -u user -p hajiutong < backup.sql

# PostgreSQL
pg_dump hajiutong > backup.sql
psql hajiutong < backup.sql
```

## Troubleshooting

**Issue: "Cannot find module '@prisma/client'"**
```bash
npx prisma generate
```

**Issue: "Database schema not in sync"**
```bash
npx prisma migrate dev
```

**Issue: "HeidiSQL can't connect"**
- SQLite not supported by HeidiSQL
- Use Prisma Studio or DB Browser for SQLite
- Or migrate to MySQL/PostgreSQL

## Next Steps

1. ✅ Games & Products connected to database
2. ⏳ Connect Users management to API
3. ⏳ Connect Orders management to API  
4. ⏳ Connect Reviews management to API
5. ⏳ Add image upload to server (currently base64)
6. ⏳ Implement authentication middleware for API routes
7. ⏳ Add pagination for large datasets
8. ⏳ Add search/filter functionality in API
