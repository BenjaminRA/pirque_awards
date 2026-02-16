# Datos de Ejemplo para Strapi

Este archivo contiene ejemplos de datos que puedes usar para configurar tu backend Strapi.

## Collection: Voters (Votantes)

```json
[
  {
    "id": 1,
    "name": "Juan Pérez"
  },
  {
    "id": 2,
    "name": "María González"
  },
  {
    "id": 3,
    "name": "Pedro López"
  },
  {
    "id": 4,
    "name": "Ana Martínez"
  },
  {
    "id": 5,
    "name": "Carlos Rodríguez"
  },
  {
    "id": 6,
    "name": "Laura Fernández"
  }
]
```

## Collection: Categories (Categorías)

```json
[
  {
    "id": 1,
    "title": "El más comilón",
    "image": {
      "url": "/uploads/categoria_comilon.jpg"
    }
  },
  {
    "id": 2,
    "title": "La más comilona",
    "image": {
      "url": "/uploads/categoria_comilona.jpg"
    }
  },
  {
    "id": 3,
    "title": "El más dormilón",
    "image": {
      "url": "/uploads/categoria_dormilon.jpg"
    }
  },
  {
    "id": 4,
    "title": "La más dormilona",
    "image": {
      "url": "/uploads/categoria_dormilona.jpg"
    }
  },
  {
    "id": 5,
    "title": "Mejor acampante (Masculino)",
    "image": {
      "url": "/uploads/categoria_mejor_acampante_m.jpg"
    }
  },
  {
    "id": 6,
    "title": "Mejor acampante (Femenino)",
    "image": {
      "url": "/uploads/categoria_mejor_acampante_f.jpg"
    }
  },
  {
    "id": 7,
    "title": "El más divertido",
    "image": {
      "url": "/uploads/categoria_divertido.jpg"
    }
  },
  {
    "id": 8,
    "title": "La más divertida",
    "image": {
      "url": "/uploads/categoria_divertida.jpg"
    }
  }
]
```

## Collection: Candidates (Candidatos)

Ejemplo de candidatos que pueden ser nominados en cada categoría:

```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Pedro López",
    "categoryId": 1
  },
  {
    "id": 3,
    "name": "Carlos Rodríguez",
    "categoryId": 1
  },
  {
    "id": 4,
    "name": "María González",
    "categoryId": 2
  },
  {
    "id": 5,
    "name": "Ana Martínez",
    "categoryId": 2
  },
  {
    "id": 6,
    "name": "Laura Fernández",
    "categoryId": 2
  }
]
```

## API Routes en Strapi

### 1. GET /api/voters
Configurar en Strapi para retornar:
```json
{
  "data": [
    {"id": 1, "attributes": {"name": "Juan Pérez"}},
    {"id": 2, "attributes": {"name": "María González"}}
  ]
}
```

O simplificado (transformar en controller):
```json
{
  "data": [
    {"id": 1, "name": "Juan Pérez"},
    {"id": 2, "name": "María González"}
  ]
}
```

### 2. GET /api/categories?populate=*
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "El más comilón",
        "image": {
          "data": {
            "attributes": {
              "url": "/uploads/imagen.jpg"
            }
          }
        }
      }
    }
  ]
}
```

### 3. GET /api/categories/:id/candidates
Este endpoint necesita ser creado como custom route en Strapi.

**Archivo: src/api/category/routes/custom-routes.js**
```javascript
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/categories/:id/candidates',
      handler: 'category.getCandidates',
    }
  ]
};
```

**Archivo: src/api/category/controllers/category.js**
```javascript
module.exports = {
  async getCandidates(ctx) {
    const { id } = ctx.params;
    
    const candidates = await strapi.db.query('api::candidate.candidate').findMany({
      where: { category: id },
      select: ['id', 'name'],
    });

    return { data: candidates };
  }
};
```

### 4. POST /api/votes
```json
{
  "data": {
    "voterId": 1,
    "votes": [
      {"categoryId": 1, "candidateId": 5},
      {"categoryId": 2, "candidateId": 8}
    ]
  }
}
```

## Configuración de Permisos en Strapi

Para que la aplicación funcione, necesitas configurar los permisos públicos en Strapi:

1. Ir a **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**
2. Habilitar los siguientes endpoints:
   - **Voter**: `find`
   - **Category**: `find`, `findOne`
   - **Candidate**: `find`
   - **Vote**: `create`

## Notas Importantes

- Las imágenes deben estar en la carpeta `/uploads` de Strapi
- Los IDs se generan automáticamente por Strapi
- Asegúrate de que CORS esté habilitado en Strapi para `http://localhost:3000`
- Las relaciones entre Candidates y Categories deben estar configuradas

## Script SQL para Poblar Base de Datos (Opcional)

Si usas SQLite o PostgreSQL directamente:

```sql
-- Insertar votantes
INSERT INTO voters (name) VALUES 
  ('Juan Pérez'),
  ('María González'),
  ('Pedro López'),
  ('Ana Martínez'),
  ('Carlos Rodríguez'),
  ('Laura Fernández');

-- Insertar categorías
INSERT INTO categories (title) VALUES 
  ('El más comilón'),
  ('La más comilona'),
  ('El más dormilón'),
  ('La más dormilona');
```
