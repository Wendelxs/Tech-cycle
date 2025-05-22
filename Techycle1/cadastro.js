document.addEventListener('DOMContentLoaded', function () {
    // Referências aos elementos do DOM
    const form = document.getElementById('cadastro-form');
    const togglePassword = document.getElementById('toggle-password');
    const senhaInput = document.getElementById('senha');
    const cnpjInput = document.getElementById('cnpj');

    // Função para alternar visibilidade da senha
    togglePassword.addEventListener('click', function () {
        const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
        senhaInput.setAttribute('type', type);

        // Alternar ícone
        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // Máscara para CNPJ
    cnpjInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 14) {
            value = value.slice(0, 14);
        }

        // Formatação do CNPJ: XX.XXX.XXX/XXXX-XX
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }

        e.target.value = value;
    });

    // Validação do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const empresa = document.getElementById('empresa').value;
        const email = document.getElementById('email').value;
        const cnpj = document.getElementById('cnpj').value;
        const senha = document.getElementById('senha').value;

        // Validação básica
        if (!empresa || !email || !cnpj || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Validação de CNPJ (simplificada)
        const cnpjClean = cnpj.replace(/\D/g, '');
        if (cnpjClean.length !== 14) {
            alert('Por favor, insira um CNPJ válido.');
            return;
        }

        // Validação de senha
        if (senha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Se tudo estiver válido, simulamos o envio do formulário
        alert('Cadastro realizado com sucesso! Redirecionando para a página inicial...');

        //  Redirecionamento para a página inicial 
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});
