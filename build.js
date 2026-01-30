const fs = require('fs');
const path = require('path');

const dir = __dirname;
const dataPath = path.join(dir, 'index-data.json');
const templatePath = path.join(dir, 'home.template.html');
const outputPath = path.join(dir, 'home.html');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const template = fs.readFileSync(templatePath, 'utf8');

const itemsHtml = data
  .map(({ title, url }, i) => {
    const safeUrl = escapeHtml(url);
    const safeTitle = escapeHtml(title);
    const hrAfter = i < data.length - 1 ? '\n    <hr>' : '';
    return `    <div class="grid-item" onclick="loadSite('${safeUrl}')">
      <button>${safeTitle}</button>
    </div>${hrAfter}`;
  })
  .join('\n');

const html = template.replace('{{ITEMS}}\n', itemsHtml + '\n');
fs.writeFileSync(outputPath, html, 'utf8');

console.log('Built home.html from index-data.json');
