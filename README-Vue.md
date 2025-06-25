# SmartWay-Vue

- **Directivas**: Atributos especiales de Vue, denotados por `v-atributo` y aplican comportamiento reactivo en el DOM.
  
  - `v-bind:atributo`: Utilizado para asignar dinámicamente valores a atributos HTML. Forma abreviada: `:atributo`. Por ejemplo: `v-bind:id` -> `:id`.
  
  - Si el atributo tiene el mismo nombre que la variable de JavaScript que contiene el valor, se puede omitir la asignación:  `<div :id></div>`
  
  - Para asignar múltiples atributos, podemos emplear `v-bind:objectoDeAtrib`, donde `objectoDeAtrib` es un objeto en JavaScript que represente múltiples atributos con formato clave-valor.
  
  - Vue soporta JS: `id:"list-${id}"` o `{{ ok ? 'YES' : ' NO' }}`. Solamente pueden contener una expresión. No acepta bloques de código. Para un `return` habrá que usar ternarias como se vio en el ejemplo arriba.
  
  - Es posible llamar a un método de un componente dentro de una expresión. Se llama a cada expresión cada vez que el componente se actualiza.

- Para insertar o eliminar un elemento en función de una expresión podemos usar `v-if:"variable"`. Si `variable` es verdadera, lo insertará.

- Para eventos: `v-on:click:"hazAlgo"` -> `@click:"hazAlgo"`

- **Atributos dinámicos**:  `:[nombreAtributo]="algo"`. Aplica también para eventos: `[nombreEvento]:"hazAlgo"`.
  
  - Hay que evitar nombres de atributos con mayúsculas porque los navegadores fuerzan las minúsculas.

- **Modificadores**: sufijos denotados por un punto. Por ejemplo `@submit.prevent="onSubmit"`.

