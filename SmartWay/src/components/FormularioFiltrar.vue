<script setup>
import { ref  } from 'vue';
import { watchDebounced} from '@vueuse/core';

    const pendientes = defineModel('pendientes')
    const realizadas = defineModel('realizadas')
    const emit = defineEmits(['buscarTarea'])

    const texto = ref('')

    watchDebounced(
        texto, 
        (nuevoTexto) => {emit('buscarTarea', nuevoTexto)},
        { debounce: 500, maxWait: 1000}
    )

</script>


<template>

    <form class="p-5 gap-y-4 bg-yellow-300 p-4 w-full rounded-lg shadow-md flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Buscar tareas</h2>
        <input class="input w-full" placeholder="Titulo de la tarea" v-model="texto">
        <h2 class="text-2xl font-bold">Filtrar por completitud</h2>
        <div>
            <input type="checkbox" class="checkbox bg-white checked:bg-white" v-model="realizadas">
            <label class="pl-2">Realizadas</label>
        </div>
        <div>
            <input type="checkbox" class="checkbox bg-white checked:bg-white" v-model="pendientes">
            <label class="pl-2">Pendientes</label>
        </div>
        
    </form>

</template>