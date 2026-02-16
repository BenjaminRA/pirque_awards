# Notas de Desarrollo - Pirque Awards 2026

## Estructura del Proyecto

```
pirque_awards/
├── app/
│   ├── layout.tsx          # Layout principal con metadata
│   ├── page.tsx             # Página principal con lógica de flujo
│   └── globals.css          # Estilos globales
├── components/
│   ├── WelcomeScreen.tsx    # Pantalla inicial
│   ├── VoterSelection.tsx   # Selección de votante
│   ├── CategoryVoting.tsx   # Votación por categoría
│   ├── ThankYouScreen.tsx   # Pantalla de agradecimiento
│   └── Autocomplete.tsx     # Componente de autocompletado reutilizable
├── types/
│   └── index.ts             # Definiciones de tipos TypeScript
└── .env.local               # Variables de entorno (no committed)
```

## Flujo de Estados

La aplicación maneja 4 estados principales:

1. **welcome**: Pantalla de bienvenida
2. **voter**: Selección del votante
3. **voting**: Proceso de votación por categorías
4. **thanks**: Pantalla de agradecimiento

## Configuración de Strapi

### Modelo: Voter (Votante)
- id: Number
- name: String

### Modelo: Category (Categoría)
- id: Number
- title: String
- image: Media (Single)

### Modelo: Candidate (Candidato)
- id: Number
- name: String
- category: Relation (Many to One con Category)

### Modelo: Vote (Voto)
- voterId: Number
- votes: JSON
  ```json
  [
    {"categoryId": 1, "candidateId": 5},
    {"categoryId": 2, "candidateId": 8}
  ]
  ```

## Personalización del Estilo

Los colores principales están basados en la imagen de referencia:
- Gradiente de fondo: `from-yellow-400 via-orange-500 to-red-500`
- Color primario: Orange (500-600)
- Texto principal: White con drop-shadow

Para cambiar los colores, modifica las clases de Tailwind en cada componente.

## Características Implementadas

✅ Autocompletado para selección de votantes y candidatos
✅ Navegación paso a paso entre categorías
✅ Barra de progreso visual
✅ Botones "Siguiente" y "Atrás"
✅ Validación (no se puede avanzar sin seleccionar)
✅ Imágenes por categoría desde Strapi
✅ Responsive design (mobile y desktop)
✅ Animaciones y transiciones suaves
✅ Reset completo al finalizar

## Mejoras Futuras (Opcionales)

- [ ] Agregar animaciones de transición entre pantallas
- [ ] Implementar modo offline con localStorage
- [ ] Agregar confirmación antes de enviar votos
- [ ] Implementar autenticación para votantes
- [ ] Mostrar preview de todos los votos antes de enviar
- [ ] Agregar sonidos de feedback
- [ ] Implementar temas de color personalizables
- [ ] Agregar estadísticas en tiempo real (admin)

## Pruebas Recomendadas

1. ✅ Verificar que compile sin errores
2. ⚠️  Probar flujo completo con backend Strapi
3. ⚠️  Validar responsive en diferentes dispositivos
4. ⚠️  Probar navegación atrás/siguiente
5. ⚠️  Validar envío de votos al backend
6. ⚠️  Probar reset después de completar votación

## Variables de Entorno

Asegúrate de configurar `.env.local`:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Para producción, cambiar a la URL del servidor Strapi en producción.

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

## Solución de Problemas

### Error: Cannot find module '@/components/...'
- Verificar que existe el archivo tsconfig.json con el alias @/*

### Error: Image optimization
- Asegurarse de que la URL de Strapi esté correctamente configurada
- En next.config.ts, agregar el dominio de Strapi a `images.domains` si es necesario

### Error de CORS
- Configurar CORS en Strapi para permitir peticiones desde localhost:3000
