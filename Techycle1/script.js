document.addEventListener('DOMContentLoaded', function() {

  const chartOptions = {
    cutout: '70%',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const ctxA = document.getElementById('chartA').getContext('2d');
  new Chart(ctxA, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [25, 75],
        backgroundColor: ['#61a6c9', '#f9f9f9']
      }]
    },
    options: chartOptions
  });

  const ctxB = document.getElementById('chartB').getContext('2d');
  new Chart(ctxB, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [50, 50],
        backgroundColor: ['#61a6c9', '#f9f9f9']
      }]
    },
    options: chartOptions
  });

  const ctxC = document.getElementById('chartC').getContext('2d');
  new Chart(ctxC, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [0, 100],
        backgroundColor: ['#61a6c9', '#f9f9f9']
      }]
    },
    options: chartOptions
  });

  const generateRouteBtn = document.querySelector('.generate-route-btn');
  if (generateRouteBtn) {
    generateRouteBtn.addEventListener('click', function() {
      alert('Gerando rota otimizada...');
    });
  }


  const viewMoreLinks = document.querySelectorAll('.view-more');
  viewMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.closest('.collection-points, .chart-area');
      alert(`Expandindo visualização de ${section.querySelector('h3').textContent}`);
    });
  });
});
