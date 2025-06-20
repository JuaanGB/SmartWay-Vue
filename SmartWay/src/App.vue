<script setup>
import { computed, ref, watch } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'
import FormularioNuevaTarea from './components/FormularioNuevaTarea.vue';
import Encabezado from './components/Encabezado.vue';
import FormularioFiltrar from './components/FormularioFiltrar.vue';
import LogDeAcciones from './components/LogDeAcciones.vue';

let id=1
const tarjetas = ref([
  {id: id++, titulo: "Titulo tarjeta 1", descripcion: "descripcion 1", completa: false},
  {id: id++, titulo: "Titulo tarjeta 2", descripcion: "descripcion segunda tarjeta", completa: true},
  {id: id++, titulo: "x", descripcion: "x", completa: false},
  {} /* Para probar valores por defecto de defineProps */
])
const text = ref('');
const log = ref('Log de acciones: \n');

/* Si quiero usar reverse o sort en algún filtro, cuidadito porque modifican el array original.
Hacer copia:
[...array].reverse() */

/* Patrón decorador para filtros: Quiero añadir un filtro por completa/no completa además de búsqueda por nombre */

const tarjetasFiltradasTitulo = computed(() => {
  return tarjetas.value.filter(t => {
    return text.value ? t.titulo?.includes(text.value) : true
  })
})

function buscarTarea(nuevoTexto) {
  text.value = nuevoTexto
  log.value += `Has filtrado con título: ${nuevoTexto}\n`
}

function borrarTareaPorId(id) {
  const t = tarjetas.value.find( t => t.id === id)
  tarjetas.value = tarjetas.value.filter( t => t.id !== id)
  log.value += `Tarea '${t.titulo}' borrada.\n`
}

function anadirTarea(titulo, descripcion) {
  tarjetas.value.push({id: id++, titulo: titulo, descripcion: descripcion})
  log.value += `Nueva tarea '${titulo.value}' creada.\n`
}

function guardarCambios({ id, titulo, descripcion }) {
  const tarea = tarjetas.value.find(t => t.id === id)
  if (tarea) {
    log.value += `Tarea '${titulo}' editada.\n`
    tarea.titulo = titulo
    tarea.descripcion = descripcion
  }
}

</script>

<template>
  <header>
    <Encabezado>Anótalo!</Encabezado>
  </header>
  <main class="bg-yellow-100 flex flex-wrap flex-col gap-2">
    <section class="p-10 flex flex-row justify-center gap-2">
      <FormularioNuevaTarea @anadir-tarea="(titulo, descripcion) => anadirTarea(titulo, descripcion)"></FormularioNuevaTarea>
      <FormularioFiltrar @buscar-tarea="buscarTarea"></FormularioFiltrar>
      <LogDeAcciones :texto="log"></LogDeAcciones>
    </section>
    <h2 class="divider text-2xl">Lista de tareas</h2>
    <section class="grid grid-cols-1 md:grid-cols-3 justify-center gap-2">
      <TarjetaTarea 
        @borrar-tarea="(id) => borrarTareaPorId(id)" 
        @guardar-cambios="guardarCambios"
        v-for="(tarj, index) in tarjetasFiltradasTitulo" 
        :tarea="tarj" :key="tarj.id"
        :class="{ 'tarea-hecha': tarj.completa}"
      ></TarjetaTarea>
    </section>
    
  </main>
</template>

<style> 
/* A todos los componentes incluidos dentro del componente App podrán utilizar los estilos de <style>
Si quiero estilos privados al componente, emplear <style scoped> */
@import 'tailwindcss';
@plugin 'daisyui';
</style>
