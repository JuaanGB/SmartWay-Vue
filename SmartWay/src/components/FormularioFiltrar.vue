<script setup>
import { ref  } from 'vue';
import { watchDebounced} from '@vueuse/core';

    const emit = defineEmits(['buscarTarea'])

    const texto = ref('')

    watchDebounced(
        texto, 
        (nuevoTexto) => {emit('buscarTarea', nuevoTexto)},
        { debounce: 1000, maxWait: 1000}
    )

</script>


<template>

    <form class="card bg-yellow-300 p-4 w-[400px] shadow-sm">
        <h2 class="text-2xl font-bold pb-2">Buscar tareas</h2>
        <input class="input w-full" placeholder="Titulo de la tarea" v-model="texto">
    </form>

</template>