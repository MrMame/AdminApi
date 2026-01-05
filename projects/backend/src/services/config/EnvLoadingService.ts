import dotenv from "dotenv";
import fs from "fs";

export class EnvLoadingService{

    public static loadEnvironmentConfigFile(){
        const env               = process.env.NODE_ENV || "dev";
        const envFile           = `config/.env.${env}`;
        const envFallbackFile   = `config/.env`;
        
        if(fs.existsSync(envFile)){
            console.log(`Going to load .env file '${envFile}'`);
            dotenv.config({path:envFile});
        }else{
            console.log(`Trying to load .env file '${envFallbackFile}'`);
            dotenv.config({path:envFallbackFile});        // fallback is .env
        }
        // Output Env File if we are in development mode
        if(env==="dev"){
            for(const[key,value] of Object.entries(process.env)){
                console.log(key,value);
            }
        };
        
    }
    
}