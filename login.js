import { sha256 } from './sha256-min.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hash the password using SHA-256
    const hashedPassword = await sha256(password);

    // Correct hashed password for '1234' is precomputed
    const correctHashedPassword = await sha256('1234');

    // Verificar usuário e senha usando hash SHA-256
    if (username === 'admin' && hashedPassword === correctHashedPassword) {
      localStorage.setItem('isLoggedIn', 'true');  // Armazena o estado de login
      window.location.href = 'index.html'; // Redireciona para a página principal
    } else {
      alert('Usuário ou senha incorretos.');
    }
  });
});

