// Script para gerar ícones automaticamente
// Execute: node generate-icons.js

const fs = require('fs');

// Função para criar ícone SVG simples
function createIcon(size) {
    const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="${size}" height="${size}" rx="20%" fill="url(#grad)"/>
        <text x="50%" y="35%" font-family="Arial, sans-serif" font-size="${size/6}" fill="white" text-anchor="middle" font-weight="bold">🍽️</text>
        <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="${size/6}" fill="white" text-anchor="middle" font-weight="bold">💪</text>
    </svg>`;
    
    return svg;
}

// Tamanhos necessários
const sizes = [32, 72, 96, 128, 144, 152, 192, 384, 512];

// Gerar ícones
sizes.forEach(size => {
    const svg = createIcon(size);
    fs.writeFileSync(`icon-${size}x${size}.svg`, svg);
    console.log(`✅ Ícone ${size}x${size} criado`);
});

console.log('🎨 Todos os ícones SVG criados!');
console.log('📝 Converta para PNG usando: https://convertio.co/svg-png/'); 