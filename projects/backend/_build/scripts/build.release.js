// build.js
import fs from 'fs/promises';
import path from 'path';

const buildOutputFolderName = `_buildOutput`;

async function copyToTarget(src,target){
 try {
    await fs.cp(src,target , { recursive: true });
    console.log(`📦 '${src}' nach ${target} kopiert`);
  } catch (err) {
    console.error(`⚠️ Fehler beim Kopieren von ${src}:`, err);
  }
}

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
  const configPath = path.resolve("", 'config');
  const distPublicTargetPath = path.resolve(distPath, 'public');
  const distConfigTargetPath = path.resolve(distPath, 'config');
  
  await copyToTarget(publicPath,distPublicTargetPath);
  await copyToTarget(configPath,distConfigTargetPath);

}

cleanAndPrepareDist();