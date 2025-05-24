// Script para funcionalidade de configurações
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado'); // Verificação inicial
  
  // Elementos do DOM
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const themeOptions = document.querySelectorAll('.theme-option');
  const saveButton = document.querySelector('.btn-salvar');
  const cancelButton = document.querySelector('.btn-cancelar');
  
  // Verifica se elementos existem
  if (!togglePasswordButtons || !themeOptions || !saveButton || !cancelButton) {
    console.error('Alguns elementos não foram encontrados!');
  }
  
  // Alternar visibilidade das senhas
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const passwordInput = this.parentElement.querySelector('input');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Alternar ícone
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  
  // Salvar configurações
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      alert('Configurações salvas com sucesso!');
      // Aqui você pode adicionar lógica para salvar no backend
    });
  }
  
  // Cancelar alterações
  if (cancelButton) {
    cancelButton.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja descartar as alterações?')) {
        window.location.reload();
      }
    });
  }
});