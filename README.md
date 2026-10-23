# Frontend de Gosalvi

Portal de Salvi con Next.js App Router, React, Axios, Zustand y SCSS.

## Estructura inicial

- `src/app`: raíz de rutas de Next.js y layout global.
- `src/assets`: recursos del frontend, cuando se agreguen.
- `src/helpers`: utilidades compartidas, inicialmente vacía.
- `src/services`: servicios HTTP e interceptor Axios, conservados del boilerplate.
- `src/store`: stores Zustand, conservados del boilerplate.
- `src/styles`: estilos globales y tokens tipográficos.
- `public`: assets públicos, inicialmente vacío.

Las vistas, componentes y datos de demostración del boilerplate se retiraron para comenzar el producto desde cero. La interfaz pública usa Nunito para texto y Quicksand para títulos y controles, servidas de forma local por `next/font` durante la compilación.

## Acceso

- `/crear-cuenta`: registro de clientes, verificación de correo y QR de ejemplo; la app aún no está publicada. No inicia sesión web.
- `/socios/registro`: registro de negocios y cuenta de su representante.
- `/socios/login` y `/socios/panel`: acceso y panel inicial del negocio.
- `/admin/login` y `/admin`: administración de usuarios, protegida también por la API.
- `/recuperar-password`, `/restablecer-password`, `/verificar-correo` y `/reenviar-verificacion`: flujos de correo.

Con `NEXT_PUBLIC_BACK_HOST` vacío, Next envía `/api/*` al backend privado. En
desarrollo usa 127.0.0.1:4000; en producción, 172.19.0.1:3201. Se puede configurar
`BACKEND_INTERNAL_URL` en el servidor. Las peticiones pasan por `src/services`.
El JWT se conserva en memoria y sessionStorage de la pestaña; la API comprueba
permisos y estado de cuenta en cada petición. Los textos usan diccionarios AR/CO.

El selector detecta el país por IP en la primera visita mediante `/api/country`.
La elección guardada en `salvi-country` siempre tiene prioridad, incluso si se
cambia mientras llega la detección. Sin detección válida, utiliza Argentina.

Validación: `npm run lint` y `npm run build`. El correo SMTP se configura en el backend.
