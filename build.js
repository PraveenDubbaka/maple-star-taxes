#!/usr/bin/env node
// Build script to create a clean deployment folder

const fs = require('fs');
const path = require('path');

const BUILD_DIR = 'dist';
const FILES_TO_COPY = [
    'index.html',
    'styles.css',
    'script.js',
    'MST_Logo.svg',
    'Asset 1.svg',
    'maple_star_taxes_logo.svg',
    'maple_star_taxes_logo_option1.png',
    'Maple_Star_Taxes_vector_logo.svg',
    '.nojekyll'
];

// Clean build directory
if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
}

// Create build directory
fs.mkdirSync(BUILD_DIR, { recursive: true });

// Copy files
console.log('📦 Building deployment package...\n');
FILES_TO_COPY.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(BUILD_DIR, file));
        console.log(`✅ Copied: ${file}`);
    } else {
        console.log(`⚠️  Skipped: ${file} (not found)`);
    }
});

console.log('\n✅ Build complete! Files in ./dist/ ready for deployment.');
console.log('🔒 Security: .env, server.js, and node_modules excluded.\n');
