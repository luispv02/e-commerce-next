
# E-Commerce Next

Tienda en línea desarrollada con **Next.js 16 (App Router), React 19, TypeScript, Prisma 7 y PostgreSQL**. Incluye catálogo con filtros, carrito de compras, pagos con Stripe Checkout, historial de pedidos y panel de administración.

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
| Pagos | Stripe Checkout |
| Gráficos | Recharts |
| Animaciones | Motion |
| Notificaciones | Sonner |
| Entorno de desarrollo | Docker Compose |

## Funcionalidades

- Catálogo de productos con filtros, ordenamiento y paginación.
- Detalle de productos con galería de imágenes y variantes.
- Carrito asociado al usuario autenticado.
- Checkout con dirección de envío, creación de pedidos y pagos con Stripe Checkout.
- Confirmación de pagos mediante webhooks de Stripe y actualización automática del estado del pedido.
- Historial de pedidos.
- Panel de administración con dashboard y gestión de productos.
- Autenticación y control de acceso por roles.
- Gestión de imágenes mediante Cloudinary.


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

Configura las credenciales de Cloudinary, el secreto de Better Auth, Stripe y las demás variables necesarias:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

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

## Pagos con Stripe Checkout

Al confirmar el checkout, la aplicación crea una orden pendiente y redirige al cliente a una sesión alojada de Stripe. La sesión usa pesos mexicanos (MXN), vence tras 24 horas y puede reutilizarse mientras siga abierta.

Stripe notifica a la aplicación mediante `POST /api/webhooks/stripe`. Cuando el pago se confirma, el webhook valida la firma, el importe, la moneda y la orden antes de marcarla como `PAID`. Si la sesión expira o falla, la orden se cancela y el inventario reservado se repone.

### Webhook en desarrollo local

Con la aplicación en ejecución, reenvía los eventos de Stripe a tu entorno local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Tarjeta de prueba

En modo de prueba puedes utilizar la tarjeta `4242 4242 4242 4242`, cualquier fecha de vencimiento futura y cualquier CVC de tres dígitos.

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

