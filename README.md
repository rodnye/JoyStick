# JoyStick
Librería para implementar un joystick con canvas en javascript y html.
El JoyStick usa los eventos ontouch de html, por lo que no funcionará si el navegador usado no tiene soporte.
Puedes ver un ejemplo en código [aquí](https://github.com/RodnyE/JoyStick/blob/main/example.html)


## Primeros pasos
Antes que nada añada el script de la librería a su proyecto.
```html
<script src="/joystick.min.js"></script>
```

Usted debería haber creado un elemento <div> con un ancho y alto en el cual se insertará el joystick
```html
<div id="joy" style="width:150px; height:150px"></div>
```
El joystick tomará las dimensiones de su contenedor padre, por eso es necesario estos valores en el div.

## ¿Cómo usar la librería?
Es muy fácil de implementar, simplemente llame al contructor de la clase JoyStick y añada como parámetro el contenedor.
```javascript
let container = document.getElementById("joy");
let joy = new JoyStick(container);
```

Opcionalmente puedes añadir un objeto de opciones para personalizar el joystick.
```javascript
let container = document.getElementById("joy");
let joy = new JoyStick(container, {
  fillStyle: "#ff0000",
  strokeStyle: "#ff0000",
});
```

Puede obtener la posición de la palanca mediante las propiedades `x` y `y` en fracción (-1 a 1):
```javascript
joy.x
joy.y
```

## Constructor
`new JoyStick(container, options)`
| `container` | `HTMLDivElement` | (requerido) el elemento div donde se insertará el joystick |
| `options` | `Object` | (opcional) algunos ajustes extras |
| `options.fillStyle` | `color` | color de relleno de la palanca |
| `options.strokeStyle` | `color` | color del borde del joystick |
| `options.eventArea` | `HTMLDivElement` | elemento donde ocurrirán los eventos ontouch del joystick (por defecto es el elemento contenedor) |


## Propiedades
| `x` | `number` | Fracción de -1 a 1 de la posición de la palanca en el eje "x" |
| `y` | `number` | Fracción de -1 a 1 de la posición de la palanca en el eje "y" |
| `s` | `number` | Fracción de 0 a 1 indicando la distancia entre la palanca y el centro del joystick |
| `pressed` | `boolean` | Indica si el joystick está siendo usado o no |
| `container` | `HTMLDivElement` | El contenedor en el que se encuentra el canvas |
| `canvas` | `HTMLCanvasElement` | El canvas en el que se dibuja el joystick |
| `context` | `CanvasRenderingContext2D` | El contexto usado del canvas |
