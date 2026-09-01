# Backlog — BookFlow

Convención de rama entre paréntesis en cada HU. Las HU están ordenadas en el
orden recomendado de implementación (cada una asume que las anteriores están
hechas).

## Épica 0 — Setup del proyecto

- **HU-000** — Como developer, quiero el repo, el backend NestJS y el
  frontend Angular inicializados y conectados a Postgres, para poder empezar
  a construir funcionalidades.
  (`chore/initial-setup`)

## Épica 1 — Autenticación y aislamiento multi-tenant

- **HU-001** — Como dueño de un negocio, quiero registrarme creando mi
  negocio y mi usuario owner, para empezar a usar BookFlow.
  Criterios: endpoint `POST /auth/register` crea `Business` + `User(role=owner)`
  en una transacción; password hasheado (bcrypt); valida email único.
  (`feature/hu-001-registro-tenant`)

- **HU-002** — Como usuario registrado, quiero iniciar sesión y recibir un
  JWT, para poder acceder a los endpoints protegidos de mi negocio.
  Criterios: `POST /auth/login`; el JWT incluye `sub` (userId), `businessId`
  y `role`; expiración configurable por env var.
  (`feature/hu-002-login-jwt`)

- **HU-003** — Como sistema, quiero que cada request a un recurso de negocio
  esté automáticamente aislado por tenant, para que un negocio jamás vea
  datos de otro.
  Criterios: `AuthGuard` + `RolesGuard` globales; decorador `@CurrentUser()`
  que expone `businessId`/`role`; test que confirme que un usuario del
  negocio A no puede leer/editar recursos del negocio B (403/404).
  (`feature/hu-003-tenant-guard-roles`)

## Épica 2 — Catálogo del negocio

- **HU-004** — CRUD de servicios (nombre, duración en minutos, precio).
  (`feature/hu-004-crud-servicios`)
- **HU-005** — CRUD de staff (empleados que atienden servicios).
  (`feature/hu-005-crud-staff`)
- **HU-006** — CRUD de clientes del negocio (no confundir con el tenant).
  (`feature/hu-006-crud-clientes`)

## Épica 3 — Disponibilidad y reservas (core del producto)

- **HU-007** — Definir horarios de disponibilidad semanal por staff (ej.
  lunes 9-13 y 15-19).
  (`feature/hu-007-disponibilidad-staff`)
- **HU-008** — Crear una reserva validando disponibilidad del staff y que no
  se solape con otra reserva existente.
  (`feature/hu-008-crear-reserva`)
- **HU-009** — Listar reservas (por día/staff) y cancelarlas.
  (`feature/hu-009-listar-cancelar-reservas`)
- **HU-010** — Página pública (sin login) donde un cliente final elige
  servicio, staff y horario disponible, y reserva.
  (`feature/hu-010-pagina-publica-reserva`)

## Épica 4 — Dashboard Angular (admin)

- **HU-011** — Login UI en Angular + guard de rutas + interceptor de JWT.
  (`feature/hu-011-login-ui-angular`)
- **HU-012** — Dashboard con vista de calendario/agenda de reservas del día.
  (`feature/hu-012-dashboard-calendario`)
- **HU-013** — Pantallas CRUD (servicios, staff, clientes) consumiendo la API.
  (`feature/hu-013-cruds-ui`)

## Épica 5 — Notificaciones

- **HU-014** — Email de confirmación al crear una reserva.
  (`feature/hu-014-email-confirmacion`)
- **HU-015** — Recordatorio automático 24h antes (cron job en NestJS).
  (`feature/hu-015-recordatorio-cron`)

## Épica 6 — Monetización (fase avanzada, lo que la hace "vendible")

- **HU-016** — Checkout de Stripe para la suscripción mensual del negocio.
  (`feature/hu-016-stripe-suscripcion`)
- **HU-017** — Webhook de Stripe que activa/desactiva el tenant según el
  estado del pago.
  (`feature/hu-017-stripe-webhook`)

## Épica 7 — Calidad y despliegue

- **HU-018** — Tests unitarios + e2e clave del backend (auth, bookings).
  (`feature/hu-018-tests-backend`)
- **HU-019** — CI en GitHub Actions (lint + test en cada PR).
  (`feature/hu-019-ci-github-actions`)
- **HU-020** — Deploy: backend (Railway/Render) + frontend (Vercel/Netlify).
  (`feature/hu-020-deploy`)

---

Este backlog es vivo: a medida que avancemos puede haber HUs que se dividan,
se reordenen, o se agreguen (ej. portal del cliente final, reportes,
multi-idioma). Cualquier cambio grande al backlog te lo explico antes de
aplicarlo.
