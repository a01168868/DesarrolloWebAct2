# Segunda entrega práctica

## Integrantes
### Carlos Martínez Rodríguez - A01375577
### Miguel Jesús Torres Cárdenas -  A01168868

</br>

## Para comenzar 

Para arrancar el servicio se debe de correr el comando 

```
npm start
```

Si se desea cambiar el puerto este tomará la variable de entorno que se encuentre asignada a PORT en este caso el puerto asignado es el 8081


La ruta base del servicio es ***http://54.173.202.133*** para cada ruta de ejemplo se tomará esta ruta como como {{base}}

</br>

## Libros

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
| Param    	| Tipo   	| Validación                               	| Requerido 	|
|-------------	|--------	|------------------------------------------	|:---------:	|
| titulo      	| String 	| min 5 caracteres - max 50 caracteres  	|     ✅    	|
| descripcion 	| String 	| min 10 caracteres - max 250 caracteres 	|     ✅    	|
| autor       	| String 	| min 3 caracteres - max 250 caracteres  	|     ✅    	|
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
| Param    	| Tipo   	| Validación                               	| Requerido 	|
|-------------	|--------	|------------------------------------------	|:---------:	|
| titulo      	| String 	| min 5 caracteres - max 50 caracteres  	|     ✅    	|
| descripcion 	| String 	| min 10 caracteres - max 250 caracteres 	|     ✅    	|
| autor       	| String 	| min 3 caracteres - max 250 caracteres  	|     ✅    	|
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
| Param 	| Tipo     	| Validacion                              	| Requerido 	|
|----------	|----------	|-----------------------------------------	|:---------:	|
| titulo   	| String   	| min 5 caracteres - max 50 caracteres  	|     ✅    	|
| autor    	| String   	| min 3 caracteres - max 250 caracteres 	|     ✅    	|
| album    	| String   	|                                         	|           	|
| genero   	| [String] 	|                                         	|           	|
| anio     	| Number   	|                                         	|           	|
| minutos  	| Number   	|                                         	|           	|
| segundos 	| Number   	|                                         	|           	|
</br>

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
| Param 	| Tipo     	| Validacion                              	| Requerido 	|
|----------	|----------	|-----------------------------------------	|:---------:	|
| titulo   	| String   	| min 5 caracteres - max 50 caracteres  	|     ✅    	|
| autor    	| String   	| min 3 caracteres - max 250 caracteres 	|     ✅    	|
| album    	| String   	|                                         	|           	|
| genero   	| [String] 	|                                         	|           	|
| anio     	| Number   	|                                         	|           	|
| minutos  	| Number   	|                                         	|           	|
| segundos 	| Number   	|                                         	|           	|
</br>

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

## Playlists
***
</br>

### Obtener todas las playlists

**`GET` Ruta:** `{{base}}/playlist/`

**Rsponse *JSON***

*Status: 200*
``` json
{
  "PlayLists": [  
    {
      "_id": "6180c2eb9df1fbcb7da39bb8",
      "titulo": "Música para el rato 2",
      "descripcion": "Esta es música para solo un rato",
      "canciones": [
        {
          "_id": "616e05817968f7173d365614",
          "titulo": "Bluebird",
          "descripcion": "De esas canciones que te ponen de buenas",
          "autor": "Alexis Ffrench",
          "genero": [
            "Relax noDjent"
          ],
          "anio": 1998,
          "minutos": 4,
          "segundos": 32,
        }
      ],
      "libros": [
        {
          "_id": "616e0fcd3dcf8dd05e517f34",
          "titulo": "Libro de cultura independiente a lo largo de los años",
          "descripcion": "Esta es una descripción de prueba ",
          "autor": "Miguel Torres",
          "genero": "Literatura subpostmoderna vegetariana",
          "paginas": 234,
          "anio": 2021,
        },
        {
          "_id": "616e10d260f623a12d92ab79",
          "titulo": "Daemon 2",
          "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
          "autor": "Miguel Torres s",
          "genero": "Genero modificado :D",
          "paginas": 32,
          "anio": 1923,
        }
      ],
    }, {}
  ]
}
```

