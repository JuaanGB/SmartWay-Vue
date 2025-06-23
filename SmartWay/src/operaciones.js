const uri = 'http://localhost:5165/api/TodoItems'

export function getTareas() {
    fetch(uri)
        .then( r => r.json())
        .catch( error => console.log("Error al obtener las tareas", error))
}

export function anadirTarea(tareas) {
    const titulo = document.getElementById("anadir-titulo").value;
    const descripcion = document.getElementById("anadir-descripcion").value;

    const tarea = {
        completa: false,
        titulo: titulo.trim(),
        descripcion: descripcion.trim()
    };
    console.log(tarea)

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })
    .then(r => r.json())
    .then(() => tareas.value = getTareas()) /* Para que se actualice con las nuevas tareas de la bbdd */
    .catch(error => console.error('Unable to add item.', error));
}

export function eliminarTarea(id, tareas) {
    fetch(`${uri}/${id}`, {
        method: "DELETE"
    })
    .then(() => tareas.value = getTareas())
    .then( () => console.log(tareas.value))
    .catch(error => console.error('Unable to delete item.', error));
}

export function actualizarTarea(id, completa, tareas) {
    const tituloNuevo = document.getElementById('editar-titulo-'+id)
    const descNuevo = document.getElementById('editar-descripcion-'+id)
    const item = {
        id: id, 
        completa: completa,
        titulo: tituloNuevo,
        descripcion: descNuevo
    }

    fetch(`${uri}/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => tareas.value = getTareas())
    .catch(error => console.error('Unable to update item.', error));

    
}