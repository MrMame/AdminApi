// build.js
import { execSync } from "child_process";
import { cpSync, rmSync, mkdirSync } from "fs";
import path from "path";

const buildOutputFolderName = `_buildOutput`;

const rootBuild = process.cwd();
const rootWorkspace = rootBuild;//path.join(rootBuild, "..")
const outputDir = path.join(rootWorkspace, buildOutputFolderName);


const NAME_FRONTEND          = "adminApi-Frontend";
const NAME_BACKEND           = "adminApi-Backend";
const NAME_DOCUMENTATIONS    = "adminApi-Documentations";

const BUILD_LOGPATH_MAIN                = `Main`;

const DIRNAME_FRONTEND          = path.join(rootWorkspace, NAME_FRONTEND);
const DIRNAME_BACKEND           = path.join(rootWorkspace, NAME_BACKEND);
const DIRNAME_DOCUMENTATIONS    = path.join(rootWorkspace, NAME_DOCUMENTATIONS);

const DIRNAME_FRONTEND_BUILDOUT         = path.join(DIRNAME_FRONTEND, buildOutputFolderName);
const DIRNAME_BACKEND_BUILDOUT          = path.join(DIRNAME_BACKEND, buildOutputFolderName);
const DIRNAME_DOCUMENTATIONS_BUILDOUT   = path.join(DIRNAME_DOCUMENTATIONS, buildOutputFolderName);

// InfoOutput
PrintBuildLog(BUILD_LOGPATH_MAIN,`### Beginne mit Project-Build ...`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`[SubProjekts Path]`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_FRONTEND               ='${DIRNAME_FRONTEND}`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_BACKEND                ='${DIRNAME_BACKEND}`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_DOCUMENTATIONS         ='${DIRNAME_DOCUMENTATIONS}`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`[SubProjekts Build Output Path]`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_FRONTEND_BUILDOUT       ='${DIRNAME_FRONTEND_BUILDOUT}'`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_BACKEND_BUILDOUT        ='${DIRNAME_BACKEND_BUILDOUT}'`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   DIRNAME_DOCUMENTATIONS_BUILDOUT ='${DIRNAME_DOCUMENTATIONS_BUILDOUT}'`);
PrintBuildLog(BUILD_LOGPATH_MAIN,`   outputDir                       ='${outputDir}'`);

// Prepare and recreate outputfolder
PrintBuildLog(BUILD_LOGPATH_MAIN,`### Recreate new Outputfolder'${outputDir}' ...`);
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir);

// Build subprojects
PrintBuildLog(BUILD_LOGPATH_MAIN,`### Building SubProjects ...`); 
PrintBuildLog(BUILD_LOGPATH_MAIN,`Build START -> '${DIRNAME_BACKEND}' ...`);
execSync("npm run build", { cwd: DIRNAME_BACKEND,           stdio: "inherit" });
PrintBuildLog(BUILD_LOGPATH_MAIN,`Build FINISHED -> '${DIRNAME_BACKEND}' ...`);

PrintBuildLog(BUILD_LOGPATH_MAIN,`Build START -> '${DIRNAME_FRONTEND}' ...`);
execSync("npm run build", { cwd: DIRNAME_FRONTEND,          stdio: "inherit" });
PrintBuildLog(BUILD_LOGPATH_MAIN,`Build FINISHED -> '${DIRNAME_FRONTEND}' ...`);

PrintBuildLog(BUILD_LOGPATH_MAIN,`Build START -> '${DIRNAME_DOCUMENTATIONS}' ...`);
execSync("npm run build", { cwd: DIRNAME_DOCUMENTATIONS,    stdio: "inherit" });
PrintBuildLog(BUILD_LOGPATH_MAIN,`Build FINISHED -> '${DIRNAME_DOCUMENTATIONS}' ...`);






// Copy artifacts
PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_FRONTEND}' artefacts to outputfolder ...`);
cpSync(DIRNAME_FRONTEND_BUILDOUT,       path.join(outputDir,NAME_FRONTEND),         { recursive: true });
PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_BACKEND}' artefacts to outputfolder ...`);
cpSync(DIRNAME_BACKEND_BUILDOUT,        path.join(outputDir,NAME_BACKEND),          { recursive: true });
PrintBuildLog(BUILD_LOGPATH_MAIN,`Copy '${NAME_DOCUMENTATIONS}' artefacts to outputfolder ...`);
cpSync(DIRNAME_DOCUMENTATIONS_BUILDOUT, path.join(outputDir,NAME_DOCUMENTATIONS),   { recursive: true });
PrintBuildLog(BUILD_LOGPATH_MAIN,`✅ Build abgeschlossen. Artefakte liegen in: ${outputDir}`);


function PrintBuildLog(prfx,msg){
    let outPrfx = (prfx==null) ? "" : `[${prfx}] >>>> `;
    let outputMsg = (msg==null) ? "" : msg;
    let output = `${outPrfx}  -  ${outputMsg}`;
    console.log(output);
}