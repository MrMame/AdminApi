export async function readAlienStatus(token) {
    const res = await fetch('/wake/status/alien', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token  },
    });
    const text = await res.text();
    //alert(text);
    //writeToOutput(text);
    return text;
}
export async function wakeAlien(token) {
    const res = await fetch('/wake/alien', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token  },
    });
    const text = await res.text();
    //alert(text);
    //writeToOutput(text);
    return text;
}
export async function readNasStatus(token) {
    const res = await fetch('/wake/status/nas', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token  },
    });
    const text = await res.text();
    //alert(text);
    //writeToOutput(text);
    return text;
}
export async function wakeNas(token) {
    const res = await fetch('/wake/nas', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token  },
    });
    const text = await res.text();
    //alert(text);
    //writeToOutput(text);
    return text;
}
