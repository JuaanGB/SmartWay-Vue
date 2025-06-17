<script setup>
    defineProps(["titulo", "descripcion"])
</script>


<template>
    <article class="p-5 gap-y-4 bg-red-200 p-4 max-w-[400px] rounded-lg shadow-md grid grid-cols-[1fr,auto,auto] grid-rows-[auto,auto] gap-2 items-start">
        <h2 class="text-xl font-semibold col-span-1 row-start-1 row-end-2">{{ titulo }}</h2>
        <button class="btn btn-sm bg-gray-200 row-start-1 col-start-2">Editar</button>
        <button class="btn btn-sm bg-gray-200 row-start-1 col-start-3">X</button>
        <p class="col-span-3 row-start-2 text-gray-700 text-wrap">{{ descripcion }}</p>
    </article>
</template>

<style>
@import 'tailwindcss';
</style>