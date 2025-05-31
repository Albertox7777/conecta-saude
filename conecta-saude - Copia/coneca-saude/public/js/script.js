<script>
document.addEventListener('DOMContentLoaded', () => {
    console.log('Conecta Saúde - App Carregado!');

    // Exemplo de lógica para o formulário de login (apenas validação front-end básica)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // Simulação de validação (em um app real, isso iria para um backend)
            if (email === 'teste@email.com' && password === 'senha123') {
                alert('Login bem-sucedido! Redirecionando para o Dashboard...');
                window.location.href = 'dashboard.html'; // Redireciona para o dashboard
            } else {
                alert('Email ou senha incorretos.');
            }
        });
    }

    // Exemplo de lógica para o formulário de cadastro (apenas validação front-end básica)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            if (name && email && password) {
                alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
                window.location.href = 'login.html'; // Redireciona para a página de login
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }

    // Lógica para o calendário (exemplo simples de renderização)
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        function renderCalendar(month, year) {
            calendarGrid.innerHTML = ''; // Limpa o calendário existente

            // Nomes dos dias da semana
            const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            dayNames.forEach(day => {
                const dayNameDiv = document.createElement('div');
                dayNameDiv.classList.add('day-name');
                dayNameDiv.textContent = day;
                calendarGrid.appendChild(dayNameDiv);
            });

            const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Domingo, 1 = Segunda...
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Adiciona células vazias para os dias antes do 1º do mês
            for (let i = 0; i < firstDayOfMonth; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('calendar-day');
                calendarGrid.appendChild(emptyDay);
            }

            // Adiciona os dias do mês
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.classList.add('calendar-day', 'current-month');
                dayDiv.textContent = day;

                // Marca o dia atual
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayDiv.classList.add('today');
                }

                // Exemplo de como adicionar eventos (em um app real, viria de um array de eventos)
                if (day === 10 || day === 22) { // Exemplo: dias 10 e 22 têm eventos
                    dayDiv.classList.add('has-event');
                    const eventDot = document.createElement('div');
                    eventDot.classList.add('event-dot');
                    dayDiv.appendChild(eventDot);
                    dayDiv.title = 'Você tem um agendamento neste dia!';
                }

                dayDiv.addEventListener('click', () => {
                    alert(`Você clicou no dia ${day} do mês ${month + 1}/${year}`);
                    // Aqui você poderia abrir um modal para agendamento, etc.
                });

                calendarGrid.appendChild(dayDiv);
            }
        }

        renderCalendar(currentMonth, currentYear);
    }
});

</script>