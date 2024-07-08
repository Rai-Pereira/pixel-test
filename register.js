document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const usersListContainer = document.getElementById('users-list');
    const userFormContainer = document.getElementById('user-form');
    const successMessage = document.getElementById('success-message');

    // Exibir lista de usuários ao carregar a página
    showUsersList();

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;
            const termsAccepted = document.getElementById('terms').checked;

            if (!termsAccepted) {
                alert('Você precisa aceitar os termos e condições para criar uma conta.');
                return;
            }

            // Criar novo usuário
            const newUser = {
                email: email,
                name: name,
                password: password
            };

            createUser(newUser);

            // Exibir mensagem de sucesso
            showMessage('Usuário criado com sucesso.');

            // Limpar formulário
            registerForm.reset();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const user = getUserByEmail(email);

            if (user && user.password === password) {
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    // Função para exibir lista de usuários
    function showUsersList() {
        const users = getUsers();
        usersListContainer.innerHTML = '';

        if (users && users.length > 0) {
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.classList.add('user-item');
                userItem.innerHTML = `
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Nome:</strong> ${user.name}</p>
                    <button class="btn btn-danger" onclick="deleteUser('${user.email}')">Excluir</button>
                `;
                usersListContainer.appendChild(userItem);
            });
        } else {
            usersListContainer.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
        }
    }

    // Função para criar um novo usuário
    function createUser(user) {
        const users = getUsers() || [];
        users.push(user);
        saveUsers(users);
        showUsersList();
    }

    // Função para obter todos os usuários
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Função para salvar usuários
    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função para obter usuário por email
    function getUserByEmail(email) {
        const users = getUsers();
        return users.find(user => user.email === email);
    }

    // Função para deletar usuário por email
    function deleteUser(email) {
        let users = getUsers();
        users = users.filter(user => user.email !== email);
        saveUsers(users);
        showUsersList();
        showMessage('Usuário excluído com sucesso.');
    }

    // Função para exibir mensagens na tela
    function showMessage(message) {
        successMessage.innerHTML = message;
        successMessage.classList.remove('d-none');
        setTimeout(function() {
            successMessage.classList.add('d-none');
        }, 3000);
    }
});
