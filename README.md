# Carentell

Marketplace de venta y alquiler de vehículos construido con Angular.

**Demo:** https://kristerch65.github.io/CarentellFrontend/

> La demo usa datos de ejemplo en lugar de la API real. Puedes iniciar sesión con cualquier usuario y contraseña.

## Funcionalidades

- Búsqueda de vehículos por marca, modelo, año o color, y filtros por categoría
- Listados de autos en venta y en alquiler, con detalle, galería de fotos y datos del vendedor
- Registro e inicio de sesión con JWT
- Perfil de usuario, publicación de vehículos con fotos y listado de "Mis vehículos"
- Reserva de citas para probar un vehículo
- Planes de suscripción mensual y formulario de pago

## Tecnologías

Angular 14 · TypeScript · RxJS · Bootstrap · ng-bootstrap · angular-calendar · ngx-toastr · SweetAlert2

## Ejecutar localmente

```bash
npm install
npm start                                # usa la API en https://localhost:44395/api/
npx ng serve --configuration demo        # usa los datos de ejemplo, sin backend
```

Abre http://localhost:4200 (en modo demo: http://localhost:4200/CarentellFrontend/).

## Modo demo

Con `environment.demo = true`, el interceptor [`DemoApiInterceptor`](src/app/core/interceptors/demo-api.interceptor.ts) responde las llamadas a la API con los datos de [`demo-data.ts`](src/app/core/demo/demo-data.ts). El workflow [`deploy-demo.yml`](.github/workflows/deploy-demo.yml) compila esta versión y la publica en GitHub Pages en cada push a `master`.
