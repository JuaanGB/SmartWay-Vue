<script setup>
import { ref, watch } from 'vue';

    const emit = defineEmits(['buscarTarea'])

    const texto = ref('')

    watch(texto, (nuevoTexto) => {
        emit('buscarTarea', nuevoTexto)
    })

</script>


<template>

    <form class="card bg-yellow-300 p-4 w-[400px] shadow-sm">
        <h2 class="text-2xl font-bold pb-2">Buscar tareas</h2>
        <input class="input w-full"placeholder="Titulo de la tarea" v-model="texto">
    </form>

</template>