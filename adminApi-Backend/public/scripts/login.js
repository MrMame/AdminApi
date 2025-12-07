import {sendLogIn} from "./services/logInService.js";

function doSendLogIn(){
    sendLogIn()
    .then(token => {
        if(token!==undefined){
            window.location.replace("/");
        }
    });
}


// Die Funktionen die im HTML Code verwendet werden sollen, müssen zuerst im window Objekt registriert sein :/
window.doSendLogIn              = doSendLogIn;
