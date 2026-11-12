// Генерация иконок Android из logo.svg (используется в GitHub Actions)
const sharp = require('sharp');
const fs = require('fs');
const sizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };

(async () => {
  for (const [d, s] of Object.entries(sizes)) {
    const dir = 'android/app/src/main/res/mipmap-' + d;
    fs.mkdirSync(dir, { recursive: true });
    await sharp('logo.svg', { density: 400 }).resize(s, s).png().toFile(dir + '/ic_launcher.png');
    fs.copyFileSync(dir + '/ic_launcher.png', dir + '/ic_launcher_round.png');
  }
  // убираем adaptive-иконки, чтобы Android брал наши
  fs.rmSync('android/app/src/main/res/mipmap-anydpi-v26', { recursive: true, force: true });
  console.log('Icons generated from logo.svg');
})().catch(e => { console.error(e); process.exit(1); });
