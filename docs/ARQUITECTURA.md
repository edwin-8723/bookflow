# Arquitectura de BookFlow

## Multi-tenancy: shared database, shared schema

Cada negocio (peluquería, spa, etc.) es un **tenant**, representado por una
tabla `businesses`. Todas las tablas de dominio (services, staff, clients,
bookings, ...) tienen una columna `businessId` que referencia a ese tenant.

Reglas:

- Todo usuario autenticado pertenece a un `businessId` (viene en el JWT).
- Un `TenantInterceptor`/`Guard` en NestJS inyecta el `businessId` del token
  en cada request y los servicios **siempre** filtran por ese id al leer o
  escribir. Nunca se confía en un `businessId` que venga del body/query del
  cliente.
- Roles dentro de un tenant: `owner` (dueño del negocio) y `staff` (empleado).
  Más adelante se puede agregar `client` para el portal del cliente final.

Este enfoque es intencionalmente el más simple (una sola base de datos, sin
schemas ni bases separadas por cliente) para poder enfocarnos en aprender
NestJS/Angular. Si el proyecto creciera de verdad, el siguiente paso natural
sería evaluar "schema-per-tenant" o aislar tenants grandes en su propia base
de datos, pero **no lo haremos en este proyecto de práctica**.

## Módulos NestJS previstos

- `AuthModule`: registro de negocio + owner, login, JWT, refresh token.
- `TenantModule` (o guard global): resolución y aislamiento de tenant.
- `UsersModule`: staff del negocio.
- `ServicesModule`: catálogo de servicios que ofrece el negocio.
- `ClientsModule`: clientes del negocio (no confundir con "tenant").
- `AvailabilityModule`: horarios de disponibilidad del staff.
- `BookingsModule`: creación/listado/cancelación de reservas, validación de
  solapamiento de horarios.
- `NotificationsModule`: emails de confirmación/recordatorio.
- `BillingModule` (fase avanzada): integración con Stripe.

## Frontend Angular

- App standalone (sin NgModules), lazy loading por feature.
- `core/`: interceptors (JWT), guards (auth, rol), servicios de API.
- `features/auth`, `features/dashboard`, `features/booking-publica`, etc.
- Un layout de dashboard (admin) protegido por login, y una ruta pública de
  reserva sin login para los clientes finales del negocio.

## Decisiones que iremos tomando sobre la marcha

Este documento se irá actualizando a medida que aparezcan decisiones de
arquitectura relevantes (ej: estrategia de refresh tokens, librería de
calendario en Angular, proveedor de email, etc.).
