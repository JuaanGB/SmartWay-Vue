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

    <form class="p-5 gap-y-4 bg-yellow-300 p-4 w-[400px] rounded-lg shadow-md flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Buscar tareas</h2>
        <input class="input w-full" placeholder="Titulo de la tarea" v-model="texto">
    </form>

</template>