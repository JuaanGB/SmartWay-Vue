<script setup>
    import { ref } from 'vue';
    const titulo = ref('')
    const descripcion = ref('')

    const emit = defineEmits(['anadirTarea'])

    function anadirTarea() {
        emit('anadirTarea', titulo.value, descripcion.value)
        titulo.value = ''
        descripcion.value = ''
    }

</script>

<template>
    <form class="p-5 gap-y-4 bg-yellow-300 p-4 w-full rounded-lg shadow-md flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Nueva tarea</h2>
        <input id="anadir-titulo" v-model="titulo" type="text" placeholder="Título de la tarea" class="input w-full">
        <textarea id="anadir-descripcion" v-model="descripcion" placeholder="Descripción de la tarea" class="textarea w-full"></textarea>
        <button @click.prevent="anadirTarea" method="POST" class="btn text-lg">Añadir tarea</button>
    </form>
</template>

<style>

</style>