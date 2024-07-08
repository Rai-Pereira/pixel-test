function addToCart(product) {
    alert(product + " adicionado ao carrinho!");
}

function loginUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === "user" && password === "password") {
        alert("Login bem-sucedido!");
        window.location.href = "index.html";
        return false;
    } else {
        alert("Usuário ou senha incorretos.");
        return false;
    }
}
