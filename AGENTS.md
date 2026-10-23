<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Directrices del Agente

## Stack y restricciones de entorno

- Next.js (App Router), React, JavaScript/JSX, Axios, Zustand y SCSS.
- No instalar dependencias ni modificar `package.json` sin autorización explícita.
- No refactorizar código fuera del alcance de la tarea.
- No crear carpetas, archivos placeholder ni `.gitkeep` vacíos.
- Todos los SCSS deben tener identacion de 2 espacios y no usar `!important`.

## Estructura y organización

- Árbol base:
  ```text
  src/
    app/          # Rutas y layouts
    components/   # Componentes globales compartidos
    helpers/      # Hooks y funciones de utilidad
    services/     # HttpService y AxiosInterceptor
    store/        # Stores de Zustand
    styles/       # Tokens globales, mixins y variables SCSS
  ```
- Componentes en su propia carpeta: `Nombre/Nombre.jsx` y `Nombre/Nombre.scss`. El JSX importa su SCSS vecino.
- Cada vista debe tener su propia carpeta de componentes , solamente debe ir a shared si es un componente que se reutiliza en varias vistas.
- Mantener SCSS puro: no añadir Tailwind, Bootstrap ni librerías de estilos.

## Reglas críticas de ejecución

- Server Components por defecto. Solo usar `"use client"` en la frontera que requiera hooks, eventos o interactividad.
- No acceder a `window`, `document` o `localStorage` durante el render inicial en servidor.
- Peticiones HTTP centralizadas: toda llamada pasa por `src/services/`. Nunca invocar `fetch` o `axios` directamente en componentes ni en stores.
- No quemar URLs ni contratos falsos: usar variables de entorno (`NEXT_PUBLIC_*`) y propagar errores.
- Zustand solo para estado global compartido; estado efímero de UI permanece local (`useState`).
- Leer Zustand fuera de React únicamente mediante `useStore.getState()`.

## Validación

- Comprobar que el código compile ejecutando `npm run lint`
- Al terminar, listar los archivos modificados y los puntos pendientes.

## Despliegue de producción — Gosalvi

- El frontend de Gosalvi se publica desde la rama `master` del repositorio `Racknar0/gosalvi-portal`.
- Para cambios del frontend, ejecuta `u_front_gosavi` con privilegios de administrador del VPS. Debe desplegar únicamente el frontend Gosalvi y reiniciar el proceso PM2 `gosalvi-front`.
- El frontend de producción está en `/opt/gosalvi/front`. Nginx Proxy Manager envía `gosalvi.com` y `www.gosalvi.com` al proceso Next en `172.19.0.1:3200`.
- Los cambios deben estar commiteados y subidos a `master` antes de desplegar. El comando debe desplegar el último commit publicado; no despliegues cambios locales sin publicar.
- No ejecutes `git pull`, compilaciones ni cambios de symlink directamente en `/opt/gosalvi/front`; usa el procedimiento oficial de despliegue para Gosalvi.
- No muestres, sobrescribas ni subas los `.env` de producción.
- No uses comandos, procesos ni rutas de Orbital Ctrl para desplegar Gosalvi.
- El comando `u_back_gosavi` está preparado para `Racknar0/gosalvi_back`, rama `master`, enlace `/opt/gosalvi/back` y proceso exclusivo `gosalvi-back` en `172.19.0.1:3201`. Su instalación no implica que el backend ya esté desplegado. Antes del primer despliegue, preparar la base de datos Gosalvi y `/opt/gosalvi/shared/back/.env.production` y ejecutar `u_back_gosavi --check`; consultar `back/AGENTS.md` en el workspace.
- Si el comando de despliegue o el acceso SSH no está disponible, informa el bloqueo y no simules un despliegue.
