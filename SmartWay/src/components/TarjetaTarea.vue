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
    const emit = defineEmits(['completarTarea', 'borrarTarea', 'guardarCambios'])


    let tarea = props.tarea
    let id = props.tarea.id

    let editMode = ref(false)
    let tituloEdit = tarea.titulo
    let descripcionEdit = tarea.descripcion

    function tareaHecha(event) {
        const tarjeta = event.target.closest("article")
        tarjeta?.classList.toggle("tarea-hecha")
        /* tarea.completa = !tarea.completa; */
        emit("completarTarea", id)
    }

    function activarEdicion() {
        editMode.value = !editMode.value;
    }

    /** Reiniciar el texto editado de los textarea si no confirmas el cambio */
    watch(editMode, () => {
        tituloEdit = tarea.titulo
        descripcionEdit = tarea.descripcion
    })


</script>


<template>
    <article class="card bg-yellow-300 p-4 shadow-sm mx-auto w-7/8">
        <div class="card-title">
            <h2 v-if="!editMode" @click="tareaHecha($event)">{{ tarea.titulo || "* No hay título" }}</h2>
            <textarea :id="'editar-titulo-'+id" v-else :disabled="!editMode" v-model="tituloEdit" class="textarea bg-yellow-100 text-lg font-bold border-1 p-1 w-auto whitespace-break-spaces"></textarea>
            <button class="btn btn-sm btn-circle text-xl ml-auto mb-auto shadow-sm"
                :disabled="tarea.completa"
                @click="activarEdicion($event)"
            >
                <svg v-show="!editMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125"/></svg>
                <svg v-show="editMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
            </button>
            <button class="btn btn-sm btn-circle text-xl mb-auto shadow-sm"
                @click="emit('borrarTarea', tarea.id)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.088 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0"/></svg>
            </button>
        </div>
        <div class="card-body p-0 pt-2">
            <p v-if="!editMode">{{ tarea.descripcion || "* No hay descripción" }}</p>
            <textarea :id="'editar-descripcion-'+id" v-else :disabled="!editMode" v-model="descripcionEdit" class="textarea bg-yellow-100 border-1 p-1 w-auto"></textarea>
        </div>
        <div class="card-actions">
            <button v-show="editMode" class="btn ml-auto mt-2"
                @click="emit('guardarCambios', tarea.id, tituloEdit, descripcionEdit); editMode=!editMode">Guardar</button>
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