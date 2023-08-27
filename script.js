var carrito = [];
var totalCompra = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
    var producto = {
        nombre: nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad)
    };
    carrito.push(producto);
    totalCompra += producto.precio * producto.cantidad;
    actualizarCarrito();
  

    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("btn-pago").disabled = false;
}

function validarProducto() {
    var productoInput = document.getElementById("producto");
    var productoValue = productoInput.value;
    var letras = /^[A-Za-z\s]+$/;

    if (!productoValue.match(letras)) {
        alert("Por favor, ingrese solo letras en el campo de Producto.");
        productoInput.value = "";
        return false;
    }
    return true;
}

function validarValorMayorCero(input) {
    var valor = parseFloat(input.value);
    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, ingrese un valor numérico mayor que cero.");
        input.value = "";
        return false;
    }
    return true;
}

// Evento para el botón "Agregar"
document.getElementById("btn-agregar").addEventListener("click", function() {
    if (validarProducto() && validarValorMayorCero(document.getElementById("precio")) && validarValorMayorCero(document.getElementById("cantidad"))) {
        var producto = document.getElementById("producto").value;
        var precio = document.getElementById("precio").value;
        var cantidad = document.getElementById("cantidad").value;

        // Verificar si los campos están vacíos
        if (producto === "" || precio === "" || cantidad === "") {
            alert("Por favor, complete todos los campos antes de agregar un producto.");
            return; // Detener la ejecución
        }
    
        if (validarProducto()) {
            agregarAlCarrito(producto, parseFloat(precio), parseInt(cantidad));

            // Limpiar los campos
            document.getElementById("producto").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("cantidad").value = "";

        }
    }
});

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
    var carritoTabla = document.getElementById("carrito").getElementsByTagName('tbody')[0];
    carritoTabla.innerHTML = "";

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var fila = carritoTabla.insertRow();

        var nombreCell = fila.insertCell(0);
        nombreCell.innerHTML = producto.nombre;

        var precioCell = fila.insertCell(1);
        precioCell.innerHTML = "$" + producto.precio.toFixed(2);

        var cantidadCell = fila.insertCell(2);
        cantidadCell.innerHTML = producto.cantidad;

        var subtotalCell = fila.insertCell(3);
        subtotalCell.innerHTML = "$" + (producto.precio * producto.cantidad).toFixed(2);
    }

    var totalCell = document.getElementById("total");
    totalCell.innerHTML = "$" + totalCompra.toFixed(2);
}

// Evento para botón de pago
document.getElementById("btn-pago").addEventListener("click", function() {
    var montoCobrado = parseFloat(prompt("Ingrese el monto cobrado:"));
    var cambio = montoCobrado - totalCompra;

    
    if (montoCobrado < totalCompra) {
        alert("¡Aquí faltan gente!");
        return; 
    }

    var mensaje = "Resumen de la Orden:\n\n";
    for (var i = 0; i < carrito.length; i++) {
        mensaje += carrito[i].nombre + " x " + carrito[i].cantidad + ": $" + (carrito[i].precio * carrito[i].cantidad).toFixed(2) + "\n";
    }
    mensaje += "\nTotal: $" + totalCompra.toFixed(2) + "\n";
    mensaje += "Monto Cobrado: $" + montoCobrado.toFixed(2) + "\n";
    mensaje += "Cambio: $" + cambio.toFixed(2);

    var popup = document.getElementById("popup");
    popup.innerText = mensaje;
    popup.style.display = "block";
});

// Evento para cerrar ventana emergente
document.getElementById("btn-cerrar").addEventListener("click", function() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
    carrito = [];
    totalCompra = 0;
    actualizarCarrito();
});
