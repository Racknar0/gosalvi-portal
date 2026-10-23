# Frontend base

Frontend de Orbital Ctrl con Next.js App Router, React, Axios, Zustand y SCSS.

## Estructura inicial

- `src/app`: raíz de rutas de Next.js y layout global.
- `src/assets`: recursos del frontend, cuando se agreguen.
- `src/helpers`: utilidades compartidas, inicialmente vacía.
- `src/services`: servicios HTTP e interceptor Axios, conservados del boilerplate.
- `src/store`: stores Zustand, conservados del boilerplate.
- `src/styles`: estilos globales y tokens tipográficos.
- `public`: assets públicos, inicialmente vacío.

Las vistas, componentes y datos de demostración del boilerplate se retiraron para comenzar el producto desde cero. La interfaz pública usa Nunito para texto y Quicksand para títulos y controles, servidas de forma local por `next/font` durante la compilación.
