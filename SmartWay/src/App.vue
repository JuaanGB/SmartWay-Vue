<script setup>
import { computed, ref, watch } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'
import FormularioNuevaTarea from './components/FormularioNuevaTarea.vue';

let id=1
const tarjetas = ref([
  {id: id++, titulo: "Titulo tarjeta 1", descripcion: "descripcion 1", completa: false},
  {id: id++, titulo: "Titulo tarjeta 2", descripcion: "descripcion segunda tarjeta", completa: true},
  {id: id++, titulo: "x", descripcion: "x", completa: false}
])

console.log(tarjetas)

const text = ref('');
const log = ref('Log de acciones: \n');

/* Si quiero usar reverse o sort en algún filtro, cuidadito porque modifican el array original.
Hacer copia:
[...array].reverse() */

const tarjetasFiltradasTitulo = computed( () => {
  return tarjetas.value.filter( (t) => {
    if (text.value) /* Hay texto introducido */
      return t.titulo.includes(text.value);
    return true;
  });
})

watch(text, () => {
  log.value += "Has filtrado con título: " + text.value + "\n"; /* Cambiar por objeto no reactivo (crear copia de string) */
})

function borrarTareaPorId(id) {
  tarjetas.value = tarjetas.value.filter( t => t.id !== id)
  console.log("He borrado la tarjeta con id: " + id);
}

function anadirTarea(titulo, descripcion) {
  tarjetas.value.push({id: id++, titulo: titulo, descripcion: descripcion})
}

function guardarCambios({id, titulo, descripcion}) {
  let tarea = tarjetas.value.find( t => t.id === id)
  if (tarea) {
    tarea.titulo = titulo
    tarea.descripcion = descripcion
  }
}

</script>

<template>
  <main class="flex flex-col gap-2">
    <FormularioNuevaTarea @anadir-tarea="(titulo, descripcion) => anadirTarea(titulo, descripcion)"></FormularioNuevaTarea>
    <input v-model.trim="text" type="text" placeholder="Busca por título" class="bg-gray-200">
    <p>Buscando tarjetas con titulo: {{ text }}</p>
    <TarjetaTarea 
      @borrar-tarea="(id) => borrarTareaPorId(id)" 
      @guardar-cambios="guardarCambios"
      v-for="(tarj, index) in tarjetasFiltradasTitulo" 
      :id="tarj.id" :titulo="tarj.titulo" :descripcion="tarj.descripcion" :key="tarj.id" :completa="tarj.completa"
      :class="{ 'tarea-hecha': tarj.completa}"
    ></TarjetaTarea>
  </main>
  <span id="log" class="bg-gray-200 whitespace-pre-line">{{ log }}</span>
</template>

<style> 
/* A todos los componentes incluidos dentro del componente App podrán utilizar los estilos de <style>
Si quiero estilos privados al componente, emplear <style scoped> */
@import 'tailwindcss';
@plugin 'daisyui';
</style>
