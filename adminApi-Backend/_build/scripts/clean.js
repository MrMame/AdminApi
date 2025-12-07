// build.js
import fs from 'fs/promises';
import path from 'path';


async function clean() {
  const distPath = path.resolve("", 'dist');

  try {
    await fs.rm(distPath, { recursive: true, force: true });
    console.log('✅ dist gelöscht');
  } catch (err) {
    console.error('⚠️ Fehler beim Löschen von dist:', err);
  }
}

clean();