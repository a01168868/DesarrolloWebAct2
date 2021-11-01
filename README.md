# Segunda entrega práctica

## Para comenzar 

Para arrancar el servicio se debe de correr el comando 

```
npm start
```

Si se desea cambiar el puerto este tomará la variable de entorno que se encuentre asignada a PORT


La ruta base del servicio es *** Ruta base *** para cada ruta de ejemplo se tomará esta ruta como como {baseRoute}

## Libros

#### Obtener todos los libros
**GET Ruta:** *{baseRoute}/libro/*

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


#### Obtener un solo libro
**GET Ruta:** *{baseRoute}/libro/{id del libro}*

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

#### Agregar un nuevo libro libro
**POST Ruta:** *{baseRoute}/libro/*

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

#### Actualizar libro
**POST Ruta:** *{baseRoute}/libro/edit/{id del libro}*

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

#### Eliminar un libro
**DELETE Ruta:** *{baseRoute}/libro/{id del libro}*

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
## Playlists


## Canciones

Crear canciones

