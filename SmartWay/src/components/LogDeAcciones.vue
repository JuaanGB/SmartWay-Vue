<script setup>

    defineProps(['texto'])


</script>

<template>

    <div class="p-5 gap-y-4 bg-yellow-300 p-4 w-[400px] rounded-lg shadow-md flex flex-col gap-2">
        <h2 class="text-2xl font-bold">Historial de acciones</h2>
        <textarea disabled="true" class="textarea w-full h-full" :value="texto"></textarea>
    </div>

</template>