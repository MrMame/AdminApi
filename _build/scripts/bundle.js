// build.js
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "projects");
const OUTPUT_DIR = path.join(ROOT, "_monorepo-output");

// Hilfsfunktion: rekursiv kopieren
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function run() {
  console.log("🔍 Sammle _buildOutput Verzeichnisse...");

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error("❌ projects/ Ordner nicht gefunden");
    process.exit(1);
  }

  const subprojects = fs.readdirSync(PROJECTS_DIR);

  for (const project of subprojects) {
    const projectPath = path.join(PROJECTS_DIR, project);
    const buildOutputPath = path.join(projectPath, "_buildOutput");

    if (!fs.statSync(projectPath).isDirectory()) continue;

    if (fs.existsSync(buildOutputPath)) {
      const targetPath = path.join(OUTPUT_DIR, project);

      console.log(`📦 Kopiere ${project}/_buildOutput → _monorepo-output/${project}`);

      copyRecursive(buildOutputPath, targetPath);
    } else {
      console.log(`⚠️ Kein _buildOutput in ${project}`);
    }
  }

  console.log("✅ Fertig!");
}

run();





// // Copy artifacts
// PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_FRONTEND}' artefacts to outputfolder ...`);
// cpSync(DIRNAME_FRONTEND_BUILDOUT,       path.join(outputDir,NAME_FRONTEND),         { recursive: true });
// PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_BACKEND}' artefacts to outputfolder ...`);
// cpSync(DIRNAME_BACKEND_BUILDOUT,        path.join(outputDir,NAME_BACKEND),          { recursive: true });
// PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_DOCUMENTATIONS}' artefacts to outputfolder ...`);
// cpSync(DIRNAME_DOCUMENTATIONS_BUILDOUT, path.join(outputDir,NAME_DOCUMENTATIONS),   { recursive: true });
// PrintBuildLog(BUILD_LOGPATH_MAIN,`✅ Build abgeschlossen. Artefakte liegen in: ${outputDir}`);


function PrintBuildLog(prfx,msg){
    let outPrfx = (prfx==null) ? "" : `[${prfx}] >>>> `;
    let outputMsg = (msg==null) ? "" : msg;
    let output = `${outPrfx}  -  ${outputMsg}`;
    console.log(output);
}