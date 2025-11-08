const comidaListElement = document.getElementById('comida-list');

// Função para buscar comidas da API
async function fetchComidas() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyQUVvfPQ79Mb3z2ViXsHUeo58ndClKISFlFBQNCmlSXLqhXXwW2IJpaqJuqwIfhN9y/exec?key=chaveDeAcesso&modo=get');
        const comidas = await response.json();
        renderComidaList(comidas);
    } catch (error) {
        console.error('Erro ao buscar as comidas:', error);
        alert('Não foi possível carregar o catálogo. Tente novamente mais tarde.');
    }
}

// Função para renderizar a lista de comidas
function renderComidaList(comidas) {
    comidaListElement.innerHTML = '';
    comidas.forEach((comida, index) => {
        const comidaElement = document.createElement('li');
        comidaElement.innerHTML = `
            <div class="comida-card">
                <h3>${comida.nome}</h3>
                <p class="comida-preview">${comida.descriçãobreve || comida.descriçãoBreve || 'Sem descrição breve'}</p>
            </div>
        `;
        comidaElement.addEventListener('click', () => showComidaDetails(comida));
        comidaListElement.appendChild(comidaElement);
    });
}

// Função para exibir os detalhes da comida
function showComidaDetails(comida) {
    document.getElementById('comida-name').textContent = comida.nome;
    
    // Adicionar a imagem da comida no Bloco 2
    const comidaImage = document.getElementById('comida-image');
    if (comida.imagem) {
        comidaImage.src = comida.imagem;
        comidaImage.style.display = 'block';
    } else {
        comidaImage.style.display = 'none';
    }
    
    // Renderizar a descrição primeiro (acima dos comentários)
    document.getElementById('comida-descricao').textContent = comida.descrição || comida.descricao || 'Sem descrição disponível';
    
    // Depois renderizar comentários (se houver)
    renderComentarios(comida.comentarios || []);
    
    // Mostrar o bloco 2 e esconder o bloco 1
    document.getElementById('bloco1').classList.add('hidden');
    document.getElementById('bloco2').classList.remove('hidden');
}

// Função para renderizar comentários
function renderComentarios(comentarios) {
    const comentariosList = document.getElementById('comentarios-list');
    comentariosList.innerHTML = '';
    
    if (comentarios.length === 0) {
        comentariosList.innerHTML = '<p class="sem-comentarios">Ainda não há comentários sobre esta comida.</p>';
    } else {
        comentarios.forEach(comentario => {
            const comentarioElement = document.createElement('div');
            comentarioElement.className = 'comentario-item';
            comentarioElement.innerHTML = `
                <p class="comentario-texto">${comentario.texto || comentario}</p>
                ${comentario.data ? `<span class="comentario-data">${comentario.data}</span>` : ''}
            `;
            comentariosList.appendChild(comentarioElement);
        });
    }
}

// Função para voltar ao Bloco 1 (lista de comidas)
document.getElementById('back-to-list').onclick = function() {
    document.getElementById('bloco2').classList.add('hidden');
    document.getElementById('bloco1').classList.remove('hidden');
};

// Inicializar e buscar a lista de comidas
fetchComidas();
