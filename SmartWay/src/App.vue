<script setup>
import { computed, onMounted, ref } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'
import FormularioNuevaTarea from './components/FormularioNuevaTarea.vue';
import Encabezado from './components/Encabezado.vue';
import FormularioFiltrar from './components/FormularioFiltrar.vue';
import LogDeAcciones from './components/LogDeAcciones.vue';
import * as op from './operaciones';


const tarjetas = ref([])
onMounted(() => {
  op.getTareas().then(data => {
    tarjetas.value = data
  })
})

const text = ref();
const log = ref('');

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
  if (nuevoTexto)
    log.value += `Has filtrado con título: ${nuevoTexto}\n`
}

function borrarTareaPorId(id) {
  /*
  const t = tarjetas.value.find( t => t.id === id)
  tarjetas.value = tarjetas.value.filter( t => t.id !== id)
  */
  op.eliminarTarea(id, tarjetas)
  console.log(tarjetas)
  log.value += `Tarea '${tarjetas.value.find(t => t.id == id).titulo}' borrada.\n`
}

function anadirTarea(titulo, descripcion) {
  if (!titulo) {
    log.value += `Título necesario al crear una tarea.\n`
    return
  }
  op.anadirTarea(tarjetas)
  log.value += `Nueva tarea '${titulo}' creada.\n`
  /*
  tarjetas.value.push({id: id++, titulo: titulo, descripcion: descripcion})
  log.value += `Nueva tarea '${titulo}' creada.\n`
  */
}

function guardarCambios(id) {
  const tarea = tarjetas.value.find(t => t.id === id)
  if (tarea) {
    op.actualizarTarea(id, tarea.completa, tarjetas)
    /*
    tarea.titulo = titulo
    tarea.descripcion = descripcion
    */
    log.value += `Tarea '${tarea.titulo}' editada.\n`
  }
}

function completarTarea(id) {
  op.cambiarEstadoTarea(tarjetas, id)
}

</script>

<template>
  <header>
    <Encabezado>Anótalo!</Encabezado>
  </header>
  <main class="bg-yellow-100">
    <section class="p-10 flex flex-col lg:flex-row justify-center gap-2">
      <FormularioNuevaTarea @anadir-tarea="(titulo, descripcion) => anadirTarea(titulo, descripcion)"></FormularioNuevaTarea>
      <FormularioFiltrar @buscar-tarea="buscarTarea"></FormularioFiltrar>
      <LogDeAcciones :texto="log"></LogDeAcciones>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-3 justify-center gap-2 pb-4">
      <h2 class="divider col-start-1 col-end-2 md:col-end-4 text-2xl">Lista de tareas</h2>
      <TarjetaTarea 
        @borrar-tarea="(id) => borrarTareaPorId(id)" 
        @guardar-cambios="guardarCambios"
        @completar-tarea="(id) => completarTarea(id)"
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
