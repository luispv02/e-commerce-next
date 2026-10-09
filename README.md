
# E-Commerce Next

Tienda en línea desarrollada con **Next.js 16 (App Router), React 19, TypeScript, Prisma 7 y PostgreSQL**. Incluye catálogo con filtros, carrito de compras, checkout, historial de pedidos y panel de administración.

## Stack tecnológico

| Área | Tecnología |
|---|---|
| Framework | Next.js 16 |
| Librería de UI | React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 |
| Base de datos | PostgreSQL 16 |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Autenticación | Better Auth |
| Formularios y validación | React Hook Form, Zod |
| Almacenamiento de imágenes | Cloudinary |
| Gráficos | Recharts |
| Animaciones | Motion |
| Notificaciones | Sonner |
| Entorno de desarrollo | Docker Compose |

## Funcionalidades

- Catálogo de productos con filtros, ordenamiento y paginación.
- Detalle de productos con galería de imágenes y variantes.
- Carrito asociado al usuario autenticado.
- Checkout con dirección de envío y creación de pedidos.
- Historial de pedidos.
- Panel de administración con dashboard y gestión de productos.
- Autenticación y control de acceso por roles.
- Gestión de imágenes mediante Cloudinary.

> El checkout es demostrativo y no integra una pasarela de pago real.

## Instalación

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar las variables de entorno

Copia la plantilla:

```bash
cp env.template .env
```

Configura las credenciales de Cloudinary, el secreto de Better Auth y las demás variables necesarias.

### 3. Iniciar PostgreSQL

```bash
docker compose up -d
```

### 4. Ejecutar las migraciones

```bash
pnpm exec prisma migrate deploy
pnpm exec prisma generate
```

### 5. Cargar productos de ejemplo (opcional)

```bash
pnpm seed
```

> El seed reemplaza los productos existentes. No crea usuarios ni modifica pedidos.

### 6. Iniciar la aplicación

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/products` | Catálogo de productos |
| `/products/[slug]` | Detalle del producto |
| `/cart` | Carrito de compras |
| `/checkout` | Confirmación del pedido |
| `/orders` | Historial de pedidos |
| `/profile` | Perfil de usuario |
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/admin` | Dashboard administrativo |
| `/admin/products` | Gestión de productos |

