// Script para a página de relatórios
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const periodoSelect = document.getElementById('periodo-select');
  const chartTypeBtns = document.querySelectorAll('.chart-type-btn');
  const exportBtn = document.querySelector('.export-btn');
  const searchInput = document.querySelector('.search-input');
  const tableFilter = document.querySelector('.table-filter');
  const pageBtns = document.querySelectorAll('.page-btn');
  
  // Configuração dos gráficos
  function setupCharts() {
    // Gráfico de Volume por Tipo de Resíduo
    const residuosCtx = document.getElementById('residuos-chart').getContext('2d');
    const residuosChart = new Chart(residuosCtx, {
      type: 'bar',
      data: {
        labels: ['Celulares', 'Notebooks/Tablets', 'Placas Eletrônicas', 'Cabos', 'Baterias', 'Mídias (CDs/DVDs)'],
        datasets: [{
          label: 'Volume (kg)',
          data: [320, 480, 250, 180, 120, 90],
          backgroundColor: [
            'rgba(74, 124, 89, 0.7)',
            'rgba(74, 124, 89, 0.6)',
            'rgba(74, 124, 89, 0.5)',
            'rgba(74, 124, 89, 0.4)',
            'rgba(74, 124, 89, 0.3)',
            'rgba(74, 124, 89, 0.2)'
          ],
          borderColor: [
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Volume (kg)'
            }
          }
        }
      }
    });
    
    // Gráfico de Coletas por Ponto
    const coletasCtx = document.getElementById('coletas-chart').getContext('2d');
    const coletasChart = new Chart(coletasCtx, {
      type: 'pie',
      data: {
        labels: ['Centro', 'Gleba A', 'Jardim Universidade'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: [
            'rgba(74, 124, 89, 0.7)',
            'rgba(74, 124, 89, 0.5)',
            'rgba(74, 124, 89, 0.3)'
          ],
          borderColor: [
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)',
            'rgba(74, 124, 89, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
    
    // Gráfico de Tendência de Ocupação
    const ocupacaoCtx = document.getElementById('ocupacao-chart').getContext('2d');
    const ocupacaoChart = new Chart(ocupacaoCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [
          {
            label: 'Centro',
            data: [30, 45, 35, 60, 75],
            borderColor: 'rgba(74, 124, 89, 1)',
            backgroundColor: 'rgba(74, 124, 89, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Gleba A',
            data: [45, 30, 50, 40, 60],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Jardim Universidade',
            data: [20, 35, 25, 45, 30],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ocupação (%)'
            },
            max: 100
          }
        }
      }
    });
    
    // Armazenar referências aos gráficos
    window.appCharts = {
      residuos: residuosChart,
      coletas: coletasChart,
      ocupacao: ocupacaoChart
    };
  }
  
  // Função para alternar tipo de gráfico
  function alternarTipoGrafico(e) {
    const btn = e.currentTarget;
    const type = btn.getAttribute('data-type');
    
    // Remover classe ativa de todos os botões
    chartTypeBtns.forEach(b => b.classList.remove('active'));
    
    // Adicionar classe ativa ao botão clicado
    btn.classList.add('active');
    
    // Atualizar tipo de gráfico
    if (window.appCharts && window.appCharts.residuos) {
      window.appCharts.residuos.config.type = type;
      window.appCharts.residuos.update();
    }
  }
  
  // Função para exportar relatório
  function exportarRelatorio() {
    alert('Relatório exportado com sucesso!');
  }
  
  // Função para filtrar tabela
  function filtrarTabela() {
    const termo = searchInput.value.toLowerCase();
    const filtro = tableFilter.value;
    const linhas = document.querySelectorAll('.table-wrapper tbody tr');
    
    linhas.forEach(linha => {
      const texto = linha.textContent.toLowerCase();
      const ponto = linha.children[1].textContent.toLowerCase();
      
      let mostrar = texto.includes(termo);
      
      if (filtro !== 'all') {
        mostrar = mostrar && ponto.includes(filtro);
      }
      
      linha.style.display = mostrar ? '' : 'none';
    });
  }
  
  // Event Listeners
  periodoSelect.addEventListener('change', function() {
    // Aqui você atualizaria os dados com base no período selecionado
    // Por simplicidade, apenas um alerta
    alert(`Período alterado para: ${this.options[this.selectedIndex].text}`);
  });
  
  chartTypeBtns.forEach(btn => {
    btn.addEventListener('click', alternarTipoGrafico);
  });
  
  exportBtn.addEventListener('click', exportarRelatorio);
  
  searchInput.addEventListener('input', filtrarTabela);
  tableFilter.addEventListener('change', filtrarTabela);
  
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        document.querySelector('.page-btn.active').classList.remove('active');
        this.classList.add('active');
        // Aqui você atualizaria os dados da tabela com base na página
      }
    });
  });
  
  // Inicializar gráficos
  setupCharts();
});
