<script setup>
    import { ref } from 'vue';
    const titulo = ref('')
    const descripcion = ref('')
</script>

<template>
    <form class="p-5 gap-y-4 bg-red-100 p-4 max-w-[400px] rounded-lg shadow-md flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Nueva tarea</h2>
        <input v-model="titulo" type="text" placeholder="Título de la tarea" class="bg-white rounded-lg border border-width-1 w-full p-2">
        <textarea v-model="descripcion" placeholder="Descripción de la tarea" class="bg-white rounded-lg border border-width-1 w-full p-2"></textarea>
        <button @click.prevent="$emit('anadirTarea', titulo, descripcion)" class="bg-gray-200 p-2 btn rounded-lg shadow-sm">Añadir tarea</button>
    </form>
</template>

<style>

</style>