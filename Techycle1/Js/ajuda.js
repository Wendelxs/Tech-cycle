// Script para a página de ajuda
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const topicLinks = document.querySelectorAll('.ajuda-topics a');
  const articles = document.querySelectorAll('.ajuda-article');
  const searchInput = document.querySelector('.ajuda-search input');
  const searchButton = document.querySelector('.ajuda-search button');
  
  // Função para mostrar um artigo específico
  function mostrarArtigo(id) {
    // Esconder todos os artigos
    articles.forEach(article => {
      article.classList.remove('active');
    });
    
    // Remover classe ativa de todos os links
    topicLinks.forEach(link => {
      link.parentElement.classList.remove('active');
    });
    
    // Mostrar o artigo selecionado
    const artigo = document.getElementById(id);
    if (artigo) {
      artigo.classList.add('active');
      
      // Ativar o link correspondente
      const link = document.querySelector(`.ajuda-topics a[href="#${id}"]`);
      if (link) {
        link.parentElement.classList.add('active');
      }
    }
  }
  
  // Adicionar evento de clique aos links de tópicos
  topicLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href').substring(1);
      mostrarArtigo(id);
    });
  });
  
  // Função de busca
  function buscar() {
    const termo = searchInput.value.toLowerCase().trim();
    
    if (!termo) return;
    
    // Procurar em todos os artigos
    let encontrado = false;
    
    articles.forEach(article => {
      const conteudo = article.textContent.toLowerCase();
      if (conteudo.includes(termo)) {
        mostrarArtigo(article.id);
        encontrado = true;
        return;
      }
    });
    
    if (!encontrado) {
      alert('Nenhum resultado encontrado para: ' + termo);
    }
  }
  
  // Adicionar evento ao botão de busca
  searchButton.addEventListener('click', buscar);
  
  // Adicionar evento de tecla Enter no campo de busca
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscar();
    }
  });
});
