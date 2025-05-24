// Script para funcionalidade de login
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  const togglePassword = document.getElementById('toggle-password');
  const senhaInput = document.getElementById('senha');
  
  // Alternar visibilidade da senha
  if (togglePassword) {
    togglePassword.addEventListener('click', function() {
      const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
      senhaInput.setAttribute('type', type);
      
      // Alternar ícone
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }
  
  // Envio do formulário de login
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      
      // Aqui seria feita a validação e autenticação
      // Por enquanto, apenas redirecionamos para a página principal
      window.location.href = 'index.html';
    });
  }
});
