# Authentication System Documentation

This authentication system now persists user sessions across page refreshes using HTTP-only cookies and React Context.

## Features

- ✅ **Persistent Sessions**: User stays logged in after page refresh
- ✅ **Secure**: Uses HTTP-only cookies for session tokens (inaccessible to JavaScript)
- ✅ **Role-Based Access Control**: Support for user roles (USER, ADMIN)
- ✅ **Protected Routes**: Easy-to-use component for protecting pages
- ✅ **Loading States**: Automatic loading indicators while checking authentication

## How It Works

1. **Login**: When user logs in, the server creates a session and sets an HTTP-only cookie
2. **Session Storage**: The session token is stored in an HTTP-only cookie (secure, can't be accessed by JS)
3. **User State**: User data is stored in React Context via `AuthProvider`
4. **Persistence**: On app mount, the context checks the session via `/api/auth/session`
5. **Auto-Redirect**: Protected routes automatically redirect unauthenticated users

## Usage Examples

### 1. Basic Authentication Check

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';

export default function MyPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.username || user.email}!</div>;
}
```

### 2. Protected Route (Require Login)

```tsx
'use client';

import { ProtectedRoute } from '@/components/protected-route';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This page requires login</p>
      </div>
    </ProtectedRoute>
  );
}
```

### 3. Admin-Only Route

```tsx
'use client';

import { ProtectedRoute } from '@/components/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <div>
        <h1>Admin Panel</h1>
        <p>This page requires admin role</p>
      </div>
    </ProtectedRoute>
  );
}
```

### 4. Custom Login Page

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
```

### 5. Logout Functionality

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### 6. Accessing User Data

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';

export default function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Username: {user.username || 'Not set'}</p>
      <p>Role: {user.role}</p>
      <p>Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### 7. Conditional Rendering Based on Role

```tsx
'use client';

import { useAuth } from '@/lib/auth-context';

export default function AdminPanel() {
  const { user } = useAuth();

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.username || user.email}!</h1>

      {user.role === 'ADMIN' && (
        <div>
          <h2>Admin Controls</h2>
          <button>Delete User</button>
          <button>Ban User</button>
        </div>
      )}

      {user.role === 'USER' && (
        <div>
          <h2>User Controls</h2>
          <button>Update Profile</button>
        </div>
      )}
    </div>
  );
}
```

### 8. Custom Fallback URL

```tsx
'use client';

import { ProtectedRoute } from '@/components/protected-route';

export default function ProfilePage() {
  return (
    <ProtectedRoute fallback="/login?redirect=/profile">
      <div>
        <h1>Profile</h1>
        <p>Your profile information</p>
      </div>
    </ProtectedRoute>
  );
}
```

## API Reference

### `useAuth()` Hook

Returns an object with:

- **`user`**: User object or null
  - `id`: User ID
  - `email`: User email
  - `username`: Username (optional)
  - `name`: Display name (optional)
  - `role`: User role ('USER' or 'ADMIN')
  - `emailVerified`: Boolean

- **`loading`**: Boolean, true while checking authentication

- **`login(emailOrUsername, password)`**: Function to log in
  - Returns: `Promise<{ success: boolean; error?: string }>`

- **`logout()`**: Function to log out
  - Returns: `Promise<void>`

- **`refreshSession()`**: Function to refresh session from server
  - Returns: `Promise<void>`

### `<ProtectedRoute>` Component

Props:

- **`children`**: ReactNode - The protected content
- **`requireAdmin`**: boolean (optional) - Require admin role, default false
- **`fallback`**: string (optional) - Redirect path for unauthenticated users, default '/login'

## Security Notes

1. **HTTP-Only Cookies**: Session tokens are stored in HTTP-only cookies, preventing XSS attacks
2. **Secure Flag**: Cookies are marked as secure in production
3. **SameSite**: Cookies use 'lax' same-site policy to prevent CSRF attacks
4. **Session Expiration**: Sessions expire after 7 days
5. **Database Storage**: Sessions are stored in the database, allowing revocation

## Testing Authentication

1. **Test Login**: Go to `/login`, enter credentials, should redirect on success
2. **Test Persistence**: After login, refresh the page - should stay logged in
3. **Test Protected Routes**: Try accessing `/admin` without login - should redirect to `/login`
4. **Test Role Protection**: Login as regular user, try accessing `/admin` - should redirect to `/store`
5. **Test Logout**: Click logout button, should clear session and redirect

## Troubleshooting

### Issue: User gets logged out on refresh

**Solution**: Make sure `AuthProvider` is wrapping your app in `src/app/layout.tsx`

### Issue: Protected route not redirecting

**Solution**: Ensure you're using the `<ProtectedRoute>` component, not just checking `useAuth()`

### Issue: Admin page accessible to regular users

**Solution**: Use `<ProtectedRoute requireAdmin>` on admin-only pages

### Issue: Session persists after logout

**Solution**: Check that the logout API endpoint is clearing the cookie properly

## File Structure

```
src/
├── lib/
│   └── auth-context.tsx       # Auth context and useAuth hook
├── components/
│   └── protected-route.tsx    # ProtectedRoute component
├── app/
│   ├── layout.tsx             # Root layout with AuthProvider
│   ├── login/
│   │   └── page.tsx           # Login page using auth context
│   └── admin/
│       └── page.tsx           # Admin page with ProtectedRoute
└── api/
    └── auth/
        ├── login/
        │   └── route.ts       # Login API (sets HTTP-only cookie)
        ├── session/
        │   └── route.ts       # Session validation API
        └── logout/
            └── route.ts       # Logout API (clears cookie)
```

## Best Practices

1. **Always use `useAuth()`** instead of direct session checks
2. **Wrap protected pages** with `<ProtectedRoute>` component
3. **Handle loading states** to show loading indicators
4. **Check user role** before showing admin controls
5. **Use `logout()`** instead of manual logout logic
6. **Never store tokens** in localStorage (use HTTP-only cookies instead)
7. **Validate sessions** on sensitive actions using `refreshSession()`

## Migration Guide

If you were using the old login system:

**Before:**
```tsx
const response = await fetch('/api/auth/login', { ... });
const data = await response.json();
localStorage.setItem('token', data.token); // ❌ Not secure
```

**After:**
```tsx
const { login } = useAuth();
const result = await login(email, password); // ✅ Secure, automatic persistence
```

No need to manually store tokens or check localStorage - the AuthContext handles everything!
