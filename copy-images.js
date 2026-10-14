const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
const source = path.join(dir, 'p1.jpg');

if (!fs.existsSync(source)) {
  console.error('❌ p1.jpg not found in public/images/');
  process.exit(1);
}

const targets = [
  'hero-laptop.jpg',
  'blog-1.jpg', 'blog-2.jpg', 'blog-3.jpg', 'blog-4.jpg',
  ...Array.from({ length: 34 }, (_, i) => `p${i + 1}.jpg`).filter(f => f !== 'p1.jpg')
];

targets.forEach(file => {
  fs.copyFileSync(source, path.join(dir, file));
});

console.log(`✅ Copied p1.jpg to ${targets.length} files`);