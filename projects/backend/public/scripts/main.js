import {readAlienStatus , wakeAlien, readNasStatus, wakeNas} from "./services/wolService.js";
import {sendLogIn,getToken} from "./services/logInService.js";

function doReadWakeStatusAlien(){
    let token = getToken();
    readAlienStatus(token).then(respText=>_writeToOutput(respText));
}
function doWakeAlien(){
    let token = getToken();
    wakeAlien(token).then(respText=>_writeToOutput(respText));
}
function doReadWakeStatusNas(){
    let token = getToken();
    readNasStatus(token).then(respText=>_writeToOutput(respText));
}
function doWakeNas(){
    let token = getToken();
    wakeNas(token).then(respText=>_writeToOutput(respText));
}

function _writeToOutput(msg){
    // Create Timestamp Element
    const timeStamp = document.createElement("span");
    timeStamp.classList.add("timestamp");
    const theTime = new Date().toLocaleTimeString();
    timeStamp.innerText = `[${theTime}]`;
    // Create Message Element
    const message = document.createElement("span");
    message.classList.add("message");
    message.innerText = `${msg}`;
    // Merge Elements to new Row
    const newRow = document.createElement("p");
    newRow.classList.add("output","row");
    newRow.appendChild(timeStamp);
    newRow.appendChild(message);
    // Append new Row to output
    const outEl = document.querySelector("div.area.output");
    outEl.prepend(newRow);
}

// Die Funktionen die im HTML Code verwendet werden sollen, müssen zuerst im window Objekt registriert sein :/
window.doReadWakeStatusAlien    = doReadWakeStatusAlien;
window.doWakeAlien              = doWakeAlien;
window.doReadWakeStatusNas      = doReadWakeStatusNas;
window.doWakeNas                = doWakeNas;