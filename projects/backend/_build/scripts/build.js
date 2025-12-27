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

  // Beispiel: public kopieren
  const publicPath = path.resolve("", 'public');
  const distPublicTargetPath = path.resolve(distPath, 'public');
  try {
    await fs.cp(publicPath,distPublicTargetPath , { recursive: true });
    console.log('📦 public nach outputfolder kopiert');
  } catch (err) {
    console.error('⚠️ Fehler beim Kopieren von public:', err);
  }
}

cleanAndPrepareDist();