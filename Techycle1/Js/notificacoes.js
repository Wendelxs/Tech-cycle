// Script para funcionalidade de notificações
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const notificationButton = document.querySelector('.icons button:first-child');
  const mainContent = document.querySelector('.main-content');
  
  // Criar o painel de notificações
  const notificationsPanel = document.createElement('div');
  notificationsPanel.className = 'notifications-panel';
  
  // Adicionar conteúdo ao painel de notificações
  notificationsPanel.innerHTML = `
    <div class="notifications-header">
      <h3>Notificações</h3>
      <button class="close-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="user-info">
      <div class="user-avatar">
        <i class="fa-solid fa-user"></i>
      </div>
      <div>
        <div class="user-name">Reuse Tech</div>
        <div class="user-email">reusetech@gmail.com</div>
      </div>
    </div>
    <div class="notifications-list">
      <div class="notification-item">
        <div class="notification-icon warning">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Ponto de coleta quase cheio</div>
          <div class="notification-message">UPA da Gleba A está com 87% de ocupação. Considere agendar uma coleta.</div>
          <div class="notification-time">Há 30 minutos</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon success">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Coleta realizada com sucesso</div>
          <div class="notification-message">Coleta no ponto Feira de Camaçari foi concluída.</div>
          <div class="notification-time">Há 2 horas</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon">
          <i class="fa-solid fa-recycle"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Nova embalagem cadastrada</div>
          <div class="notification-message">Embalagem para tablets foi adicionada ao sistema.</div>
          <div class="notification-time">Há 1 dia</div>
        </div>
      </div>
      <div class="notification-item">
        <div class="notification-icon">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">Relatório semanal disponível</div>
          <div class="notification-message">O relatório de coletas da semana está disponível para visualização.</div>
          <div class="notification-time">Há 2 dias</div>
        </div>
      </div>
    </div>
    <div class="notification-actions">
      <button>Marcar todas como lidas</button>
    </div>
  `;
  
  // Adicionar o painel ao DOM
  mainContent.appendChild(notificationsPanel);
  
  // Adicionar badge de notificação
  const notificationBadge = document.createElement('span');
  notificationBadge.className = 'notification-badge';
  notificationBadge.textContent = '4';
  notificationButton.style.position = 'relative';
  notificationButton.appendChild(notificationBadge);
  
  // Adicionar evento de clique ao botão de notificação
  notificationButton.addEventListener('click', function(e) {
    e.stopPropagation();
    notificationsPanel.classList.toggle('active');
  });
  
  // Adicionar evento de clique ao botão de fechar
  const closeButton = notificationsPanel.querySelector('.close-btn');
  closeButton.addEventListener('click', function() {
    notificationsPanel.classList.remove('active');
  });
  
  // Fechar o painel ao clicar fora dele
  document.addEventListener('click', function(e) {
    if (!notificationsPanel.contains(e.target) && e.target !== notificationButton) {
      notificationsPanel.classList.remove('active');
    }
  });
});

