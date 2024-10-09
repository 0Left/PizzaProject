const pizzaListElement = document.getElementById('pizza-list');
const cartItemsElement = document.getElementById('cart-items');
let cart = [];

// Função para buscar pizzas da API
async function fetchPizzas() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyQUVvfPQ79Mb3z2ViXsHUeo58ndClKISFlFBQNCmlSXLqhXXwW2IJpaqJuqwIfhN9y/exec?key=chaveDeAcesso&modo=get');
        const pizzas = await response.json();
        renderPizzaList(pizzas);
    } catch (error) {
        console.error('Erro ao buscar as pizzas:', error);
        alert('Não foi possível carregar o cardápio. Tente novamente mais tarde.');
    }
}

// Função para renderizar a lista de pizzas
function renderPizzaList(pizzas) {
    pizzas.forEach((pizza, index) => {
        const pizzaElement = document.createElement('li');
        pizzaElement.textContent = `${pizza.nome} - ${pizza.valor}`;
        pizzaElement.addEventListener('click', () => showPizzaDetails(pizza));
        pizzaListElement.appendChild(pizzaElement);
    });
}

// Função para exibir os detalhes da pizza
function showPizzaDetails(pizza) {
    document.getElementById('pizza-name').textContent = pizza.nome;
    document.getElementById('pizza-ingredients').textContent = `Ingredientes: ${pizza.ingredientes}`;
    document.getElementById('pizza-price').textContent = `Preço: ${pizza.valor}`;
    
    // Adicionar a imagem da pizza no Bloco 2
    const pizzaImage = document.getElementById('pizza-image');
    pizzaImage.src = pizza.imagem; // Define o caminho da imagem da pizza
    
    // Mostrar o bloco 2 e esconder o bloco 1
    document.getElementById('bloco1').classList.add('hidden');
    document.getElementById('bloco2').classList.remove('hidden');

    // Adicionar evento ao botão "Adicionar ao carrinho"
    document.getElementById('add-to-cart').onclick = function() {
        addToCart(pizza);
    };
}

// Função para adicionar pizza ao carrinho
function addToCart(pizza) {
    // Verificar se a pizza já está no carrinho
    const existingPizza = cart.find(item => item.pizza.nome === pizza.nome);
    
    if (existingPizza) {
        existingPizza.quantity++; // Incrementa a quantidade
    } else {
        cart.push({ pizza: pizza, quantity: 1 }); // Adiciona a pizza com quantidade 1
    }

    renderCart();
    document.getElementById('bloco2').classList.add('hidden');
    document.getElementById('bloco1').classList.remove('hidden');
}

// Função para renderizar o carrinho
function renderCart() {
    cartItemsElement.innerHTML = ''; // Limpar o carrinho antes de renderizar
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('li');

        // Quantidade da pizza
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', function() {
            updateQuantity(index, quantityInput.value);
        });

        // Botão remover
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', function() {
            removeFromCart(index);
        });

        // Montar o item no carrinho
        cartItemElement.textContent = `${item.pizza.nome} - ${item.pizza.valor}`;
        cartItemElement.appendChild(quantityInput);
        cartItemElement.appendChild(removeButton);
        cartItemsElement.appendChild(cartItemElement);
    });
}
// Função para voltar ao Bloco 1 (lista de pizzas)
document.getElementById('back-to-list').onclick = function() {
    document.getElementById('bloco2').classList.add('hidden'); // Esconde o Bloco 2
    document.getElementById('bloco1').classList.remove('hidden'); // Mostra o Bloco 1
}
document.getElementById('back-to-list2').onclick = function() {
    document.getElementById('bloco3').classList.add('hidden'); // Esconde o Bloco 2
    document.getElementById('bloco1').classList.remove('hidden'); // Mostra o Bloco 1
}
// Função para atualizar a quantidade de um item no carrinho
function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    renderCart();
}

// Função para remover pizza do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); // Remove a pizza da lista
    renderCart(); // Re-renderiza o carrinho
}

// Limpar o carrinho
document.getElementById('clear-cart').onclick = function() {
    cart = [];
    renderCart();
};
// Função para abrir o Bloco 3 (carrinho)
document.getElementById('open-cart').onclick = function() {
    document.getElementById('bloco1').classList.add('hidden'); // Esconde o Bloco 1
    document.getElementById('bloco3').classList.remove('hidden'); // Mostra o Bloco 3 (carrinho)
};
// Inicializar e buscar a lista de pizzas
fetchPizzas();
