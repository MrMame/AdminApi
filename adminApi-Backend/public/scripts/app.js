let token = null;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  token = data.token;
  document.getElementById('response').textContent = `Token gespeichert:\n${token}`;
});

document.getElementById('privateBtn').addEventListener('click', async () => {
  if (!token) {
    document.getElementById('response').textContent = 'Bitte zuerst einloggen!';
    return;
  }

  const res = await fetch('http://localhost:3000/index.html', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await res.json();
  document.getElementById('response').textContent = JSON.stringify(data, null, 2);
});