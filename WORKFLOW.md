# Flujo de trabajo diario

## Ramas

- `main`: siempre estable. No se trabaja directo sobre ella.
- Cada historia de usuario (HU) se implementa en su propia rama, con el
  nombre exacto que te indico en `BACKLOG.md` / en la asignación del día:
  `feature/hu-XXX-slug-corto`
- Tareas que no son una HU de producto (setup, configuración, CI):
  `chore/slug-corto`
- Un bug encontrado durante el desarrollo: `fix/slug-corto`

## Commits (Conventional Commits)

```
feat: agrega endpoint de creación de reserva
fix: corrige validación de solapamiento de horarios
chore: configura ESLint y Prettier
docs: agrega README del backend
test: agrega tests unitarios de BookingsService
```

## Flujo por historia de usuario

1. Te doy la HU del día + la rama a crear (ej: `feature/hu-002-login-jwt`).
2. Creas la rama desde `main` actualizado:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/hu-002-login-jwt
   ```
3. Implementas la HU, haciendo commits pequeños y descriptivos.
4. Subes la rama:
   ```bash
   git push -u origin feature/hu-002-login-jwt
   ```
5. Abres un Pull Request hacia `main` en GitHub (aunque trabajes solo, esto
   simula el flujo real de equipo y deja historial claro).
6. Me dices "ya subí el cambio de la HU-002" (o similar). Yo reviso el diff/PR,
   te doy feedback si algo falta, y si está OK, marcamos la HU como
   `hecha` en `STATUS.md` y seguimos con la siguiente.
7. Haces merge del PR a `main`.

## Check-in diario (8am)

Cada día te doy:

- Qué quedó pendiente/en revisión de ayer (si algo).
- La historia de usuario de hoy (criterios de aceptación incluidos).
- El nombre exacto de la rama a crear.
- Cualquier nota técnica relevante (librerías sugeridas, cuidado con X).

Si un día no llegas a terminar la HU, no pasa nada: al día siguiente seguimos
con la misma HU, no se pierde el hilo.
