import dotenv from "dotenv";
import fs from "fs";

const env = process.env.NODE_ENV || "dev";
const envFile = `.env.${env}`;

if(fs.existsSync(envFile)){
    dotenv.config({path:envFile});
}else{
    dotenv.config();        // fallback is .env
}

console.log(`Loaded env file ${envFile}`);