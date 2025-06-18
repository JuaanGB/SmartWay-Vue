<script setup>
    import { ref } from 'vue'

    defineProps(["id", "titulo", "descripcion"])
    let editEnable = ref(true)
    function tareaHecha(event) {
        const tarjeta = event.target.closest("article")
        if (tarjeta.classList.contains("tarea-hecha"))
            tarjeta.classList.remove("tarea-hecha")
        else
            tarjeta.classList.add("tarea-hecha")
        editEnable.value = !editEnable.value;
    }
</script>


<template>
    <article class="p-5 gap-y-4 bg-red-200 p-4 max-w-[400px] rounded-lg shadow-md grid grid-cols-[1fr,auto,auto] grid-rows-[auto,auto] gap-2 items-start">
        <h2 class="text-xl ont-semibold col-span-1 row-start-1 row-end-2" @click="tareaHecha($event)">{{ titulo }}</h2>
        <button :disabled="!editEnable" class="btn btn-sm bg-gray-200 row-start-1 col-start-2 btn rounded-lg shadow-sm">Editar</button>
        <button :disabled="!editEnable" @click="$emit('borrarTarea', id)" class="btn btn-sm bg-gray-200 row-start-1 col-start-3 btn rounded-lg shadow-sm">X</button>
        <p class="col-span-3 row-start-2 text-gray-700 text-wrap">{{ descripcion }}</p>
    </article>
</template>

<style scoped>
h2:hover {
    text-decoration: line-through;
}

article.tarea-hecha h2, article.tarea-hecha p {
    text-decoration: line-through;
    color: gray;
}

button:disabled {
    background-color: black;
}
</style>