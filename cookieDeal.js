// Função para salvar o cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para obter o valor do cookie
function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let c = cookieArray[i].trim();
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Função para exibir o endereço salvo
function displaySavedAddress() {
    const savedAddress = getCookie("address");
    
    // Log do cookie lido
    console.log("Endereço lido do cookie:", savedAddress);
    
    if (savedAddress) {
        document.getElementById("savedAddress").innerText = `Endereço: ${savedAddress}`;
    } else {
        document.getElementById("savedAddress").innerText = "Nenhum endereço salvo.";
    }
}

// Evento de submissão do formulário para salvar o endereço
document.getElementById("addressForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const address = document.getElementById("address").value;
    
    // Log do valor de endereço antes de salvar
    console.log("Endereço inserido:", address);
    
    setCookie("address", address, 7); // Salva o endereço por 7 dias

    // Log do cookie após salvar
    console.log("Cookie salvo:", document.cookie);

    displaySavedAddress(); // Atualiza a exibição do endereço salvo
});


// Exibir o endereço salvo ao carregar a página
window.onload = function() {
    displaySavedAddress();
};