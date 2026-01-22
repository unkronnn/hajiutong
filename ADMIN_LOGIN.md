# 🔐 Admin Panel Login Guide

## 📋 Login Credentials

Database sudah berhasil dibuat dan user admin sudah ditambahkan!

### Admin Account
```
📧 Email/Username: admin
🔑 Password: admin123
👤 Role: ADMIN
```

### Test User Accounts
```
User 1:
  📧 Email: user1@example.com
  👤 Username: user1
  🔑 Password: password123
  ✅ Email Verified: Yes

User 2:
  📧 Email: user2@example.com
  👤 Username: user2
  🔑 Password: password123
  ❌ Email Verified: No
```

## 🚀 Cara Login

### 1. Akses Halaman Login
Buka browser dan kunjungi:
```
http://localhost:3000/login
```

### 2. Login sebagai Admin
1. Masukkan username atau email: `admin`
2. Masukkan password: `admin123`
3. Klik tombol **"Sign In"**
4. Anda akan otomatis redirect ke **Admin Panel** (`/admin`)

### 3. Login sebagai User Biasa
1. Gunakan salah satu test account di atas
2. Setelah login, akan redirect ke **Store** (`/store`)

## 📍 URLs Penting

- **Homepage**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Admin Panel**: http://localhost:3000/admin
- **Store**: http://localhost:3000/store
- **Status**: http://localhost:3000/status
- **Feedback**: http://localhost:3000/feedback
- **Terms**: http://localhost:3000/terms

## 🎯 Fitur Admin Panel

Setelah login sebagai admin, Anda dapat:
- ✅ Melihat statistik user
- ✅ Manage semua user accounts
- ✅ Edit/Delete user data
- ✅ Monitor email verifications
- ✅ Track user signups

## 🔒 Security Notes

⚠️ **PENTING untuk Production:**
1. Password saat ini disimpan sebagai plain text (hanya untuk development)
2. Untuk production, perlu implement bcrypt password hashing
3. Ganti admin password dengan yang lebih kuat
4. Setup email verification
5. Tambahkan 2FA (Two-Factor Authentication)

## 📦 Database Info

- **Database Type**: SQLite
- **Location**: `prisma/dev.db`
- **Schema**: `prisma/schema.prisma`
- **Seed Script**: `prisma/seed.ts`

### Menjalankan Ulang Seed (Reset Data)
```bash
# Hapus database
rm prisma/dev.db

# Generate Prisma Client
npx prisma generate

# Migrate ulang
npx prisma migrate dev --name init

# Seed data
npx tsx prisma/seed.ts
```

## 🛠️ Commands

### Lihat Database
```bash
npx prisma studio
```
Akan membuka GUI untuk melihat dan edit database di browser.

### Migration
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

### Reset Database
```bash
npx prisma migrate reset
```

## 🎨 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Request Example (Login)
```json
POST /api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "admin",
  "password": "admin123"
}
```

### Response Example (Success)
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "admin@hajiutong.com",
    "username": "admin",
    "name": "Admin HajiUtong",
    "role": "ADMIN"
  }
}
```

## 🔄 Auto-Redirect Logic

Login page memiliki smart redirect:
- **ADMIN role** → Redirect to `/admin`
- **USER role** → Redirect to `/store`

## 💡 Tips

1. **Forgot Password**: Link sudah ada di login page, tapi belum functional
2. **Sign Up**: Users baru bisa register sendiri via Sign Up tab
3. **Session**: Cookie expire setelah 7 hari
4. **Mobile**: Login page fully responsive

## 🐛 Troubleshooting

### Error: "Invalid credentials"
- Pastikan username/email benar: `admin` (bukan `admin@hajiutong.com`)
- Pastikan password benar: `admin123`
- Case sensitive!

### Database tidak ditemukan
```bash
cd "/path/to/project"
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
```

### Session tidak tersimpan
- Check browser cookies
- Pastikan database accessible
- Restart development server

---

🎉 **Selamat! Admin panel siap digunakan!**
