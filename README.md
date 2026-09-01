# BookFlow

SaaS multi-tenant de reservas y gestión de clientes para negocios de servicios
(peluquerías, spas, consultorios, gimnasios, barberías).

Proyecto de práctica con objetivo real de aprendizaje: NestJS + TypeScript en el
backend, Angular en el frontend, PostgreSQL como base de datos.

## Estructura del monorepo

```
bookflow/
  backend/     -> API NestJS (REST)
  frontend/    -> App Angular (dashboard admin + página pública de reserva)
  docs/
    ARQUITECTURA.md
  BACKLOG.md   -> Épicas e historias de usuario (backlog del producto)
  WORKFLOW.md  -> Reglas de ramas, commits y flujo diario con el "CTO" (Claude)
  STATUS.md    -> Estado actual del sprint (lo mantiene el CTO cada día)
```

## Roles

- **CTO / Tech Lead (Claude):** define arquitectura, mantiene el backlog,
  entrega la historia de usuario del día con su rama correspondiente, revisa
  lo que se sube y actualiza el estado del proyecto.
- **Developer (tú):** implementa cada historia de usuario en su rama, hace
  commits siguiendo la convención de `WORKFLOW.md`, abre el PR y hace merge
  cuando esté validado.

## Stack

- Backend: NestJS, TypeScript, TypeORM, PostgreSQL, JWT (auth), class-validator.
- Frontend: Angular (standalone components), TypeScript, Angular Router,
  Reactive Forms.
- Infra/otros: GitHub (repo + PRs), GitHub Actions (CI, más adelante), Docker
  opcional para Postgres si no usas una instalación local.