</br>

### Obtener una playlist
**`GET` Ruta:** `{{base}}/playlist/{id playlist}`

**Rsponse *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6180c2eb9df1fbcb7da39bb8",
    "titulo": "Música para el rato 2",
    "descripcion": "Esta es música para solo un rato",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,
      }
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,
      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,
      }
    ],
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna playlist con el id: 6180c2eb9df1fbcb7da39bb8"
}
```

</br>

### Agregar playlist
**`POST` Ruta:** `{{base}}/playlist/`

**Propiedades:**

| Param    	| Tipo       	| Validacion                                  	| Requerido 	|
|-------------	|------------	|---------------------------------------------	|:---------:	|
| titulo      	| String     	| min 5 caracteres - max 50 caracteres      	|     ✅     	|
| descripcion 	| String     	| min 10 caracteres - max 250 caracteres     	|     ✅     	|
| canciones   	| [ObjectId] 	| Debe de ser el _id de una canción existente 	|           	|
| libros      	| [ObjectId] 	| Debe de ser el _id de una libro existente   	|           	|

**Body *JSON***

```json
{
  "titulo": "Música para el rato 2",
  "descripcion": "Esta es música para solo un rato",
  "elementos":[
      {
          "_id":["616df9c1bc51f241c7869426","616e05037968f7173d365610"],
          "tipo":"Canción"
      },
      {
          "_id":["616e10d260f623a12d92ab79","616e0fcd3dcf8dd05e517f34"],
          "tipo":"Libro"
      },
      {
          "_id":["616e05817968f7173d365614"],
          "tipo":"Canción"
      }
  ]
}
``` 

**Response *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6180c5dbff51365862cf3afb",
    "titulo": "Música para el rato 2",
    "descripcion": "Esta es música para solo un rato",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,

      }
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,

      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,

      }
    ],
  }
}
```

*Status: 422 - Bad Request*
Puede ser por falta de alguna validación. Ver la tabla de propiedades.
```json
{
  "message": "La descripcion es requerida"
}
```

</br>

### Actualizar playlist
**`PUT` Ruta:** `{{base}}/playlist/edit/{id playlist}`

**Propiedades:**

| Param    	| Tipo       	| Validacion                                  	| Requerido 	|
|-------------	|------------	|---------------------------------------------	|:---------:	|
| titulo      	| String     	| min 5 caracteres - max 50 caracteres      	|     ✅     	|
| descripcion 	| String     	| min 10 caracteres - max 250 caracteres     	|     ✅     	|
| canciones   	| [ObjectId] 	| Debe de ser el _id de una canción existente 	|           	|
| libros      	| [ObjectId] 	| Debe de ser el _id de una libro existente   	|           	|

**Body *JSON***

```json
{
  "titulo": "The best playlist!!",
  "descripcion": "Música para hacer tarea"
}
``` 

**Response *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6180c2eb9df1fbcb7da39bb8",
    "titulo": "The best playlist!!",
    "descripcion": "Música para hacer tarea",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,
      }
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,
      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,
      }
    ],
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna playlist con el id: 6180c2eb9df1fbcb7da39bb1"
}
```

*Status: 422 - Bad Request*

Puede ser por falta de alguna validación. Ver la tabla de propiedades.
```json
{
  "message": "La descripcion es requerida"
}
```

</br>

### Eliminar playlist
**`DELETE` Ruta:** `{{base}}/playlist/{id playlist}`

**Response *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6180c2eb9df1fbcb7da39bb8",
    "titulo": "The best playlist!!",
    "descripcion": "Música para hacer tarea",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,
      }
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,
      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,
      }
    ],
  }
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna playlist con el id: 6180c2eb9df1fbcb7da39bb1"
}
```

</br>

### Agregar elementos a playlist

**`POST` Ruta:** `{{base}}/playlist/{id playlist}/add`

