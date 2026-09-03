# Estado actual

**Sprint:** 1 — Autenticación y multi-tenancy
**Fecha última actualización:** 2026-09-01

## En progreso

- HU-001: Registro de negocio (tenant) + usuario owner
  - Rama: `feature/hu-001-registro-tenant`
  - Estado: asignada, pendiente de ejecución por el developer.
  - Pendiente: mergear el PR `chore/initial-setup → main` en GitHub antes de arrancar la rama nueva.

## Hecho

- HU-000: Setup del entorno — repo `bookflow` en GitHub, backend NestJS
  (ESM + Vitest) conectado a PostgreSQL vía TypeORM, frontend Angular
  scaffoldeado. Commits en `chore/initial-setup`, pendiente merge a `main`.
  - Nota técnica: el servicio local de Postgres (`postgresql-x64-18`) quedó
    en modo de recuperación tras un apagado no limpio de Windows. Si vuelve
    a pasar (error `57P03` / "modo de recuperación" al conectar), abrir
    PowerShell como administrador y correr
    `Restart-Service -Name "postgresql-x64-18" -Force`; si se queda colgado
    deteniendo el servicio, usar `taskkill /F /IM postgres.exe` y luego
    `Start-Service -Name "postgresql-x64-18"`.

## Backlog activo (próximas 3)

1. HU-001 — Registro de negocio (tenant) + usuario owner
2. HU-002 — Login con JWT
3. HU-003 — Guard de tenant + roles (owner/staff)
