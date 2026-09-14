# Componentes-Ionic

Catálogo interactivo de componentes de Ionic construido con Angular. La aplicación comienza con un `ion-list` organizado por categorías; cada fila lleva a una página de demostración propia mediante una ruta dinámica.

## Requisitos

- Node.js y npm.
- Ionic CLI.

Comprobar la CLI:

```powershell
ionic --version
```

## Ejecutar el proyecto

Desde la raíz del workspace:

```powershell
cd "Ionic\Componentes-Ionic"
npm install
ionic serve
```

La aplicación se abre normalmente en `http://localhost:8100`.

Para detener el servidor, pulsa `Ctrl + C`.

## Comandos disponibles

```powershell
npm start       # Inicia Angular
npm run build   # Genera la compilación de producción
npm test        # Ejecuta las pruebas
npm run lint    # Revisa el código, si el proyecto tiene lint configurado
```

## Navegación

La ruta raíz redirige a `/home`, que muestra el catálogo. Al seleccionar una fila, Angular navega a:

```text
/componentes/:slug
```

Ejemplos:

```text
/componentes/button
/componentes/input
/componentes/modal
```

La página de detalle lee el parámetro `slug`, busca la configuración del componente y muestra la demostración correspondiente. Si el slug no existe, se utiliza el ejemplo de `Button` como alternativa.

## Componentes incluidos

### Base

`Action Sheet`, `Alert`, `Avatar`, `Badge`, `Button`, `Card`, `Chip`, `Icon`, `Item` y `List`.

### Formularios

`Checkbox`, `Datetime`, `Input`, `Radio`, `Range`, `Searchbar`, `Select`, `Segment` y `Toggle`.

### Feedback y navegación

`Fab`, `Loading`, `Modal`, `Progress Bar`, `Spinner` y `Toast`.

Algunos ejemplos tienen interacción adicional: `Alert`, `Action Sheet` y `Toast` usan controladores de Ionic; `Modal`, `Loading`, `Checkbox`, `Range`, `Select`, `Segment` y `Toggle` modifican su estado desde la interfaz.

## Estructura principal

```text
src/
├── app/
│   ├── home/
│   │   ├── home.page.html   # Catálogo e ion-list de navegación
│   │   ├── home.page.scss   # Estilos del listado
│   │   ├── home.page.ts     # Categorías y enlaces
│   │   └── home.module.ts
│   ├── component-detail/
│   │   ├── component-detail.page.html  # Vista de demostraciones
│   │   ├── component-detail.page.scss  # Estilos de detalle
│   │   ├── component-detail.page.ts    # Ejemplos y acciones
│   │   ├── component-detail.module.ts
│   │   └── component-detail-routing.module.ts
│   ├── app-routing.module.ts            # Rutas home y detalle
│   └── app.module.ts
├── global.scss                          # Estilos y fondo global
└── theme/variables.scss                 # Paleta de Ionic
```

## Cómo añadir un componente

1. Agrega una entrada al arreglo `grupos` de `home.page.ts` con el formato:

   ```ts
   ['mi-slug', 'Mi componente', 'Descripción breve']
   ```

2. Agrega la configuración del mismo slug en `examples` de `component-detail.page.ts`.
3. Añade un bloque `*ngSwitchCase="'mi-slug'"` en `component-detail.page.html`.
4. Compila el proyecto para comprobar la plantilla:

   ```powershell
   npm run build
   ```

## Tema visual

La paleta está definida en `src/theme/variables.scss`:

- Naranja: `#F9B872`.
- Amarillo suave: `#FAE7A5`.
- Azul polvo: `#B6E1E7`.

El tema se aplica con variables CSS de Ionic, por lo que los botones, iconos y controles pueden reutilizar los colores globales sin repetir valores en cada componente.
