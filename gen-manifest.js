// Собирает папку music/ в приложение: копирует файлы в www/music и пишет манифест
const fs = require('fs');
const path = require('path');
fs.mkdirSync('www/music', { recursive: true });
let files = [];
if (fs.existsSync('music')) {
  files = fs.readdirSync('music').filter(f => /\.(mp3|m4a|ogg|wav|flac)$/i.test(f));
  files.forEach(f => fs.copyFileSync(path.join('music', f), path.join('www/music', f)));
}
fs.writeFileSync('www/music-manifest.json', JSON.stringify(files.map(f => ({
  title: f.replace(/\.[^.]+$/, ''),
  artist: 'Моя музыка',
  file: 'music/' + encodeURIComponent(f)
}))));
console.log('Bundled music files: ' + files.length);
