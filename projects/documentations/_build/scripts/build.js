// build.js
import fs from 'fs/promises';
import path from 'path';

const buildOutputFolderName = `_buildOutput`;


async function cleanAndPrepareDist() {
  const distPath = path.resolve("", buildOutputFolderName);

  try {
    await fs.rm(distPath, { recursive: true, force: true });
    console.log('✅ Outputfolder gelöscht');
  } catch (err) {
    console.error(`⚠️ Fehler beim Löschen von Outputfolder '${buildOutputFolderName}`, err);
  }

  try {
    await fs.mkdir(distPath, { recursive: true });
    console.log('📁 Outputfolder erstellt');
  } catch (err) {
    console.error(`⚠️ Fehler beim Erstellen Outputfolder '${buildOutputFolderName}`, err);
  }

}

cleanAndPrepareDist();