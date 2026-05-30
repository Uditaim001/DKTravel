#!/bin/bash
echo "🌍 WanderLust Travels - Starting Backend..."
cd "$(dirname "$0")/backend"
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi
echo "✅ Backend starting at http://localhost:5000"
echo "🌐 Open frontend/index.html for the website"
echo "🔐 Open admin/admin.html for the admin panel"
npm start
