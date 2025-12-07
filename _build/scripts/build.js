// build.js
import { execSync } from "child_process";
import { cpSync, rmSync, mkdirSync } from "fs";
import path from "path";

const buildOutputFolderName = `_buildOutput`;

const rootBuild = process.cwd();
const rootWorkspace = rootBuild;//path.join(rootBuild, "..")
const outputDir = path.join(rootWorkspace, buildOutputFolderName);

const BUILD_LOGPREFIX_SOLUTION = "Main>   ";

const NAME_FRONTEND          = "adminApi-Frontend";
const NAME_BACKEND           = "adminApi-Backend";
const NAME_DOCUMENTATIONS    = "adminApi-Documentations";

const DIRNAME_FRONTEND          = path.join(rootWorkspace, NAME_FRONTEND);
const DIRNAME_BACKEND           = path.join(rootWorkspace, NAME_BACKEND);
const DIRNAME_DOCUMENTATIONS    = path.join(rootWorkspace, NAME_DOCUMENTATIONS);

const DIRNAME_FRONTEND_BUILDOUT         = path.join(DIRNAME_FRONTEND, buildOutputFolderName);
const DIRNAME_BACKEND_BUILDOUT          = path.join(DIRNAME_BACKEND, buildOutputFolderName);
const DIRNAME_DOCUMENTATIONS_BUILDOUT   = path.join(DIRNAME_DOCUMENTATIONS, buildOutputFolderName);

// InfoOutput
PrintBuildLog(`PrintBuild Test ...`);
PrintBuildLog(`Beginne mit Project-Build ...`);
PrintBuildLog(`   DIRNAME_FRONTEND                ='${DIRNAME_FRONTEND}`);
PrintBuildLog(`   DIRNAME_BACKEND_BUILDOUT        ='${DIRNAME_BACKEND_BUILDOUT}'`);
PrintBuildLog(`   DIRNAME_DOCUMENTATIONS_BUILDOUT ='${DIRNAME_DOCUMENTATIONS_BUILDOUT}'`);
PrintBuildLog();
PrintBuildLog();

// Clean output
PrintBuildLog(`Cleaning and Recreate Outputfolder'${outputDir}' ...`);
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir);

// Build subprojects
PrintBuildLog(`Running Build -> '${DIRNAME_BACKEND}' ...`);
execSync("npm run build", { cwd: DIRNAME_BACKEND,           stdio: "inherit" });
PrintBuildLog(`Running Build -> '${DIRNAME_FRONTEND}' ...`);
execSync("npm run build", { cwd: DIRNAME_FRONTEND,          stdio: "inherit" });
PrintBuildLog(`Running Build -> '${DIRNAME_DOCUMENTATIONS}' ...`);
execSync("npm run build", { cwd: DIRNAME_DOCUMENTATIONS,    stdio: "inherit" });

// Copy artifacts
PrintBuildLog(`Copy '${NAME_FRONTEND}' artefacts to outputfolder ...`);
cpSync(DIRNAME_FRONTEND_BUILDOUT,       path.join(outputDir,NAME_FRONTEND),         { recursive: true });
PrintBuildLog(`Copy '${NAME_BACKEND}' artefacts to outputfolder ...`);
cpSync(DIRNAME_BACKEND_BUILDOUT,        path.join(outputDir,NAME_BACKEND),          { recursive: true });
PrintBuildLog(`Copy '${NAME_DOCUMENTATIONS}' artefacts to outputfolder ...`);
cpSync(DIRNAME_DOCUMENTATIONS_BUILDOUT, path.join(outputDir,NAME_DOCUMENTATIONS),   { recursive: true });
PrintBuildLog();
PrintBuildLog("✅ Build abgeschlossen. Artefakte liegen in:", outputDir);


function PrintBuildLog(msg=null){
    let outputMsg = (msg==null) ? "" : `${BUILD_LOGPREFIX_SOLUTION} ${msg}`;
    console.log(outputMsg);
}