let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    var messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('d-none');
    messageContainer.textContent = product + " adicionado ao carrinho com sucesso!";
    
    setTimeout(function() {
        messageContainer.classList.add('d-none');
    }, 3000); // Oculta a mensagem após 3 segundos

    updateCart();
}

function updateCart() {
    if (document.getElementById('cart-items')) {
        var cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach(function(item) {
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = item;
            cartItems.appendChild(li);
        });

        // Atualiza a visibilidade da imagem da sacola vazia
        var emptyCartImage = document.getElementById('empty-cart');
        if (cart.length === 0) {
            emptyCartImage.classList.remove('d-none');
        } else {
            emptyCartImage.classList.add('d-none');
        }
    }
}

function checkout() {
    if (cart.length === 0) {
        var emptyMessage = document.getElementById('empty-message');
        emptyMessage.classList.remove('d-none');
        setTimeout(function() {
            emptyMessage.classList.add('d-none');
        }, 3000); // Oculta a mensagem após 3 segundos
        return;
    }

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    var checkoutMessage = document.getElementById('checkout-message');
    checkoutMessage.classList.remove('d-none');
    setTimeout(function() {
        checkoutMessage.classList.add('d-none');
    }, 3000); // Oculta a mensagem após 3 segundos

    document.getElementById('empty-cart').classList.remove('d-none');
}

// function loginUser() {
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     if (username === "user" && password === "password") {
//         alert("Login bem-sucedido!");
//         window.location.href = "index.html";
//         return false;
//     } else {
//         alert("Usuário ou senha incorretos.");
//         return false;
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});
