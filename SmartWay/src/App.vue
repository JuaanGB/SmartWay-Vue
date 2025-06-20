<script setup>
import { computed, ref, watch } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'
import FormularioNuevaTarea from './components/FormularioNuevaTarea.vue';
import Encabezado from './components/Encabezado.vue';
import FormularioFiltrar from './components/FormularioFiltrar.vue';
import LogDeAcciones from './components/LogDeAcciones.vue';

let id=1
const tarjetas = ref([
  { id: id++, titulo: "Hacer la compra", descripcion: "Comprar leche, pan, huevos y frutas", completa: false },
  { id: id++, titulo: "Poner una lavadora", descripcion: "Ropa blanca, programa corto", completa: false },
  { id: id++, titulo: "Sacar al perro", descripcion: "Paseo de 20 minutos por el parque", completa: true },
  { id: id++, titulo: "Preparar la comida", descripcion: "Hacer pasta con tomate y atún", completa: false },
  { id: id++, titulo: "Tirar la basura", descripcion: "Contenedor gris y orgánico", completa: true },
  { id: id++, titulo: "Doblar la ropa", descripcion: "La que está encima de la silla", completa: false },
  { id: id++, titulo: "Regar las plantas", descripcion: "Las del balcón y el ficus", completa: false },
  { id: id++, titulo: "Fregar los platos", descripcion: "Después de comer", completa: false },
  { id: id++, titulo: "Pasar la aspiradora", descripcion: "Salón y pasillo", completa: false },
  { id: id++, titulo: "Llamar a mamá", descripcion: "Preguntar cómo está y charlar un rato", completa: false }
])

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
  const t = tarjetas.value.find( t => t.id === id)
  tarjetas.value = tarjetas.value.filter( t => t.id !== id)
  log.value += `Tarea '${t.titulo}' borrada.\n`
}

function anadirTarea(titulo, descripcion) {
  if (!titulo) {
    log.value += `Título necesario al crear una tarea.\n`
    return
  }
  tarjetas.value.push({id: id++, titulo: titulo, descripcion: descripcion})
  log.value += `Nueva tarea '${titulo}' creada.\n`
}

function guardarCambios({ id, titulo, descripcion }) {
  const tarea = tarjetas.value.find(t => t.id === id)
  if (tarea) {
    tarea.titulo = titulo
    tarea.descripcion = descripcion
    log.value += `Tarea '${tarea.titulo}' editada.\n`
  }
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
