<script setup>
import { computed, ref, watch } from 'vue';
import TarjetaTarea from './components/TarjetaTarea.vue'

const tarjetas = ref([
  {titulo: "Titulo tarjeta 1", descripcion: "descripcion 1"},
  {titulo: "Titulo tarjeta 2", descripcion: "descripcion segunda tarjeta"},
  {titulo: "x", descripcion: "x"}
])

const text = ref('');
const log = ref('Log de acciones: <br>');

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
  log.value += "Has filtrado con título: " + text.value + "<br>"; /* Cambiar por objeto no reactivo (crear copia de string) */
})

</script>

<template>
  <main class="flex flex-col gap-2 m-auto">
    <input v-model.trim="text" type="text" placeholder="Busca por título" class="bg-gray-200">
    <p>Buscando tarjetas con titulo: {{ text }}</p>
    <TarjetaTarea v-for="(tarj, index) in tarjetasFiltradasTitulo" :titulo="tarj.titulo" :descripcion="tarj.descripcion" :key="index"></TarjetaTarea>
  </main>
  <span id="log" class="bg-gray-200" v-html="log"></span>
</template>

<style scoped>


</style>
