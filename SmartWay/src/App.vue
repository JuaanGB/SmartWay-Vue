<script setup>
import TarjetaTarea from './components/TarjetaTarea.vue'
</script>

<template>
  <main class="flex flex-col gap-2 m-auto">
	<TarjetaTarea titulo="Titulo tarjeta" descripcion="Es una descripcion de la tarea"></TarjetaTarea>
  	<TarjetaTarea titulo="Titulo tarjeta 2" descripcion="Es una descripcion de la tarea más largo para ver si pasa de línea"></TarjetaTarea>
  
  </main>
</template>

<style scoped>


</style>
