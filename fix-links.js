const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace next-intl/link with our custom AppLink
  if (content.includes("from 'next-intl/link'")) {
    content = content.replace(/from 'next-intl\/link'/g, "from '@/components/ui/AppLink'");
    // Also change the import name from 'Link' to 'AppLink'
    content = content.replace(/import Link from/g, "import AppLink from");
    // Change all <AppLink tags to <AppLink
    content = content.replace(/<AppLink /g, "<AppLink ");
    content = content.replace(/<\/Link>/g, "</AppLink>");
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

console.log('🔍 Swapping next-intl/link for custom AppLink...');
walkDir(path.join(__dirname, 'components'));
walkDir(path.join(__dirname, 'app'));
console.log('🎉 Done!');