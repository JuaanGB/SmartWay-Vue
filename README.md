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