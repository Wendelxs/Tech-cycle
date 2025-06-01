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

  const viewMoreLinks = document.querySelectorAll('.view-more');
  viewMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.closest('.collection-points, .chart-area');
      alert(`Expandindo visualização de ${section.querySelector('h3').textContent}`);
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const generateRouteBtn = document.querySelector('.generate-route-btn');
    
    generateRouteBtn.addEventListener('click', function() {
        // Simulação dos dados que seriam coletados do sistema
        const routeData = {
            collectionPoints: getCollectionPointsData(),
            currentLocation: getCurrentLocation(),
            vehicleCapacity: getVehicleCapacity(),
            timeConstraints: getTimeConstraints()
        };
        
        // Chamada para a API da Qualp
        optimizeRouteWithQualp(routeData);
    });
    
    function getCollectionPointsData() {
        // Aqui você implementaria a lógica para obter os pontos de coleta
        // do seu sistema. Estou simulando alguns dados:
        return [
            { id: 1, address: "Rua A, 100", occupancy: 0.8, priority: "high" },
            { id: 2, address: "Rua B, 200", occupancy: 0.5, priority: "medium" },
            { id: 3, address: "Rua C, 300", occupancy: 0.9, priority: "high" }
        ];
    }
    
    function getCurrentLocation() {
        // Obter localização atual (simulada ou via GPS)
        return { lat: -23.5505, lng: -46.6333 }; // Coordenadas de São Paulo
    }
    
    function getVehicleCapacity() {
        // Capacidade do veículo (simulada)
        return 1000; // kg
    }
    
    function getTimeConstraints() {
        // Restrições de tempo (simuladas)
        return {
            startTime: "08:00",
            endTime: "17:00",
            maxRouteDuration: 240 // minutos
        };
    }
    
    async function optimizeRouteWithQualp(routeData) {
        try {
            // Exibir loading
            generateRouteBtn.textContent = "Processando...";
            generateRouteBtn.disabled = true;
            
            // Aqui você faria a chamada real para a API da Qualp
            // Como exemplo, estou usando um endpoint simulado
            const response = await fetch('https://qualp.com.br/api/optimize-route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY' // Substitua pela sua chave de API
                },
                body: JSON.stringify(routeData)
            });
            
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Exibir o resultado
            displayOptimizedRoute(result);
            
        } catch (error) {
            console.error("Erro ao otimizar rota:", error);
            alert("Ocorreu um erro ao otimizar a rota. Por favor, tente novamente.");
        } finally {
            generateRouteBtn.textContent = "Gerar rota otimizada";
            generateRouteBtn.disabled = false;
        }
    }
    
    function displayOptimizedRoute(route) {
        // Criar um modal ou seção para exibir os resultados
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'route-results';
        
        resultsContainer.innerHTML = `
            <h3>Rota Otimizada</h3>
            <div class="route-summary">
                <p><strong>Distância total:</strong> ${route.totalDistance} km</p>
                <p><strong>Tempo estimado:</strong> ${route.estimatedTime} minutos</p>
                <p><strong>Pontos atendidos:</strong> ${route.pointsServed.length}</p>
            </div>
            <div class="route-steps">
                <h4>Sequência de coleta:</h4>
                <ol>
                    ${route.optimizedSequence.map(point => `
                        <li>
                            ${point.address} (Ocupação: ${point.occupancy * 100}%)
                            ${point.priority === 'high' ? '⭐' : ''}
                        </li>
                    `).join('')}
                </ol>
            </div>
            <div class="route-map">
                <h4>Mapa da rota</h4>
                <p>Integração com mapa aqui...</p>
                <!-- Aqui você integraria com Google Maps ou outro serviço -->
            </div>
            <button class="close-results-btn">Fechar</button>
        `;
        
        // Adicionar ao DOM
        document.querySelector('.blue-box-content').appendChild(resultsContainer);
        
        // Adicionar evento para fechar
        document.querySelector('.close-results-btn').addEventListener('click', function() {
            resultsContainer.remove();
        });
    }
});
});


