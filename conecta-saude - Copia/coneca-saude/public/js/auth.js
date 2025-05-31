// public/js/auth.js

const API_BASE_URL = 'http://localhost:3000/api';

async function registerUser(name, email, password) {
    try {
        const response = await fetch('${API_BASE_URL}'/auth/register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            localStorage.setItem('token', data.token); // Armazena o token no navegador
            window.location.href = '/dashboard.html'; // Redireciona
        } else {
            alert('Erro no cadastro: ${data.message' || 'Verifique seus dados.');
        }
    } catch (error) {
        console.error('Erro de rede ou servidor:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch('${API_BASE_URL}'/auth/login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Login realizado com sucesso!');
            localStorage.setItem('token', data.token); // Armazena o token no navegador
            window.location.href = '/dashboard.html'; // Redireciona
        } else {
            alert('Erro no login: ${data.message' || 'Credenciais inválidas.');
        }
    } catch (error) {
        console.error('Erro de rede ou servidor:', error);
        alert('Erro ao conectar com o servidor.');
    }
}

// Funções para pegar elementos do HTML e adicionar listeners
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await registerUser(name, email, password);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await loginUser(email, password);
        });
    }
});