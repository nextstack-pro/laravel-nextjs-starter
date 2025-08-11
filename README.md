# 🚀 Laravel + Next.js Starter Kit

A modern, production-ready starter kit featuring **Laravel** (API) + **Next.js** (Frontend) with **Docker**, **Redis**, **MySQL**, and comprehensive authentication using **Laravel Sanctum**.

[![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## ✨ Features

### 🔐 **Authentication & Security**
- **Laravel Sanctum** integration with cookie-based authentication
- **Server-side authentication** verification for protected routes
- **Middleware protection** with automatic redirects
- **CSRF protection** out of the box
- **Rate limiting** and security headers

### ⚡ **Performance & Architecture**
- **Server-Side Rendering (SSR)** for optimal SEO and performance
- **Progressive loading** with skeleton screens
- **Redis caching** for sessions and application data
- **Optimized Docker** setup with multi-stage builds
- **TypeScript** throughout the stack

### 🛠️ **Developer Experience**
- **Hot reload** in development mode
- **Route groups** for automatic protection (`(protected)`, `(auth)`, `(public)`)
- **Comprehensive middleware** system
- **Docker Compose** orchestration
- **Production-ready** configurations

### 🎨 **UI & Components**
- **Tailwind CSS** for styling
- **Reusable components** architecture
- **Form validation** with React Hook Form + Zod
- **Toast notifications** for user feedback
- **Loading states** and error boundaries

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Nginx (Reverse Proxy)                   │
│                    Port 80/443 (SSL)                        │
└─────────────────────┬───────────────────┬───────────────────┘
                      │                   │
              ┌───────▼─────────┐ ┌───────▼─────────┐
              │   Next.js App   │ │   Laravel API   │
              │   (Frontend)    │ │   (Backend)     │
              │   Port 3000     │ │   Port 8000     │
              └─────────────────┘ └──────┬──────────┘
                                         │
                        ┌────────────────┼────────────────┐
                        │                │                │
                ┌───────▼─────┐ ┌────────▼────────┐ ┌─────▼─────┐
                │   MySQL     │ │     Redis       │ │  Workers  │
                │ (Database)  │ │    (Cache)      │ │ (Queues)  │
                │ Port 3306   │ │   Port 6379     │ └───────────┘
                └─────────────┘ └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Docker** & **Docker Compose**
- **Node.js 20+** (for local development)
- **PHP 8.3+** (for local development)

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/florddev/laravel-nextjs-kit
cd laravel-nextjs-starter

# Run the setup script (recommended)
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Manual Setup (Alternative)

```bash
# Copy environment files
cp .env.example .env
cp laravel/.env.example laravel/.env
cp nextjs/.env.example nextjs/.env.local

# Start Docker services
docker-compose up -d

# Install Laravel dependencies
make laravel-install

# Install Next.js dependencies
make nextjs-install

# Your application is ready!
```

### 3. Access Your Application

- **Frontend**: [http://localhost](http://localhost)
- **API**: [http://localhost/api](http://localhost/api)
- **Database**: `localhost:3306`
- **Redis**: `localhost:6379`

## 📁 Project Structure

```
├── laravel/                 # Laravel API Application
│   ├── app/
│   │   ├── Http/Controllers/Auth/
│   │   ├── Models/
│   │   └── ...
│   ├── config/
│   ├── routes/api.php
│   └── ...
│
├── nextjs/                  # Next.js Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/      # Guest routes (login, register)
│   │   │   ├── (protected)/ # Protected routes (dashboard, profile)
│   │   │   └── (public)/    # Public routes (home, about)
│   │   ├── features/        # Feature-based organization
│   │   ├── core/           # Shared components & utilities
│   │   └── types/          # TypeScript definitions
│   └── ...
│
├── docker/                  # Docker configurations
│   ├── nginx/
│   ├── mysql/
│   └── redis/
│
├── docker-compose.yml       # Development environment
├── docker-compose.prod.yml  # Production environment
└── Makefile                # Development shortcuts
```

## 🔐 Authentication Flow

### Registration & Login

```typescript
// Register a new user
const { register } = useAuth();
await register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  password_confirmation: 'password123'
});

// Login
const { login } = useAuth();
await login({
  email: 'john@example.com',
  password: 'password123'
});
```

### Route Protection

```typescript
// Automatic protection via route groups
src/app/(protected)/dashboard/page.tsx  // ✅ Protected
src/app/(auth)/login/page.tsx          // ✅ Guest only
src/app/(public)/about/page.tsx        // ✅ Public

// Manual protection
<AuthGuard>
  <ProtectedComponent />
</AuthGuard>
```

### Server-Side Authentication

```typescript
// In Server Components
export default async function DashboardPage() {
  const user = await requireAuth(); // Redirects if not authenticated
  
  return <Dashboard user={user} />;
}
```

## 🎯 Progressive Loading Example

Combine immediate SSR data with progressive client-side loading:

```typescript
// Server Component - Loads immediately
export default async function DashboardPage() {
  const user = await requireAuth();
  const criticalData = await serverApiClient.get('/api/dashboard/critical');

  return (
    <div>
      {/* ⚡ Immediate SSR content */}
      <DashboardHeader user={user} />
      <MainStats stats={criticalData} />
      
      {/* 🔄 Progressive loading with skeletons */}
      <ProgressiveSection
        endpoint="/api/dashboard/charts"
        loadingComponent={<ChartSkeleton />}
        delay={500}
      >
        {(data) => <Charts data={data} />}
      </ProgressiveSection>
    </div>
  );
}
```

## 🐳 Docker Commands

### Development

```bash
make up              # Start all services
make down            # Stop all services
make logs            # View all logs
make shell-laravel   # Laravel container shell
make shell-nextjs    # Next.js container shell
```

### Laravel Specific

```bash
make laravel-migrate    # Run migrations
make laravel-seed       # Run seeders  
make laravel-fresh      # Fresh migration with seed
make laravel-optimize   # Optimize for production
```

### Next.js Specific

```bash
make nextjs-build    # Build for production
make nextjs-analyze  # Analyze bundle size
```

### Production

```bash
make prod-build      # Build production images
make prod-up         # Start production environment
make prod-down       # Stop production environment
```

## 🔧 Configuration

### Environment Variables

#### Global (.env)
```env
APP_ENV=development
NODE_ENV=development

# URLs
LARAVEL_APP_URL=http://localhost/api
NEXT_PUBLIC_API_URL=http://localhost/api
NEXT_PUBLIC_APP_URL=http://localhost

# Database
DB_DATABASE=laravel_app
DB_USERNAME=laravel_user
DB_PASSWORD=secure_password

# Redis
REDIS_PASSWORD=redis_password
```

#### Laravel (laravel/.env)
```env
APP_NAME="Laravel API"
APP_KEY=base64:generated_key_here
APP_URL=http://localhost/api

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000
FRONTEND_URL=http://localhost

# Session
SESSION_DOMAIN=localhost
```

#### Next.js (nextjs/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost/api
NEXT_PUBLIC_APP_URL=http://localhost
```

## 🎨 Customization

### Adding New Protected Routes

1. Create your page in the `(protected)` route group:
```typescript
// src/app/(protected)/settings/page.tsx
export default function SettingsPage() {
  return <div>Settings Content</div>;
}
```

2. That's it! The route is automatically protected by the layout.

### Adding Progressive Loading

```typescript
<ProgressiveSection
  endpoint="/api/your-endpoint"
  loadingComponent={<YourSkeleton />}
  delay={1000} // Optional delay
  optional={true} // Won't show errors if fails
>
  {(data) => <YourComponent data={data} />}
</ProgressiveSection>
```

### Custom API Endpoints

```php
// Laravel - routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/your-endpoint', [YourController::class, 'index']);
});
```

## 🧪 Testing

```bash
# Laravel tests
make test-laravel

# Next.js tests  
make test-nextjs

# All tests
make test
```

## 🚦 Health Checks

Built-in health check endpoints:

- **Laravel**: `http://localhost/api/health`
- **Next.js**: `http://localhost/api/health`
- **Overall**: `make health`

## 📊 Monitoring

### Production Monitoring

The production setup includes:

- **Nginx access/error logs**
- **Laravel application logs**
- **Redis monitoring**
- **MySQL performance metrics**
- **Docker container health checks**

### Performance Monitoring

```typescript
// Built-in performance monitoring
import { performanceMonitor } from '@/core/services/performanceMonitor';

// Track component performance
usePerformanceMeasure('ComponentName');

// Get metrics
const metrics = performanceMonitor.exportMetrics();
```

## 🔒 Security Features

- **HTTPS** ready with SSL configuration
- **Security headers** (HSTS, CSP, X-Frame-Options, etc.)
- **Rate limiting** on sensitive endpoints
- **CORS** properly configured
- **Environment variable** validation
- **SQL injection** protection via Eloquent ORM
- **XSS protection** via built-in Laravel features

## 🚀 Deployment

### Production Deployment

```bash
# Build and deploy
make prod-build
make prod-up

# Or use the deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Environment Requirements

- **Docker** & **Docker Compose**
- **SSL Certificates** (for production)
- **Domain name** configured
- **Environment variables** properly set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

#### CORS Errors
```bash
# Check if CORS domains are properly configured
grep -r "SANCTUM_STATEFUL_DOMAINS" laravel/.env
```

#### Authentication Issues
```bash
# Clear Laravel cache
make laravel-clear

# Check Sanctum configuration
make shell-laravel
php artisan config:show sanctum
```

#### Docker Issues
```bash
# Rebuild containers
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

#### Database Connection Issues
```bash
# Check MySQL container status
docker-compose ps mysql

# Access MySQL shell
make shell-mysql
```

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/florddev/laravel-nextjs-starter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/florddev/laravel-nextjs-starter/discussions)
<!-- - **Documentation**: Check the `/docs` folder for detailed guides -->

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=florddev/laravel-nextjs-starter&type=Date)](https://star-history.com/#florddev/laravel-nextjs-starter&Date)

## 📋 Roadmap

- [ ] **Multi-tenancy** support
- [ ] **WebSocket** integration with Laravel Echo
- [ ] **Push notifications**
- [ ] **Advanced caching** strategies
- [ ] **Monitoring dashboard**
- [ ] **CI/CD pipeline** templates
- [ ] **Mobile app** integration examples

---

<div align="center">

**Made with ❤️ by [Florddev](https://github.com/florddev)**

[⭐ Star this repo](https://github.com/florddev/laravel-nextjs-starter) if you found it helpful!

</div>