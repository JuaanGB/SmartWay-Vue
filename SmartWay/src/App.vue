<script setup>
import { computed, onMounted, ref } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'
import FormularioNuevaTarea from './components/FormularioNuevaTarea.vue';
import Encabezado from './components/Encabezado.vue';
import FormularioFiltrar from './components/FormularioFiltrar.vue';
import LogDeAcciones from './components/LogDeAcciones.vue';
import * as op from './operaciones';

const tarjetas = ref([])
const text = ref();
const log = ref('');
const pendientes = ref(true);
const realizadas = ref(true);
onMounted(() => {
  op.getTareas().then(data => {
    tarjetas.value = data
  })
  op.actualizarLog(log)
})

const tarjetasFiltradas = computed(() => {
  return tarjetas.value.filter(t => {
    const esPendiente = !t.completa
    const esRealizada = t.completa

    const pasaFiltroEstado =
      (pendientes.value && esPendiente) ||
      (realizadas.value && esRealizada)

    const pasaFiltroTexto = !text.value || t.titulo?.toLowerCase().includes(text.value.toLowerCase())

    return pasaFiltroEstado && pasaFiltroTexto
  })
})



function buscarTarea(nuevoTexto) {
  text.value = nuevoTexto
}

function borrarTareaPorId(id) {
  op.eliminarTarea({tareas: tarjetas, log}, {id})
}

function anadirTarea(titulo, descripcion) {
  op.anadirTarea({tareas: tarjetas, log}, {titulo, descripcion})
}

function guardarCambios(id, titulo, desc) {
  const tarea = tarjetas.value.find(t => t.id === id)
  if (tarea) {
    op.editarTarea_PATCH({tareas: tarjetas, log}, {id, tituloNuevo: titulo, descNuevo: desc})
  }
}

function completarTarea(id) {
  op.cambiarEstadoTarea_PATCH({tareas: tarjetas, log}, {id})
}

</script>

<template>
  <header>
    <Encabezado>Anótalo!</Encabezado>
  </header>
  <main class="bg-yellow-100 min-h-screen">
    <section class="p-10 flex flex-col md:flex-row justify-center gap-2">
      <FormularioNuevaTarea @anadir-tarea="(titulo, descripcion) => anadirTarea(titulo, descripcion)"></FormularioNuevaTarea>
      <FormularioFiltrar @buscar-tarea="buscarTarea" 
        v-model:pendientes="pendientes" 
        v-model:realizadas="realizadas"
      ></FormularioFiltrar>
      <LogDeAcciones :texto="log"></LogDeAcciones>
    </section>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-y-6 pb-4 m-2">
      <h2 class="divider col-start-1 col-end-2 md:col-end-3 lg:col-end-4 text-2xl">Lista de tareas</h2>
      <TarjetaTarea 
        @borrar-tarea="(id) => borrarTareaPorId(id)" 
        @guardar-cambios="(id, t, d) => guardarCambios(id, t, d)"
        @completar-tarea="(id) => completarTarea(id)"
        v-for="(tarj, index) in tarjetasFiltradas" 
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
