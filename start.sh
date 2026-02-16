#!/bin/bash

# Script de inicio rápido para Pirque Awards 2026

echo "🎉 Pirque Awards 2026 - Inicio Rápido"
echo "======================================"
echo ""

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Verificar si .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚙️  Configurando variables de entorno..."
    cp .env.example .env.local
    echo "✅ Archivo .env.local creado"
    echo "⚠️  IMPORTANTE: Edita .env.local con la URL de tu backend Strapi"
    echo ""
fi

echo "🚀 Iniciando servidor de desarrollo..."
echo ""
echo "La aplicación estará disponible en: http://localhost:3000"
echo "Presiona Ctrl+C para detener el servidor"
echo ""

npm run dev
