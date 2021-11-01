# Segunda entrega práctica

## Para comenzar 

Para arrancar el servicio se debe de correr el comando 

```
npm start
```

Si se desea cambiar el puerto este tomará la variable de entorno que se encuentre asignada a PORT


La ruta base del servicio es ***http://54.173.202.133*** para cada ruta de ejemplo se tomará esta ruta como como {{base}}
***
</br>

## Libros
</br>

### Obtener todos los libros
**`GET` Ruta:** `{{base}}/libro/`

*Status: 200*
**Body *JSON***
```json
{
  "Libros": [
    {
      "_id": "616e0fcd3dcf8dd05e517f34",
      "titulo": "Libro de cultura independiente a lo largo de los años",
      "descripcion": "Esta es una descripción de prueba ",
      "autor": "Miguel Torres",
      "genero": "Literatura subpostmoderna vegetariana",
      "paginas": 234,
      "anio": 2021,
    },
  ]
}
```

</br>

### Obtener un solo libro
**`GET` Ruta:** `{{base}}/libro/{id del libro}`

**Body *JSON***
```json
{
  "entity": {
    "_id": "617f42514e91aa517d331e22",
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "paginas": 144,
    "anio": 1872,
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ningún libro con el id: 617f42514e91aa517d331e22"
}
```

</br>

### Agregar un nuevo libro
**`POST` Ruta:** `{{base}}/libro/`

**Propiedades:**
| Sintaxis    	| Tipo   	| Validación                               	| Requerido 	|
|-------------	|--------	|------------------------------------------	|:---------:	|
| titulo      	| String 	| - min 10 caracteres - max 50 caracteres  	|    [x]    	|
| descripcion 	| String 	| - min 10 caracteres - max 250 caracteres 	|    [x]    	|
| autor       	| String 	| - min 3 caracteres - max 250 caracteres  	|    [x]    	|
| genero      	| String 	|                                          	|           	|
| anio        	| Number 	|                                          	|           	|
| paginas     	| Number 	|                                          	|           	|
</br>

**Body *JSON***

```json
{
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "anio": 1872,
    "paginas": 144
}
``` 

**Rsponse *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "617f42514e91aa517d331e22",
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "paginas": 144,
    "anio": 1872,
  }
}
```

</br>

### Actualizar libro
**`PUT` Ruta:** `{{base}}/libro/edit/{id del libro}`

**Propiedades:**
| Sintaxis    	| Tipo   	| Validación                               	| Requerido 	|
|-------------	|--------	|------------------------------------------	|:---------:	|
| titulo      	| String 	| - min 10 caracteres - max 50 caracteres  	|    [x]    	|
| descripcion 	| String 	| - min 10 caracteres - max 250 caracteres 	|    [x]    	|
| autor       	| String 	| - min 3 caracteres - max 250 caracteres  	|    [x]    	|
| genero      	| String 	|                                          	|           	|
| anio        	| Number 	|                                          	|           	|
| paginas     	| Number 	|                                          	|             |  
</br>

**Body *JSON***

```json
{
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "anio": 1872,
    "paginas": 144
}
``` 

**Rsponse *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "617f42514e91aa517d331e22",
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "paginas": 144,
    "anio": 1872,
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ningún libro con el id: 617f42514e91aa517d331e22"
}
```

</br>

### Eliminar un libro
**`DELETE` Ruta:** `{{base}}/libro/{id del libro}`

*Status: 200*
```json
{
  "entity": {
    "_id": "617f42514e91aa517d331e22",
    "titulo": "La vuelta al mundo en 80 días",
    "descripcion": "Historia de aventuras",
    "autor": "Julio Verne",
    "genero": "Novela de aventura",
    "paginas": 144,
    "anio": 1872,
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ningún libro con el id: 617f42514e91aa517d331e22"
}
```

</br>
</br>

## Canciones

***
</br>

### Obtener todas las canciones
**`GET` Ruta:** `{{base}}/cancion/`

*Status: 200*
**Body *JSON***
```json
{
  "Canciones": [
    {
      "_id": "617f9472f1e17b744facd7f8",
      "titulo": "Levels",
      "autor": "Avicii",
      "album": "Levels - Single",
      "genero": [
        "electronica",
        "pop"
      ],
      "anio": 2021,
      "minutos": 4,
      "segundos": 12,
    }
    {}, 
    {},
  ]
}
```

</br>

### Obtener una canción
**`GET` Ruta:** `{{base}}/cancion/{id cancion}`

**Body *JSON***
```json
{
  "entity": {
    "_id": "617f9472f1e17b744facd7f8",
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": [
      "electronica",
      "pop"
    ],
    "anio": 2021,
    "minutos": 4,
    "segundos": 12,
  }
}
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna canción con el id: 617f9472f1e17b744facd7f8"
}
```

</br>

### Agregar una nueva canción
**`POST` Ruta:** `{{base}}/cancion/`

**Propiedades:**


**Body *JSON***

```json
{
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": ["electronica","pop"],
    "anio": 2021,
    "minutos": 4,
    "segundos": 32
}
``` 

**Rsponse *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "617f9d79e49e516077293054",
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": [
      "electronica",
      "pop"
    ],
    "anio": 2021,
    "minutos": 4,
    "segundos": 32,
  }
}
```

</br>

### Actualizar canción
**`PUT` Ruta:** `{{base}}/cancion/edit/{id cancion}`

**Propiedades:**


**Body *JSON***

```json
{
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": ["electronica","pop"],
    "anio": 2021,
    "minutos": 4,
    "segundos": 12
}
``` 

**Rsponse *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "617f9d79e49e516077293054",
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": [
      "electronica",
      "pop"
    ],
    "anio": 2021,
    "minutos": 4,
    "segundos": 12,
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna canción con el id: 617f9d79e49e516077293054"
}
```

</br>

### Eliminar canción
**`DELETE` Ruta:** `{{base}}/cancion/{id cancion}`

*Status: 200*
```json
{
  "entity": {
    "_id": "617f9d79e49e516077293054",
    "titulo": "Levels",
    "autor": "Avicii",
    "album": "Levels - Single",
    "genero": [
      "electronica",
      "pop"
    ],
    "anio": 2021,
    "minutos": 4,
    "segundos": 12,
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna canción con el id: 617f9d79e49e516077293054"
}
```
***
</br>

## Playlists


