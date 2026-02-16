# Pirque Awards 2026

Plataforma de votación para el campamento bíblico Pirque Awards 2026.

## Características

- 🎯 Selección de votante con autocompletado
- 📊 Votación por categorías con navegación paso a paso
- 🖼️ Imágenes por categoría
- 📱 Diseño responsive
- 🎨 Estilo vibrante con gradientes naranjas/amarillos/rojos

## Requisitos previos

- Node.js 18+ instalado
- Backend Strapi configurado y ejecutándose

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` y configura la URL de tu backend Strapi:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## Desarrollo

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Backend (Strapi)

La aplicación espera los siguientes endpoints en Strapi:

### 1. GET `/api/voters`
Retorna la lista de acampantes que pueden votar.

Respuesta esperada:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Juan Pérez"
    },
    {
      "id": 2,
      "name": "María González"
    }
  ]
}
```

### 2. GET `/api/categories?populate=*`
Retorna todas las categorías con sus imágenes.

Respuesta esperada:
```json
{
  "data": [
    {
      "id": 1,
      "title": "El más comilón",
      "image": "/uploads/categoria1.jpg"
    },
    {
      "id": 2,
      "title": "La más comilona",
      "image": "/uploads/categoria2.jpg"
    }
  ]
}
```

### 3. GET `/api/categories/:id/candidates`
Retorna los candidatos para una categoría específica.

Respuesta esperada:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Pedro López"
    },
    {
      "id": 2,
      "name": "Ana Martínez"
    }
  ]
}
```

### 4. POST `/api/votes`
Envía los votos del acampante.

Payload enviado:
```json
{
  "data": {
    "voterId": 1,
    "votes": [
      {
        "categoryId": 1,
        "candidateId": 5
      },
      {
        "categoryId": 2,
        "candidateId": 8
      }
    ]
  }
}
```

## Flujo de la aplicación

1. **Pantalla de bienvenida**: El usuario presiona "Empezar Votación"
2. **Selección de votante**: El usuario se identifica seleccionando su nombre
3. **Votación por categorías**: El usuario vota en cada categoría, navegando con botones "Siguiente" y "Atrás"
4. **Pantalla de agradecimiento**: Se muestra al finalizar, con botón "OK" para volver al inicio

Todo el flujo ocurre en una sola página sin subrutas.

## Build

Para crear una versión de producción:

```bash
npm run build
npm start
```

## Tecnologías utilizadas

- Next.js 15
- TypeScript
- Tailwind CSS
- React Hooks

---

Desarrollado para el Campamento Bíblico Pirque Awards 2026

