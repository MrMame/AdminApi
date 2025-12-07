let _token=null;

export async function sendLogIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    _token = data.token;
    console.log(`Token gespeichert:\n${_token}`);
    return _token;
}

export function getToken(){
    return _token;
}