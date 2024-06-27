let cart = [];
let currentItem = {};

function addToCart(item, price) {
    cart.push({ item, price });
    alert(item + " añadido al carrito");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartWindow(); // Actualiza la ventana del carrito
}

let cartWindow = null;

function openCart() {
    if (cartWindow === null || cartWindow.closed) {
        cartWindow = window.open("", "Carrito", "width=600,height=400");
    }
    updateCartWindow();
}

function updateCartWindow() {
    if (cartWindow && !cartWindow.closed) {
        cartWindow.document.open();
        cartWindow.document.write("<h1>Carrito de Compras</h1>");
        cartWindow.document.write("<ul>");
        cart.forEach((cartItem, index) => {
            cartWindow.document.write("<li>" + cartItem.item + " - " + cartItem.price.toFixed(2) + "$ <button onclick='window.opener.removeFromCart(" + index + ")'>Eliminar</button></li>");
        });
        cartWindow.document.write("</ul>");
        const total = cart.reduce((sum, cartItem) => sum + cartItem.price, 0);
        cartWindow.document.write("<p>Total: " + total.toFixed(2) + "$</p>");
        cartWindow.document.write("<button onclick='window.opener.sendOrderToWhatsApp()'>Enviar pedido por WhatsApp</button>");
        cartWindow.document.close();
    }
}

function sendOrderToWhatsApp() {
    let message = "Hola, me gustaría hacer el siguiente pedido:\n\n";
    cart.forEach(cartItem => {
        message += cartItem.item + " - " + cartItem.price.toFixed(2) + "$\n";
    });
    const total = cart.reduce((sum, cartItem) => sum + cartItem.price, 0);
    message += "\nTotal: " + total.toFixed(2) + "$";
    const phoneNumber = "123456789"; // Reemplaza con tu número de teléfono de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function chooseSize(item, smallPrice, largePrice, doublePrice = null) {
    currentItem = { item, smallPrice, largePrice, doublePrice };
    document.getElementById('item-name').innerText = item;
    document.getElementById('sizeModal').style.display = 'block';
    document.getElementById('double-option').style.display = doublePrice ? 'inline-block' : 'none';
}

function closeModal() {
    document.getElementById('sizeModal').style.display = 'none';
}

window.onload = function () {
    document.getElementById('small-option').onclick = function () {
        addToCart(currentItem.item + " (De 1/4)", currentItem.smallPrice);
        closeModal();
    };
    document.getElementById('large-option').onclick = function () {
        addToCart(currentItem.item + " (De 1/2)", currentItem.largePrice);
        closeModal();
    };
    document.getElementById('double-option').onclick = function () {
        addToCart(currentItem.item + " (De 1 litro)", currentItem.doublePrice);
        closeModal();
    };

    const viewCartButton = document.createElement("button");
    viewCartButton.textContent = "Ver Carrito";
    viewCartButton.onclick = openCart;
    document.body.appendChild(viewCartButton);
};