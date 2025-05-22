
 const botoes = document.querySelectorAll('.menu a, .menu2 a');

  botoes.forEach(botao => {
    botao.addEventListener('click', function () {
      // Remove 'ativo' de todos os botões
      botoes.forEach(b => b.classList.remove('ativo'));

      // Adiciona 'ativo' ao botão clicado
      this.classList.add('ativo');
    });
  });
