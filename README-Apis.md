# API

- No hay porqué quedarse estancado en la implementación simple de los métodos POST, PUT, etc.
- Podemos definir un método POST/PUT que se encargue de crear algo si no existe todavía.
- Es decir, no tenemos que limitar una petición a un único método CRUD, podemos combinarlos para hacer acciones útiles.

## Actualización local VS Petición GET
- Cuando actualizamos un objeto podemos actualizarlo sólo en local pues conocemos los cambios -> sincronización con el backend.
- O podemos pedirle a la API que nos devuelva todos los objetos para tenerlo actualizado.
- Dependerá de si sólo nosotros mandamos peticiones o si lo pueden hacer más usuarios al mismo tiempo.

## Actualización con heurística optimista.
- Actualizo en local y lanzo la petición en segundo plano.
- Con lo que devuelva esa petición, compruebo si lo que actualicé en local fue correcto.
- Si no, deshago cambios.
- Si sí, es tiempo "ahorrado" pues no he tenido que esperar 1RTT para tener la información actualizada.