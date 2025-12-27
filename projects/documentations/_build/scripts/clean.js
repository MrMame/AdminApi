// build.js
import fs from 'fs/promises';
import path from 'path';

const outputFolder = '_buildOutput';

async function clean() {
  const distPath = path.resolve("", outputFolder);

  try {
    await fs.rm(distPath, { recursive: true, force: true });
    console.log(`✅ ${distPath} gelöscht`);
  } catch (err) {
    console.error(`⚠️ Fehler beim Löschen von '${distPath}':`, err);
  }
}

clean();