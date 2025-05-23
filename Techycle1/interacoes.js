// Integração do componente de notificações em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se estamos em uma página com sidebar (não login/cadastro)
  const sidebar = document.querySelector('.sidebar');
  
  if (sidebar) {
    // Carregar o CSS de notificações
    const notificacoesCSS = document.createElement('link');
    notificacoesCSS.rel = 'stylesheet';
    notificacoesCSS.href = 'notificacoes.css';
    document.head.appendChild(notificacoesCSS);
    
    // Adicionar badge ao botão de notificação
    const notificationButton = document.querySelector('.icons button:first-child');
    if (notificationButton) {
      // Adicionar badge de notificação
      const notificationBadge = document.createElement('span');
      notificationBadge.className = 'notification-badge';
      notificationBadge.textContent = '4';
      notificationButton.style.position = 'relative';
      notificationButton.appendChild(notificationBadge);
      
      // Criar o painel de notificações
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
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
        
       mainContent.appendChild(notificationsPanel);
    
    // Elementos da notificação
    const notificationItem = notificationsPanel.querySelector('.notification-item');
    const markAsReadBtn = notificationsPanel.querySelector('.mark-as-read');
    
    // Função para remover notificação
    const removeNotification = () => {
      notificationItem.remove();
      notificationBadge.textContent = '0';
      markAsReadBtn.style.display = 'none'; // Oculta o botão após ação
    };
    
    // Clicar na notificação
    notificationItem.addEventListener('click', removeNotification);
    
    // Clicar no botão "Marcar como lida"
    markAsReadBtn.addEventListener('click', removeNotification);
    
    // Abrir/fechar painel
    notificationButton.addEventListener('click', function(e) {
      e.stopPropagation();
      notificationsPanel.classList.toggle('active');
    });
    
    // Fechar painel
    const closeButton = notificationsPanel.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
      notificationsPanel.classList.remove('active');
    });
    
    // Fechar ao clicar fora
    document.addEventListener('click', function(e) {
      if (!notificationsPanel.contains(e.target) && e.target !== notificationButton) {
        notificationsPanel.classList.remove('active');
          }
        });
      }
    }
  }
});
