# GDP-FrontEnd

Front-end para la aplicación de Matenimiento

## Informacion
---

Aplicación diseñada para poder gestionar el mantenimiento. Esta aplicación permite la visualización de Usuarios, con la posibilidad de actualizar la contraseña. Por otro lado, permite la visualización del plan de preventivos, la posibilidad de crear nuevos o borrar los existentes. Por último, la aplicación permite ver las ordenes de trabajo y la posibilidad de filtrarlas. Además, se podrán añadir nuevas ordenes de trabajo para correctivos o preventivos, asignarselos a trabajadores para que estos puedan trabajar en el donde se mostrarán las horas trabajadas y finalizar la orden.

## Desarrollo
---

### Lenguajes:

* Angular

### Desarrollada usando:

* Angular Material
* Bootstrap


### BBDD:

* MSSQL


### Test de la API:

---

### Despliegue:

Para actualizar el proyecto, es necesario guardar todo los cambios, abrir la consola con Ctrl+Ñ y ejecutar el comando `ng build --base-href`, una vez hecho, se creará una carpeta llamada dist en la raíz del proyecto. Dentro de la carpeta front end comprimimos todos los archivos en un .rar para poder llevarlos más facilmente al servidor y copiamos con Ctrl+C la carpeta comprimida. Una vez hecho todo deberemos subir los cambios a Bonobo.

El segundo paso es ir al servidor remoto: 10.73.82.219 en el, deberemos ir a la carpeta `C:\inetpub\wwwroot\GDP` en ella borraremos todo menos la carpeta aspnet_client (guarda en algún lugar los archivos por si acaso requieres volver a ellos), pegaremos nuestro archivo comprimido y lo descomprimiremos. El último paso sería reiniciar el servidor para que los cambios se vean en la página.