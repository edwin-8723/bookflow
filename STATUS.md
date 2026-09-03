# Estado actual

**Sprint:** 1 — Autenticación y multi-tenancy
**Fecha última actualización:** 2026-09-03

## En progreso

- HU-002: Login con JWT
  - Rama: `feature/hu-002-login-jwt`
  - Estado: asignada, pendiente de ejecución por el developer.

## Hecho

- HU-000: Setup del entorno — repo `bookflow` en GitHub, backend NestJS
  (ESM + Vitest) conectado a PostgreSQL vía TypeORM, frontend Angular
  scaffoldeado. Mergeado a `main` (PR #1).
  - Nota técnica: el servicio local de Postgres (`postgresql-x64-18`) quedó
    en modo de recuperación tras un apagado no limpio de Windows. Si vuelve
    a pasar (error `57P03` / "modo de recuperación" al conectar), abrir
    PowerShell como administrador y correr
    `Restart-Service -Name "postgresql-x64-18" -Force`; si se queda colgado
    deteniendo el servicio, usar `taskkill /F /IM postgres.exe` y luego
    `Start-Service -Name "postgresql-x64-18"`.

- HU-001: Registro de negocio (tenant) + usuario owner — `POST /auth/register`
  crea `Business` + `User(role=owner)` en una transacción, password con
  bcrypt, valida email único. Probado con casos de éxito, duplicado, email
  inválido y password corta. Mergeado a `main` (PR #2).
  - Nota técnica: entidades `Business`/`User` con relación circular (cada una
    referencia a la otra) rompen en runtime bajo ESM + `emitDecoratorMetadata`
    (`Cannot access 'X' before initialization`). Solución: tipar la propiedad
    de relación con el wrapper `Relation<T>` de TypeORM, importado como
    `import { ..., type Relation } from 'typeorm'` (tiene que ser
    `import type`/`type Relation`, si no sale error TS1272 por
    `isolatedModules`). Vamos a necesitar este mismo patrón en las próximas
    entidades relacionadas con `Business` (Service, Staff, Client, Booking).

## Backlog activo (próximas 3)

1. HU-002 — Login con JWT
2. HU-003 — Guard de tenant + roles (owner/staff)
3. HU-004 — CRUD de servicios
