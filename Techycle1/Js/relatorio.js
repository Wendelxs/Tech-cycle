// Script para a página de relatórios
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const periodoSelect = document.getElementById('periodo-select');
  const chartTypeBtns = document.querySelectorAll('.chart-type-btn');
  const exportExcelBtn = document.getElementById('export-excel');
  const exportPdfBtn = document.getElementById('export-pdf');
  const searchInput = document.querySelector('.search-input');
  const tableFilter = document.querySelector('.table-filter');
  const pageBtns = document.querySelectorAll('.page-btn');
  const generateReportBtn = document.querySelector('.generate-btn');
  const scheduleReportBtn = document.querySelector('.schedule-btn');
  
  // Configuração dos gráficos
  function setupCharts() {
    // Gráfico de KPIs ao longo do tempo
    const kpiTrendCtx = document.getElementById('kpi-trend-chart').getContext('2d');
    const kpiTrendChart = new Chart(kpiTrendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [
          {
            label: 'Taxa de Coleta Efetiva (%)',
            data: [85, 87, 89, 91, 92],
            borderColor: 'rgba(74, 124, 89, 1)',
            backgroundColor: 'rgba(74, 124, 89, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Eficiência das Rotas (km/ton)',
            data: [15.2, 14.8, 13.9, 13.1, 12.5],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          },
          {
            label: 'Lead Time (dias)',
            data: [2.5, 2.3, 2.1, 1.9, 1.8],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Taxa (%)'
            },
            min: 80,
            max: 100
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Km/ton e Dias'
            },
            min: 0,
            max: 20,
            grid: {
              drawOnChartArea: false
            }
          }
        }
      }
    });
    
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
    
    // Gráfico de Eficiência de Rotas por Região
    const eficienciaCtx = document.getElementById('eficiencia-chart').getContext('2d');
    const eficienciaChart = new Chart(eficienciaCtx, {
      type: 'bar',
      data: {
        labels: ['Centro', 'Gleba A', 'Jardim Universidade'],
        datasets: [{
          label: 'Km/Tonelada',
          data: [11.2, 13.5, 14.8],
          backgroundColor: 'rgba(74, 124, 89, 0.7)',
          borderColor: 'rgba(74, 124, 89, 1)',
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
              text: 'Km/Tonelada'
            }
          }
        }
      }
    });
    
    // Armazenar referências aos gráficos
    window.appCharts = {
      kpiTrend: kpiTrendChart,
      residuos: residuosChart,
      coletas: coletasChart,
      eficiencia: eficienciaChart
    };
  }
  
  // Função para alternar tipo de gráfico
  function alternarTipoGrafico(e) {
    const btn = e.currentTarget;
    const type = btn.getAttribute('data-type');
    const chartContainer = btn.closest('.chart-container');
    const chartId = chartContainer.querySelector('canvas').id;
    
    // Remover classe ativa de todos os botões no mesmo container
    chartContainer.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
    
    // Adicionar classe ativa ao botão clicado
    btn.classList.add('active');
    
    // Atualizar tipo de gráfico
    if (window.appCharts && window.appCharts[chartId.split('-')[0]]) {
      const chart = window.appCharts[chartId.split('-')[0]];
      chart.config.type = type;
      chart.update();
    }
  }
  
  // Função para exportar relatório
  function exportarRelatorio(formato) {
    alert(`Relatório exportado em formato ${formato} com sucesso!`);
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
  
  // Função para gerar relatório
  function gerarRelatorio() {
    const tipoRelatorio = document.getElementById('report-type-select').value;
    const dataInicio = document.getElementById('start-date').value;
    const dataFim = document.getElementById('end-date').value;
    const formato = document.querySelector('input[name="format"]:checked').value;
    
    alert(`Gerando relatório de ${tipoRelatorio} para o período de ${dataInicio} a ${dataFim} em formato ${formato.toUpperCase()}`);
  }
  
  // Função para agendar envio de relatório
  function agendarRelatorio() {
    const tipoRelatorio = document.getElementById('report-type-select').value;
    alert(`Agendamento de envio do relatório de ${tipoRelatorio} configurado com sucesso!`);
  }
  
  // Event Listeners
  periodoSelect.addEventListener('change', function() {
    // Aqui você atualizaria os dados com base no período selecionado
    alert(`Período alterado para: ${this.options[this.selectedIndex].text}`);
    
    // Simulação de atualização dos gráficos
    if (window.appCharts) {
      Object.values(window.appCharts).forEach(chart => {
        // Simular mudança de dados
        chart.data.datasets.forEach(dataset => {
          dataset.data = dataset.data.map(() => Math.floor(Math.random() * 100));
        });
        chart.update();
      });
    }
  });
  
  chartTypeBtns.forEach(btn => {
    btn.addEventListener('click', alternarTipoGrafico);
  });
  
  if (exportExcelBtn) {
    exportExcelBtn.addEventListener('click', () => exportarRelatorio('Excel'));
  }
  
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => exportarRelatorio('PDF'));
  }
  
  searchInput.addEventListener('input', filtrarTabela);
  tableFilter.addEventListener('change', filtrarTabela);
  
  pageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('active') && !this.querySelector('i')) {
        document.querySelector('.page-btn.active').classList.remove('active');
        this.classList.add('active');
        // Aqui você atualizaria os dados da tabela com base na página
      }
    });
  });
  
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', gerarRelatorio);
  }
  
  if (scheduleReportBtn) {
    scheduleReportBtn.addEventListener('click', agendarRelatorio);
  }
  
  // Inicializar gráficos
  setupCharts();
});

