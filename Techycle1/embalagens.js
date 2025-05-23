// Script para gerenciamento de embalagens
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const adicionarBtn = document.getElementById('adicionar-embalagem-btn');
  const modal = document.getElementById('embalagem-modal');
  const closeModal = document.querySelector('.close-modal');
  const cancelarBtn = document.getElementById('cancelar-embalagem');
  const form = document.getElementById('embalagem-form');
  const embalagensList = document.getElementById('embalagens-lista');
  
  // Dados iniciais de embalagens (simulando um banco de dados)
  let embalagens = [
    { id: 'EMB-001', nome: 'Embalagem plástico/isopor', classificacao: 'Primário', tipo: 'Placas, chips e memórias RAM' },
    { id: 'EMB-002', nome: 'Caixa de papelão reforçada', classificacao: 'Secundário', tipo: 'Placas eletrônicas, cabos' },
    { id: 'EMB-003', nome: 'Sacos plásticos transparentes', classificacao: 'Primário', tipo: 'Cabos e periféricos pequenos' },
    { id: 'EMB-004', nome: 'Caixa com espuma interna', classificacao: 'Primário', tipo: 'Notebooks, tablets' },
    { id: 'EMB-005', nome: 'Tambores plásticos vedados', classificacao: 'Terciário', tipo: 'Baterias de lítio e chumbo' },
    { id: 'EMB-006', nome: 'Envelope papel kraft reforçado', classificacao: 'Primário', tipo: 'CDs, DVDs e disquetes' }
  ];
  
  // Carregar embalagens do localStorage se existirem
  const embalagensSalvas = localStorage.getItem('embalagens');
  if (embalagensSalvas) {
    embalagens = JSON.parse(embalagensSalvas);
  }
  
  // Função para renderizar a lista de embalagens
  function renderizarEmbalagens() {
    embalagensList.innerHTML = '';
    
    embalagens.forEach(embalagem => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${embalagem.id}</td>
        <td>${embalagem.nome}</td>
        <td>${embalagem.classificacao}</td>
        <td>${embalagem.tipo}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${embalagem.id}"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" data-id="${embalagem.id}"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      
      embalagensList.appendChild(row);
    });
    
    // Adicionar eventos aos botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', editarEmbalagem);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', removerEmbalagem);
    });
    
    // Salvar no localStorage
    localStorage.setItem('embalagens', JSON.stringify(embalagens));
  }
  
  // Função para abrir o modal
  function abrirModal(modo = 'adicionar', id = null) {
    const modalTitle = document.querySelector('.modal-header h3');
    const submitBtn = document.getElementById('salvar-embalagem');
    
    // Resetar o formulário
    form.reset();
    
    if (modo === 'editar' && id) {
      const embalagem = embalagens.find(e => e.id === id);
      if (embalagem) {
        document.getElementById('embalagem-id').value = embalagem.id;
        document.getElementById('embalagem-nome').value = embalagem.nome;
        document.getElementById('embalagem-classificacao').value = embalagem.classificacao;
        document.getElementById('embalagem-tipo').value = embalagem.tipo;
        
        modalTitle.textContent = 'Editar Embalagem';
        submitBtn.textContent = 'Salvar Alterações';
      }
    } else {
      document.getElementById('embalagem-id').value = '';
      modalTitle.textContent = 'Cadastrar Nova Embalagem';
      submitBtn.textContent = 'Adicionar Embalagem';
    }
    
    modal.style.display = 'block';
  }
  
  // Função para fechar o modal
  function fecharModal() {
    modal.style.display = 'none';
  }
  
  // Função para adicionar/editar embalagem
  function salvarEmbalagem(e) {
    e.preventDefault();
    
    const id = document.getElementById('embalagem-id').value;
    const nome = document.getElementById('embalagem-nome').value;
    const classificacao = document.getElementById('embalagem-classificacao').value;
    const tipo = document.getElementById('embalagem-tipo').value;
    
    if (!nome || !classificacao || !tipo) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    if (id) {
      // Editar embalagem existente
      const index = embalagens.findIndex(e => e.id === id);
      if (index !== -1) {
        embalagens[index] = { id, nome, classificacao, tipo };
      }
    } else {
      // Adicionar nova embalagem
      const novoId = `EMB-${String(embalagens.length + 1).padStart(3, '0')}`;
      embalagens.push({ id: novoId, nome, classificacao, tipo });
    }
    
    renderizarEmbalagens();
    fecharModal();
  }
  
  // Função para editar embalagem
  function editarEmbalagem(e) {
    const id = e.currentTarget.getAttribute('data-id');
    abrirModal('editar', id);
  }
  
  // Função para remover embalagem
  function removerEmbalagem(e) {
    const id = e.currentTarget.getAttribute('data-id');
    
    if (confirm('Tem certeza que deseja remover esta embalagem?')) {
      embalagens = embalagens.filter(embalagem => embalagem.id !== id);
      renderizarEmbalagens();
    }
  }
  
  // Event Listeners
  adicionarBtn.addEventListener('click', () => abrirModal());
  closeModal.addEventListener('click', fecharModal);
  cancelarBtn.addEventListener('click', fecharModal);
  form.addEventListener('submit', salvarEmbalagem);
  
  // Fechar o modal ao clicar fora dele
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });
  
  // Inicializar a lista de embalagens
  renderizarEmbalagens();
});
