window.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.getElementById('produtoForm');
    const produtosElement = document.getElementById('produtos');
  
    // Função para obter todos os produtos
    const getProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();
        produtosElement.innerHTML = '';
  
        produtos.forEach((produto) => {
          const produtoElement = document.createElement('div');
          produtoElement.className = 'produto';
  
          const nomeElement = document.createElement('h3');
          nomeElement.textContent = produto.nome;
          produtoElement.appendChild(nomeElement);
  
          const precoElement = document.createElement('p');
          precoElement.textContent = `Preço: R$ ${produto.preco}`;
          produtoElement.appendChild(precoElement);
  
          const descricaoElement = document.createElement('p');
          descricaoElement.textContent = `Descrição: ${produto.descricao}`;
          produtoElement.appendChild(descricaoElement);
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Deletar';
          deleteButton.addEventListener('click', () => {
            deletarProduto(produto.id);
          });
          produtoElement.appendChild(deleteButton);
  
          produtosElement.appendChild(produtoElement);
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    // Função para adicionar um produto
    const adicionarProduto = async (produtoData) => {
      try {
        const response = await fetch('http://localhost:3000/produtos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(produtoData),
        });
  
        if (response.ok) {
          alert('Produto adicionado com sucesso!');
          getProdutos();
          produtoForm.reset();
        } else {
          alert('Ocorreu um erro ao adicionar o produto.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Função para deletar um produto
    const deletarProduto = async (produtoId) => {
      try {
        const response = await fetch(`http://localhost:3000/produtos/${produtoId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          alert('Produto deletado com sucesso!');
          getProdutos();
        } else {
          alert('Ocorreu um erro ao deletar o produto.');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Manipulador de evento para o envio do formulário
    produtoForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const preco = document.getElementById('preco').value;
      const descricao = document.getElementById('descricao').value;
  
      const produtoData = {
        nome,
        preco,
        descricao,
      };
  
      adicionarProduto(produtoData);
    });
  
    // Obter todos os produtos ao carregar a página
    getProdutos();
  });
  