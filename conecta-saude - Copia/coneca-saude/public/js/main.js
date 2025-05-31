// public/js/main.js

const API_BASE_URL = 'http://localhost:3000/api';

// Função para fazer requisições autenticadas
async function authenticatedFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers // Mantém outros cabeçalhos se existirem
    };

    if (token) {
        headers(['Authorization'] = 'Bearer $(token)');
    }

    const response = await fetch(url, { ...options, headers });

    // Se o token expirar ou for inválido, redireciona para o login
    if (response.status === 401 && !response.url.includes('/auth/')) { // Evita loop de redirecionamento para rotas de auth
        alert('Sessão expirada ou não autorizado. Por favor, faça login novamente.');
        localStorage.removeItem('token');
        window.location.href = '/login.html';
        return; // Retorna para evitar processar a resposta 401 como um erro comum
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro na requisição.');
    }
    return response.json();
}

// Exemplo de como buscar dados do perfil do usuário na página de dashboard
async function fetchUserProfile() {
    try {
        const profile = await authenticatedFetch('${API_BASE_URL}/users/profile');
        // Aqui você pode atualizar o DOM com os dados do perfil
        console.log('Perfil do usuário:', profile);
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = profile.name;
        }
        // ... outras atualizações na UI
    } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        // Tratar erro (ex: exibir mensagem para o usuário)
    }
}

// Chamar fetchUserProfile quando a página de dashboard carregar
document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: se estiver na página do dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para acessar esta página.');
            window.location.href = '/login.html';
            return;
        }
        fetchUserProfile();
    }

    // Lógica para botão de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token'); // Remove o token
            alert('Você foi desconectado.');
            window.location.href = '/login.html'; // Redireciona para o login
        });
    }
});