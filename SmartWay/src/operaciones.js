const uri_todo = 'http://localhost:5165/api/TodoItems'
const uri_log = 'http://localhost:5165/api/Log'

export async function getTareas() {
    return fetch(uri_todo)
        .then( r => r.json())
        .catch( error => console.log("Error al obtener las tareas", error))
}

/* POST: devuelve en el cuerpo la nueva tarea.
No hace falta hacer GET a la API porque las podemos ir añadiendo conforme nos dan respuestas 204. */
export function anadirTarea(tareas, logTxt) {
    const titulo = document.getElementById("anadir-titulo").value;
    const descripcion = document.getElementById("anadir-descripcion").value;

    const tarea = {
        completa: false,
        titulo: titulo.trim(),
        descripcion: descripcion.trim()
    };
    console.log(tarea)

    fetch(uri_todo, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })
    .then(() => actualizarLog(logTxt))
    .then(r => r.json())
    .then(data => tareas.value.push(data)) /* Para que se actualice con las nuevas tareas de la bbdd */
    .catch(error => console.error('Unable to add item.', error));
}

/* Podemos hacer un filter para que se sincronice con el backend */
export function eliminarTarea(tareas, logTxt, id) {
    fetch(`${uri_todo}/${id}`, {
        method: "DELETE"
    })
    .then(() => actualizarLog(logTxt))
    .catch(error => console.error('Unable to delete item.', error));

    tareas.value = tareas.value.filter(t => t.id !== id)
}

/* Modificamos la tarea manualmente en la lista de tareas. */
export function actualizarTarea(id, completa, tareas) {
    const tituloNuevo = document.getElementById('editar-titulo-'+id).value.trim()
    const descNuevo = document.getElementById('editar-descripcion-'+id).value.trim()
    const item = {
        id: id, 
        completa: completa,
        titulo: tituloNuevo,
        descripcion: descNuevo
    }

    fetch(`${uri_todo}/${id}`, {
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

export function editarTarea_PATCH(tareas, logTxt, id) {

    // Obtenemos valores
    const tituloNuevo = document.getElementById('editar-titulo-'+id).value
    const descNuevo = document.getElementById('editar-descripcion-'+id).value
    const item = { // Sólo propiedades que se van a modificar (PATCH)
        titulo: tituloNuevo,
        descripcion: descNuevo
    }

    // Realizamos petición
    fetch(`${uri_todo}/${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(() => actualizarLog(logTxt))
    .catch(error => console.error('Unable to update item.', error));

    // Cambiamos también en la lista original para hacer los cambios reactivos y evitar llamada a la API para obtenerlas
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

    fetch(`${uri_todo}/${id}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
    })
    .catch(error => console.error('Unable to update item.', error));
}

export function cambiarEstadoTarea_PATCH(tareas, logTxt, id) {
    const tarea = tareas.value.find(t => t.id === id)
    if (!tarea) return

    const body = {
        completa: !tarea.completa
    }
    tarea.completa = !tarea.completa

    fetch(`${uri_todo}/${id}`, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(() => actualizarLog(logTxt))
    .catch(error => console.error('Unable to update item.', error));

}

export function actualizarLog(log) {
    fetch(`${uri_log}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(newLog => log.value = newLog.join(''))
    .catch(error => console.error('Unable to get log info.', error));
}
