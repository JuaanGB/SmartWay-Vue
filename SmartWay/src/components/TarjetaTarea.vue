<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps({
        tarea: {
            type: Object,
            default: {
                titulo: "Titulo",
                descripcion: "Descripcion",
                completa: false,
                id: -1
            }
        }
    })

    let id = props.tarea.id
    let titulo = ref(props.tarea.titulo)
    let descripcion = ref(props.tarea.descripcion)
    let completa = ref(!props.tarea.completa)

    let editMode = ref(false)

    function tareaHecha(event) {
        const tarjeta = event.target.closest("article")
        if (tarjeta.classList.contains("tarea-hecha"))
            tarjeta.classList.remove("tarea-hecha")
        else
            tarjeta.classList.add("tarea-hecha")
        completa.value = !completa.value;
    }

    function activarEdicion() {
        editMode.value = !editMode.value;
    }
</script>


<template>
    <article class="card bg-yellow-300 p-4 shadow-sm w-[400px] m-auto">
        <div class="card-title">
            <h2 v-if="!editMode" @click="tareaHecha($event)">{{ titulo ?? "* No hay título" }}</h2>
            <textarea v-else :disabled="!editMode" :value="titulo" v-model="titulo" class="textarea bg-yellow-100 text-lg font-bold border-1 p-1 w-auto whitespace-break-spaces"></textarea>
            <button class="btn btn-sm btn-circle text-xl ml-auto mb-auto shadow-sm"
                :disabled="!completa"
                @click="activarEdicion($event)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125"/></svg>
            </button>
            <button class="btn btn-sm btn-circle text-xl mb-auto shadow-sm"
                @click="console.log(id); $emit('borrarTarea', id)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.088 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/></svg>
            </button>
        </div>
        <div class="card-body p-0 pt-2">
            <p v-if="!editMode">{{ descripcion ?? "* No hay descripción" }}</p>
            <textarea v-else :disabled="!editMode" :value="descripcion" v-model="descripcion" class="textarea bg-yellow-100 border-1 p-1 w-auto"></textarea>
        </div>
        <div class="card-actions">
            <button v-show="editMode" class="btn ml-auto mt-2"
                @click="$emit('guardarCambios', { id, titulo: titulo.value, descripcion: descripcion.value }); editMode=!editMode">Guardar</button>
        </div>
    </article>
</template>

<style scoped>
h2:hover {
    text-decoration: line-through;
}

article.tarea-hecha {
  background-image: url('../assets/posit-arrugado.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


article.tarea-hecha h2, article.tarea-hecha p {
    text-decoration: line-through;
}

article.tarea-hecha h2:hover {
    text-decoration: none;
    color: black;
}

button:disabled {
    background-color: black;
}
</style>