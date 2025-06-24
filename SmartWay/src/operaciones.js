const uri = 'http://localhost:5165/api/TodoItems'

export async function getTareas() {
    return fetch(uri)
        .then( r => r.json())
        .catch( error => console.log("Error al obtener las tareas", error))
}

/* POST: devuelve en el cuerpo la nueva tarea.
No hace falta hacer GET a la API porque las podemos ir añadiendo conforme nos dan respuestas 204. */
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
    .then(data => tareas.value.push(data)) /* Para que se actualice con las nuevas tareas de la bbdd */
    .catch(error => console.error('Unable to add item.', error));
}

/* Podemos hacer un filter para que se sincronice con el backend */
export function eliminarTarea(id, tareas) {
    fetch(`${uri}/${id}`, {
        method: "DELETE"
    })
    .catch(error => console.error('Unable to delete item.', error));

    tareas.value = tareas.value.filter(t => t.id !== id)
}

/* Modificamos la tarea manualmente en la lista de tareas. */
export function actualizarTarea(id, completa, tareas) {
    const tituloNuevo = document.getElementById('editar-titulo-'+id).value
    const descNuevo = document.getElementById('editar-descripcion-'+id).value
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
    .catch(error => console.error('Unable to update item.', error));

    tareas.value.forEach(t => {
        if (t.id == id) {
            t.titulo = tituloNuevo
            t.descripcion = descNuevo
        }
    });
 
}

export function cambiarEstadoTarea(tareas, id) {
    const tarea = tareas.value.find(t => t.id === id)
    if (!tarea) return

    tarea.completa = !tarea.completa

    fetch(`${uri}/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })
    .catch(error => console.error('Unable to update item.', error));
}
