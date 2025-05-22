// Inicialização do mapa e configurações
let map;
let markers = [];

// Dados dos pontos de coleta (simulados)
const collectionPoints = [
  {
    position: { lat: -23.5505, lng: -46.6333 }, 
    title: 'Ponto A - Centro',
    type: 'Celulares Antigos',
    capacity: '80 kg',
    icon: 'blue'
  },
  {
    position: { lat: -23.5605, lng: -46.6233 },
    title: 'Ponto B - Gleba A',
    type: 'Cabos e Baterias',
    capacity: '120 kg',
    icon: 'green'
  },
  {
    position: { lat: -23.5705, lng: -46.6433 },
    title: 'Ponto C - Jardim Universidade',
    type: 'Placas Eletrônicas',
    capacity: '70 kg',
    icon: 'red'
  },
  {
    position: { lat: -23.5555, lng: -46.6433 },
    title: 'Ponto D - Vila Nova',
    type: 'Monitores',
    capacity: '150 kg',
    icon: 'purple'
  },
  {
    position: { lat: -23.5455, lng: -46.6233 },
    title: 'Ponto E - Parque Industrial',
    type: 'Equipamentos Diversos',
    capacity: '200 kg',
    icon: 'orange'
  }
];

// Função para inicializar o mapa
function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.5505, lng: -46.6333 },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  });

  // Adicionando os marcadores ao mapa
  addMarkers();

  // Desenhando a rota de exemplo (linha azul no mapa)
  drawExampleRoute();
}

// Função para adicionar marcadores ao mapa
function addMarkers() {
  collectionPoints.forEach((point) => {
    const marker = new google.maps.Marker({
      position: point.position,
      map: map,
      title: point.title,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: getMarkerColor(point.icon),
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: '#FFFFFF',
        scale: 8
      }
    });

    // Adicionando informações ao marcador
    const infowindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 5px 0;">${point.title}</h3>
          <p style="margin: 0;">Tipo: ${point.type}</p>
          <p style="margin: 0;">Capacidade: ${point.capacity}</p>
        </div>
      `
    });

    // Evento de clique no marcador
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    markers.push(marker);
  });
}

// Função para obter a cor do marcador
function getMarkerColor(color) {
  const colors = {
    'blue': '#4285F4',
    'red': '#EA4335',
    'green': '#34A853',
    'orange': '#FBBC05',
    'purple': '#9C27B0'
  };
  return colors[color] || '#4285F4';
}

// Função para desenhar uma rota de exemplo
function drawExampleRoute() {
  const routeCoordinates = [
    { lat: -23.5505, lng: -46.6333 },
    { lat: -23.5555, lng: -46.6300 },
    { lat: -23.5605, lng: -46.6233 },
    { lat: -23.5655, lng: -46.6300 },
    { lat: -23.5705, lng: -46.6433 },
    { lat: -23.5555, lng: -46.6433 },
    { lat: -23.5455, lng: -46.6233 }
  ];

  const routePath = new google.maps.Polyline({
    path: routeCoordinates,
    geodesic: true,
    strokeColor: "#4285F4",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  routePath.setMap(map);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // O mapa será inicializado pelo callback da API do Google Maps
  // Verificamos se a API já foi carregada
  if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
    initMap();
  }
  // Caso contrário, o callback initMap será chamado quando a API carregar
});