**Propiedades**
| Param             	| Tipo     	| Validacion                           	| Requerido 	|
|-------------------	|----------	|--------------------------------------	|:---------:	|
| elementos         	| [Object] 	| Debe de contener mínimo un elemento  	|     ✅     	|
| elementos[x]._id  	| String   	| _id de documento de mongo            	|     ✅     	|
| elementos[x].tipo 	| String   	| tipo de elemento "canción" o "libro" 	|     ✅     	|

**Body *JSON***

```json
{
  "elementos":[
      {
          "_id":"617f9d79e49e516077293054",
          "tipo":"Canción"
      },
      {
          "_id": "617f9db6e49e51607729305c",
          "tipo":"Libro"
      }
  ]
}
``` 

**Response *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6181ca5a2d2300438b9de6d0",
    "titulo": "Música para el rato 10",
    "descripcion": "Esta es música para solo un rato",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,
      },
      {
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
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,
      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,
      },
      {
        "_id": "617f9db6e49e51607729305c",
        "titulo": "La vuelta al mundo en 80 días",
        "descripcion": "Historia de aventuras",
        "autor": "Julio Verne",
        "genero": "Novela de aventura",
        "paginas": 144,
        "anio": 1872,
      }
    ],
  }
}
```

*Status: 400 - Bad Request*
```json
{
  "message": "No se encontraron elementos en el request"
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna playlist con el id: 6180c2eb9df1fbcb7da39bb1"
}
```
</br>

### Quitar elementos de playlist

**`POST` Ruta:** `{{base}}/playlist/{id playlist}/remove`

**Propiedades**
| Param             	| Tipo     	| Validacion                           	| Requerido 	|
|-------------------	|----------	|--------------------------------------	|:---------:	|
| elementos         	| [Object] 	| Debe de contener mínimo un elemento  	|     ✅     	|
| elementos[x]._id  	| String   	| _id de documento de mongo            	|     ✅     	|
| elementos[x].tipo 	| String   	| tipo de elemento "canción" o "libro" 	|     ✅     	|

**Body *JSON***

```json
{
  "elementos":[
      {
          "_id":"617f9d79e49e516077293054",
          "tipo":"Canción"
      },
      {
          "_id": "617f9db6e49e51607729305c",
          "tipo":"Libro"
      }
  ]
}
``` 

**Response *JSON***

*Status: 200*
```json
{
  "entity": {
    "_id": "6181ca5a2d2300438b9de6d0",
    "titulo": "Música para el rato 10",
    "descripcion": "Esta es música para solo un rato",
    "canciones": [
      {
        "_id": "616e05817968f7173d365614",
        "titulo": "Bluebird",
        "descripcion": "De esas canciones que te ponen de buenas",
        "autor": "Alexis Ffrench",
        "genero": [
          "Relax noDjent"
        ],
        "anio": 1998,
        "minutos": 4,
        "segundos": 32,
      }
    ],
    "libros": [
      {
        "_id": "616e0fcd3dcf8dd05e517f34",
        "titulo": "Libro de cultura independiente a lo largo de los años",
        "descripcion": "Esta es una descripción de prueba ",
        "autor": "Miguel Torres",
        "genero": "Literatura subpostmoderna vegetariana",
        "paginas": 234,
        "anio": 2021,
      },
      {
        "_id": "616e10d260f623a12d92ab79",
        "titulo": "Daemon 2",
        "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
        "autor": "Miguel Torres s",
        "genero": "Genero modificado :D",
        "paginas": 32,
        "anio": 1923,
      },
      [
        {
          "_id": "617f9db6e49e51607729305c",
          "titulo": "La vuelta al mundo en 80 días",
          "descripcion": "Historia de aventuras",
          "autor": "Julio Verne",
          "genero": "Novela de aventura",
          "paginas": 144,
          "anio": 1872,
        }
      ]
    ],
  }
}
```

*Status: 400 - Bad Request*
```json
{
  "message": "No se encontraron elementos en el request"
}
```

*Status: 404 - Not Found*
```json
{
  "message": "No se encontró ninguna playlist con el id: 6180c2eb9df1fbcb7da39bb1"
}
```
</br>