# Tiendita

Mini módulo de e-commerce que permite ver un listado de productos, consultar el detalle de cada uno y gestionar un carrito de compra con checkout simulado. Los productos se obtienen de la API pública [Fake Store API](https://fakestoreapi.com/).

## Demo

Desplegado en AWS (S3 + CloudFront): https://dz5jyzia5ohqd.cloudfront.net/
(Modo movil y web)

## Tecnologías

- **React 19** + **TypeScript**
- **Vite** como bundler y dev server
- **HeroUI** + **Tailwind CSS** para la interfaz y los estilos
- **Zustand** para el manejo de estado (carrito y productos) con persistencia en `localStorage`
- **Axios** para el consumo de la API
- **Zod** para validar las respuestas de la API y tipar los datos
- **React Router** para la navegación entre pantallas

## Funcionalidades

- Listado de productos (imagen, título, precio y categoría) con búsqueda por nombre y filtro por categoría
- Pantalla de detalle con descripción completa
- Carrito: aumentar/disminuir cantidad, eliminar productos, total de artículos y precio total
- Checkout simulado con resumen de compra que limpia el carrito al confirmar
- Indicador de carga, manejo de errores con opción de reintento y cache en estado para evitar llamadas innecesarias
- Persistencia del carrito entre recargas

## Requisitos

- Node.js 18 o superior
- npm

## Cómo levantar el proyecto

Instalar dependencias:

```bash
npm install
```

Levantar el entorno de desarrollo:

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Scripts

- `npm run dev` — servidor de desarrollo con HMR
- `npm run build` — build de producción en la carpeta `dist/`
- `npm run preview` — sirve localmente el build de producción
- `npm run lint` — análisis estático con Oxlint

## Estructura

```
src/
  api/         cliente de axios y llamadas a la API
  components/  componentes de interfaz reutilizables
  hooks/       lógica de negocio (productos, detalle y carrito)
  pages/       vistas (listado, detalle y carrito)
  store/       estado global con Zustand
  types/       esquemas de Zod y tipos
  utils/       utilidades (formato de precios)
```
