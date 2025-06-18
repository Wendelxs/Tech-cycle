document.addEventListener('DOMContentLoaded', function() {
  // Dados de exemplo para os gráficos
  const kpiTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Taxa de Coleta Efetiva',
      data: [85, 88, 90, 92, 94, 92],
      borderColor: '#4a7c59',
      tension: 0.1
    }]
  };

  const residuosData = {
    labels: ['Celulares Antigos', 'Cabos e Baterias', 'Placas Eletrônicas', 'Notebooks, tablets', 'Baterias de lítio', 'CDs, DVDs e disquetes'],
    datasets: [{
      label: 'Volume de Coleta por Tipo de Resíduo',
      data: [45, 78, 32, 56, 23, 18],
      backgroundColor: [
        'rgba(74, 124, 89, 0.6)',
        'rgba(124, 74, 89, 0.6)',
        'rgba(89, 74, 124, 0.6)',
        'rgba(74, 89, 124, 0.6)',
        'rgba(124, 89, 74, 0.6)',
        'rgba(89, 124, 74, 0.6)'
      ],
      borderColor: [
        'rgba(74, 124, 89, 1)',
        'rgba(124, 74, 89, 1)',
        'rgba(89, 74, 124, 1)',
        'rgba(74, 89, 124, 1)',
        'rgba(124, 89, 74, 1)',
        'rgba(89, 124, 74, 1)'
      ],
      borderWidth: 1
    }]
  };

  const coletasData = {
    labels: ['Centro', 'Gleba A', 'Jardim Universidade'],
    datasets: [{
      label: 'Coletas por Ponto',
      data: [4, 2, 3],
      backgroundColor: [
        'rgba(74, 124, 89, 0.6)',
        'rgba(124, 74, 89, 0.6)',
        'rgba(89, 74, 124, 0.6)'
      ],
      borderColor: [
        'rgba(74, 124, 89, 1)',
        'rgba(124, 74, 89, 1)',
        'rgba(89, 74, 124, 1)'
      ],
      borderWidth: 1
    }]
  };

  const eficienciaData = {
    labels: ['Centro', 'Gleba A', 'Jardim Universidade'],
    datasets: [{
      label: 'Eficiência de Rotas por Região',
      data: [11.2, 13.5, 14.8],
      backgroundColor: [
        'rgba(74, 124, 89, 0.6)',
        'rgba(124, 74, 89, 0.6)',
        'rgba(89, 74, 124, 0.6)'
      ],
      borderColor: [
        'rgba(74, 124, 89, 1)',
        'rgba(124, 74, 89, 1)',
        'rgba(89, 74, 124, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Configuração dos gráficos
  const kpiTrendChartCtx = document.getElementById('kpi-trend-chart').getContext('2d');
  new Chart(kpiTrendChartCtx, {
    type: 'line',
    data: kpiTrendData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const residuosChartCtx = document.getElementById('residuos-chart').getContext('2d');
  new Chart(residuosChartCtx, {
    type: 'bar',
    data: residuosData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const coletasChartCtx = document.getElementById('coletas-chart').getContext('2d');
  new Chart(coletasChartCtx, {
    type: 'bar',
    data: coletasData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const eficienciaChartCtx = document.getElementById('eficiencia-chart').getContext('2d');
  new Chart(eficienciaChartCtx, {
    type: 'bar',
    data: eficienciaData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