![directive syntax graph](https://vuejs.org/assets/directive.DtZKvoAo.png)

## Reactividad

### Ref:

- Crear un estado reactivo utilizando `ref(...)`. Devuelve una referencia a un objeto envoltorio, pudiendo acceder al valor con `.value`.

- Son referencias porque Vue almacena una lista de objetos y sus estados. Cuando cambia, dispara el cambio y lo renderiza.

- Vue también detecta cambios en objetos anidados o en arrays.

### Reactive:

- También se puede crear un estado reactivo con `reactive(obj)`. Hace un objeto reactivo por sí mismo. También se convierten a reactivos los objetos anidados. Devuelve un objeto `Proxy` del objeto original. 
  
  - Incluso si volvemos a hacer un `reactive(proxy)`, devolverá la misma instancia `proxy`.

- No puede gestionar tipos primitivos como `string`, `number` o `boolean`.

- Perdemos la reactividad cuando mapeamos los atributos de un objeto a variables o cuando pasamos una propiedad como argumento a una función. Tendríamos que pasar el objeto completo para tener la reactividad en la función.
  
  - Resumido: Perdemos la reactividad cuando hacemos copias de propiedades.

## Desenvoltura (unwrapped)

- Una referencia es desenvuelta cuando se accede o modifica como propiedad de un objeto reactivo.

```javascript
const count = ref(0)
const state = reactive({
 count
})

console.log(state.count) // 5     ← Vue "desenvuelve" el .value por ti
state.count = 10         // ← Vue actualiza count.value = 10
console.log(count.value) // 10    ✅ están sincronizados
```

La desenvoltura sólo ocurre cuando la referencia está contenida dentro de un objeto profundamente reactivo.

- La desenvoltura no ocurre en arrays ni mapas. Se necesita seguir poniendo `.value`.

- En plantillas sólo aplica si la referencia es una propieda de más alto nivel. Yo lo entiendo como que no sea definida dentro de ningún objeto.
  
  - Para arreglarlo, podríamos desestructurar el objeto en variables.

- Sí se desenvuelve si es el último valor evaluado en `{{}}`.

## Computed Properties VS Métodos.

- Los métodos son evaluados cada vez que se renderiza el componente. Las computed properties cuando el estado cambia (se cachean).

## `v-if` VS `v-show`.

- `v-if`: Renderiza o no un componente en función de la veracidaz del valor del atributo. Existen también etiquetas como `v-else-if` y `v-else` para renderizar todo tipo de condicionales.
  
  - Si queremos condicional en un grupo de elementos, podemos agregar el elemento `<template>` dentro de la propia `<template>` del SFC.

- `v-show`: Cambia la visibilidad en función de la veracidad del atributo. Aquí el elemento siempre está renderizado.

## `v-for` para renderizar listas.

- Un atributo `v-for: item in items`, donde `items` es una variable de la sección `<script>`. `item` es el alias para el objeto de la iteración actual.

- Añadir atributo `:key` para poder asegurar la reactividad. Tiene que ser único. Puede ser `index`, que es un alias automático en `v-for: (item, index) in items` o un atributo del objeto.

- También se pueden hacer `for` anidados.

- De nuevo, podría poner el atributo en un elemento `<template>` si necesitase agrupar varios elementos.

- `v-if` se ejecuta antes que `v-for`. Si `v-if` accede al item de iteración de `v-for`, no tiene ámbito por ser evaluado antes.

## Manejar eventos.

- `v-on:evento` abreviado como `@evento`.

- Para acceder al evento, pasarlo como argumento declarado en función flecha o como `$event`.

- **Modificadores**: 
  
  - `.stop`: Evita la propagación de eventos (`event.stopPropagation()`)
  
  - `.prevent`: Detiene el comportamiento por defecto del navegador en ese componente. Por ejemplo, recargar la página en un botón de submit (`event.preventDefault()`)
  
  - `.self`: Sólo llama al manejador si el target es el propio elemento.
  
  - `.capture`:
  
  - `.once`: El manejador sólo se llama una vez. Cuando se llama, se elimina el manejador.
  
  - `.passive`: No llama a `preventDefault()`.

- **Modificadores con teclas**:
  
  - `@keyup` o `@keydown`: Eventos cuando se suelta o se clica una tecla, respectivamente.
  
  - Sus modificadores: `.enter`, `.tab`, `.delete`, `.esc`, etc.
  
  - Combinación de teclas con concatenación de modificadores: `@keyup.ctrl.enter`.
    
    - Modificador `.exact`: Combinación exacta de teclas.
  
  - Botones del ratón: `.left`, `.middle` y `.right`.

## Watchers.

- Cuando cambie una propiedad reactiva, ejecutar una función. A lo mejor el cambio de estado desencadena un cambio como modificar el DOM.

- `watch(sources, function, {...opcion: true/false)`
  
  - `sources`: Puede ser una `ref`, un objeto reactivo (creado con `reactive`), un getter o un array de múltiples fuentes.
  
  - Si las fuentes `sources` se utilizan dentro de la función de callback, podemos gestionar las dependencias de las fuentes automáticamente con `watchEffect(function)`.

- **Diferencias `watch` y `watchEffect`**.
  
  - El primero sólo activa la función callback cuando cambian las fuentes especificadas como argumentos.
  
  - El segundo activa la función callback cuando cualquiera de los elementos reactivos accedidos en la función cambian.

- Si hacemos peticiones asíncronas, puede ser que haya ocurrido un cambio de estado antes de terminar la primera petición. Se lanza otra nueva, pero estamos con una petición obsoleta. Ver [Side-Effect Cleanup](https://vuejs.org/guide/essentials/watchers.html#side-effect-cleanup).

- Opciones para decidir cúando se lanza el efecto colateral `watch`:
  
  - `flush: 'post'`: Ocurre `watch` después de que Vue actualice el estado del componente.
  
  - `flush: 'sync'`: Se lanza síncronamente, antes de que Vue actualice.

- El `watch` se detiene cuando llamas a `unwatch` o cuando se "desmonta" el componente (`unmount`).

## defineProps([...])

- Permite definir los atributos que se pueden establecer desde componentes externos:
  
  - `defineProps(['titulo', 'descripcion'])`: Permite hacer binding de `:titulo` y `:descripcion` desde un componente padre. 