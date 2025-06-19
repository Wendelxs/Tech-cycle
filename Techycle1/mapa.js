// Inicializa o mapa
var map = L.map('map').setView([-12.6996, -38.3261], 16);

// Camada base do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ícones personalizados
var blueIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var grayIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Clique no mapa para adicionar marcador
map.on('click', function (e) {
  var selectedType = document.getElementById("markerType").value;
  var icon = selectedType === "blue" ? blueIcon : grayIcon;

  // Cria o marcador
  var marker = L.marker(e.latlng, { icon: icon }).addTo(map);

  // Pergunta ao usuário o que tem ali
  var descricao = prompt("O que tem nesse ponto de coleta?");

  // Define o popup com a informação digitada
  if (descricao && descricao.trim() !== "") {
    marker.bindPopup(`<b>${selectedType === 'blue' ? 'Ponto Vermelho' : 'Ponto Cinza'}</b><br>${descricao}`).openPopup();
  } else {
    marker.bindPopup(`<b>${selectedType === 'blue' ? 'Ponto Vermelho' : 'Ponto Cinza'}</b><br>Sem descrição.`).openPopup();
  }

  // Remover marcador ao dar dois cliques nele
  marker.on('dblclick', function () {
    map.removeLayer(marker);
  });
});

// Função para buscar o nome da cidade pela localização do mapa
function atualizarNomeCidade() {
  var center = map.getCenter();
  var url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${center.lat}&lon=${center.lng}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const cidade = data.address.city || data.address.town || data.address.village || "Cidade não encontrada";
      document.getElementById("cidade").innerText = cidade;
    })
    .catch(() => {
      document.getElementById("cidade").innerText = "Erro ao buscar cidade";
    });
}

// Atualiza o nome da cidade ao carregar o mapa
map.whenReady(() => {
  atualizarNomeCidade();
});

// Atualiza o nome da cidade sempre que o usuário mover o mapa
map.on("moveend", () => {
  atualizarNomeCidade();
});
