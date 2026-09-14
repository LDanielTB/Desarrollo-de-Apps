# Calculadora-Ionic

Aplicación educativa creada con Ionic y Angular. Permite realizar operaciones aritméticas y conserva un historial de los cálculos realizados durante la sesión.

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
cd "Ionic\Calculadora-Ionic"
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

## Funcionalidad

La pantalla principal contiene:

- Dos entradas numéricas.
- Un selector de operación: suma, resta, multiplicación o división.
- Un botón para calcular.
- Un panel con el resultado actual.
- Un historial ordenado desde la operación más reciente.

La división entre cero se representa como `Error` en el historial y como `NaN` en el valor interno del resultado.

## Estructura principal

```text
src/
├── app/
│   ├── home/
│   │   ├── home.page.html   # Formulario de la calculadora
│   │   ├── home.page.scss   # Estilos de la pantalla
│   │   ├── home.page.ts     # Estado y operaciones
│   │   └── home.module.ts
│   ├── app-routing.module.ts
│   └── app.module.ts
├── global.scss              # Estilos globales de Ionic
└── theme/variables.scss     # Variables del tema
```

## Lógica de cálculo

`HomePage` mantiene los valores del formulario mediante `[(ngModel)]`. El método `calcular()` convierte las entradas a número, selecciona la operación mediante `switch`, actualiza `resultado` y agrega una descripción al inicio del arreglo `historial` con `unshift()`.

La interfaz está construida con componentes Ionic como `ion-content`, `ion-item`, `ion-input`, `ion-select` e `ion-button`.
