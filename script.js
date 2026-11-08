const productos = [
    {id:1,nombre:"Arroz 1 kg",precio:28,categoria:"Alimentos",emoji:"🍚"},
    {id:2,nombre:"Frijol negro 1 kg",precio:35,categoria:"Alimentos",emoji:"🫘"},
    {id:3,nombre:"Azúcar 1 kg",precio:29,categoria:"Alimentos",emoji:"🧂"},
    {id:4,nombre:"Aceite vegetal 1 L",precio:42,categoria:"Alimentos",emoji:"🫒"},
    {id:5,nombre:"Harina de trigo",precio:24,categoria:"Alimentos",emoji:"🌾"},
    {id:6,nombre:"Pasta para sopa",precio:16,categoria:"Alimentos",emoji:"🍝"},
    {id:7,nombre:"Atún en lata",precio:23,categoria:"Alimentos",emoji:"🐟"},
    {id:8,nombre:"Avena 500 g",precio:32,categoria:"Alimentos",emoji:"🥣"},
    {id:9,nombre:"Cereal familiar",precio:65,categoria:"Alimentos",emoji:"🥣"},
    {id:10,nombre:"Galletas",precio:22,categoria:"Alimentos",emoji:"🍪"},
    {id:11,nombre:"Leche 1 L",precio:27,categoria:"Bebidas",emoji:"🥛"},
    {id:12,nombre:"Jugo de naranja",precio:30,categoria:"Bebidas",emoji:"🧃"},
    {id:13,nombre:"Agua 1.5 L",precio:18,categoria:"Bebidas",emoji:"💧"},
    {id:14,nombre:"Refresco 2 L",precio:38,categoria:"Bebidas",emoji:"🥤"},
    {id:15,nombre:"Café soluble",precio:89,categoria:"Bebidas",emoji:"☕"},
    {id:16,nombre:"Té de manzanilla",precio:35,categoria:"Bebidas",emoji:"🍵"},
    {id:17,nombre:"Bebida deportiva",precio:28,categoria:"Bebidas",emoji:"🧃"},
    {id:18,nombre:"Chocolate en polvo",precio:58,categoria:"Bebidas",emoji:"🍫"},
    {id:19,nombre:"Agua mineral",precio:20,categoria:"Bebidas",emoji:"🫧"},
    {id:20,nombre:"Leche deslactosada",precio:32,categoria:"Bebidas",emoji:"🥛"},
    {id:21,nombre:"Detergente para ropa",precio:78,categoria:"Limpieza",emoji:"🧺"},
    {id:22,nombre:"Jabón para trastes",precio:32,categoria:"Limpieza",emoji:"🧽"},
    {id:23,nombre:"Cloro 1 L",precio:24,categoria:"Limpieza",emoji:"🧴"},
    {id:24,nombre:"Limpiador de pisos",precio:39,categoria:"Limpieza",emoji:"🪣"},
    {id:25,nombre:"Esponjas",precio:20,categoria:"Limpieza",emoji:"🧽"},
    {id:26,nombre:"Bolsas para basura",precio:35,categoria:"Limpieza",emoji:"🗑️"},
    {id:27,nombre:"Suavizante de ropa",precio:55,categoria:"Limpieza",emoji:"🧺"},
    {id:28,nombre:"Limpiavidrios",precio:42,categoria:"Limpieza",emoji:"🪟"},
    {id:29,nombre:"Desinfectante",precio:36,categoria:"Limpieza",emoji:"🧴"},
    {id:30,nombre:"Toallas de papel",precio:32,categoria:"Limpieza",emoji:"🧻"},
    {id:31,nombre:"Jabón corporal",precio:25,categoria:"Higiene",emoji:"🧼"},
    {id:32,nombre:"Shampoo",precio:58,categoria:"Higiene",emoji:"🧴"},
    {id:33,nombre:"Acondicionador",precio:60,categoria:"Higiene",emoji:"🧴"},
    {id:34,nombre:"Pasta dental",precio:39,categoria:"Higiene",emoji:"🦷"},
    {id:35,nombre:"Cepillo dental",precio:28,categoria:"Higiene",emoji:"🪥"},
    {id:36,nombre:"Desodorante",precio:48,categoria:"Higiene",emoji:"🌸"},
    {id:37,nombre:"Papel higiénico",precio:49,categoria:"Higiene",emoji:"🧻"},
    {id:38,nombre:"Crema corporal",precio:65,categoria:"Higiene",emoji:"🧴"},
    {id:39,nombre:"Gel para cabello",precio:35,categoria:"Higiene",emoji:"💈"},
    {id:40,nombre:"Toallas húmedas",precio:29,categoria:"Higiene",emoji:"🧻"},
    {id:41,nombre:"Manzanas 1 kg",precio:42,categoria:"Alimentos",emoji:"🍎"},
    {id:42,nombre:"Plátanos 1 kg",precio:28,categoria:"Alimentos",emoji:"🍌"},
    {id:43,nombre:"Naranjas 1 kg",precio:32,categoria:"Alimentos",emoji:"🍊"},
    {id:44,nombre:"Jitomate 1 kg",precio:35,categoria:"Alimentos",emoji:"🍅"},
    {id:45,nombre:"Papa 1 kg",precio:30,categoria:"Alimentos",emoji:"🥔"},
    {id:46,nombre:"Huevo 12 piezas",precio:48,categoria:"Alimentos",emoji:"🥚"},
    {id:47,nombre:"Queso 400 g",precio:68,categoria:"Alimentos",emoji:"🧀"},
    {id:48,nombre:"Yogur 1 L",precio:45,categoria:"Alimentos",emoji:"🥛"},
    {id:49,nombre:"Pan de caja",precio:42,categoria:"Alimentos",emoji:"🍞"},
    {id:50,nombre:"Mayonesa",precio:38,categoria:"Alimentos",emoji:"🥪"}
];

const ofertas = [1, 4, 7, 11, 14, 21, 31, 41];

let categoriaActual = "Todos";
let terminoBusqueda = "";
let carrito = cargarCarrito();

function cargarCarrito() {
    try {
        const guardado = JSON.parse(localStorage.getItem("nahoCarrito") || "[]");
        if (!Array.isArray(guardado)) return [];

        return guardado.filter(item =>
            productos.some(p => p.id === item.id) &&
            Number.isInteger(item.cantidad) &&
            item.cantidad > 0
        );
    } catch {
        return [];
    }
}

function guardarCarrito() {
    localStorage.setItem("nahoCarrito", JSON.stringify(carrito));
}

function precioProducto(producto) {
    return ofertas.includes(producto.id)
        ? Math.round(producto.precio * 0.9 * 100) / 100
        : producto.precio;
}

function dinero(cantidad) {
    return cantidad.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
    }) + " MXN";
}

function crearTarjeta(producto) {
    const oferta = ofertas.includes(producto.id);
    const precio = precioProducto(producto);

    return `
        <article class="producto">
            <div class="producto-imagen">${producto.emoji}</div>
            ${oferta ? '<span class="etiqueta">🔥 Oferta -10%</span>' : ""}
            <span class="categoria-texto">${producto.categoria}</span>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">Producto de supermercado. Disponible en Naho Market.</p>
            <div class="precio">
                ${dinero(precio)}
                ${oferta ? `<span class="precio-anterior">${dinero(producto.precio)}</span>` : ""}
            </div>
            <button onclick="agregarCarrito(${producto.id})">＋ Agregar al carrito</button>
        </article>
    `;
}

function mostrarProductos(lista = productos) {
    const contenedor = document.getElementById("lista-productos");

    if (!lista.length) {
        contenedor.innerHTML = "<p>No encontramos productos con esa búsqueda.</p>";
        return;
    }

    contenedor.innerHTML = lista.map(crearTarjeta).join("");
}

function mostrarOfertas() {
    const lista = productos.filter(p => ofertas.includes(p.id));

    document.getElementById("lista-ofertas").innerHTML =
        lista.map(crearTarjeta).join("");
}

function aplicarFiltros() {
    const lista = productos.filter(p => {
        const coincideCategoria =
            categoriaActual === "Todos" || p.categoria === categoriaActual;

        const texto = `${p.nombre} ${p.categoria}`.toLowerCase();
        const coincideBusqueda = texto.includes(terminoBusqueda.toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });

    mostrarProductos(lista);
}

function filtrarCategoria(categoria) {
    categoriaActual = categoria;
    aplicarFiltros();

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
}

function buscarProductos() {
    terminoBusqueda = document.getElementById("busqueda").value.trim();
    aplicarFiltros();

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("busqueda").addEventListener("keydown", event => {
    if (event.key === "Enter") buscarProductos();
});

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id, cantidad: 1 });
    }

    guardarCarrito();
    actualizarCarrito();

    document.getElementById("mensaje").textContent =
        `${producto.nombre} se agregó al carrito.`;
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarCarrito();
}

function actualizarCarrito() {
    const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);

    const subtotal = carrito.reduce((suma, item) => {
        const producto = productos.find(p => p.id === item.id);
        return suma + (producto ? precioProducto(producto) * item.cantidad : 0);
    }, 0);

    const envio = subtotal === 0 || subtotal >= 500 ? 0 : 49;
    const total = subtotal + envio;

    document.getElementById("contador").textContent = cantidad;
    document.getElementById("subtotal-carrito").textContent = dinero(subtotal);
    document.getElementById("total-carrito").textContent = dinero(total);

    const envioElemento = document.getElementById("envio-carrito");
    if (envioElemento) {
        envioElemento.textContent = envio === 0
            ? "Gratis"
            : dinero(envio);
    }

    const contenedor = document.getElementById("lista-carrito");

    if (!carrito.length) {
        contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        return;
    }

    contenedor.innerHTML = carrito.map(item => {
        const p = productos.find(producto => producto.id === item.id);
        if (!p) return "";

        return `
            <div class="item-carrito">
                <span class="emoji">${p.emoji}</span>
                <div class="detalle">
                    <strong>${p.nombre}</strong>
                    <p>${dinero(precioProducto(p))} por unidad</p>
                    <strong>${dinero(precioProducto(p) * item.cantidad)}</strong>
                </div>
                <div class="cantidad">
                    <button onclick="cambiarCantidad(${p.id}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${p.id}, 1)">＋</button>
                </div>
                <button class="boton-eliminar" onclick="eliminarDelCarrito(${p.id})">Quitar</button>
            </div>
        `;
    }).join("");
}

function verCarrito() {
    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });
}

function vaciarCarrito() {
    if (!carrito.length) {
        alert("El carrito ya está vacío.");
        return;
    }

    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    }
}

function abrirModal(id) {
    document.getElementById(id).classList.add("visible");
}

function cerrarModal(id) {
    document.getElementById(id).classList.remove("visible");
}

function abrirLogin() {
    abrirModal("modalLogin");
}

function cerrarSesion() {
    sessionStorage.removeItem("nahoUsuario");
    actualizarUsuario();

    document.getElementById("mensajeLogin").textContent =
        "Sesión cerrada.";
}

function actualizarUsuario() {
    const usuario = sessionStorage.getItem("nahoUsuario");
    const boton = document.getElementById("botonUsuario");

    if (usuario) {
        boton.textContent = `👤 ${usuario}`;
        boton.title = "Pulsa dos veces para cerrar sesión";
    } else {
        boton.textContent = "👤 Iniciar sesión";
        boton.title = "";
    }
}

document.getElementById("formLogin").addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("correoUsuario").value.trim();
    const contrasena = document.getElementById("contrasenaUsuario").value;

    if (!nombre || !correo || contrasena.length < 4) {
        document.getElementById("mensajeLogin").textContent =
            "Revisa tus datos e intenta de nuevo.";
        return;
    }

    sessionStorage.setItem("nahoUsuario", nombre);
    actualizarUsuario();

    document.getElementById("mensajeLogin").textContent =
        `¡Bienvenido/a, ${nombre}! Sesión de demostración iniciada.`;

    event.target.reset();
});

document.getElementById("botonUsuario").addEventListener("dblclick", () => {
    cerrarSesion();
});

function abrirPago() {
    if (!carrito.length) {
        alert("Agrega al menos un producto antes de continuar.");
        return;
    }

    document.getElementById("total-pago").textContent =
        document.getElementById("total-carrito").textContent;

    const usuario = sessionStorage.getItem("nahoUsuario");

    if (usuario) {
        document.getElementById("nombreEntrega").value = usuario;
    }

    document.getElementById("mensajePago").textContent = "";
    abrirModal("modalPago");
}

document.getElementById("formPago").addEventListener("submit", event => {
    event.preventDefault();

    if (!carrito.length) {
        cerrarModal("modalPago");
        alert("Tu carrito está vacío.");
        return;
    }

    const nombre = document.getElementById("nombreEntrega").value.trim();
    const direccion = document.getElementById("direccionEntrega").value.trim();
    const metodo = document.getElementById("metodoPago").value;

    const correoInput = document.getElementById("correoEntrega");
    const correo = correoInput ? correoInput.value.trim() : "";

    if (!nombre || !direccion || !metodo) {
        document.getElementById("mensajePago").textContent =
            "Completa tu nombre, dirección y método de pago.";
        return;
    }

    const subtotal = carrito.reduce((suma, item) => {
        const producto = productos.find(p => p.id === item.id);
        return suma + (producto ? precioProducto(producto) * item.cantidad : 0);
    }, 0);

    const envio = subtotal === 0 || subtotal >= 500 ? 0 : 49;
    const total = subtotal + envio;

    const folio = "NAHO-" + Date.now().toString().slice(-8);

    const detalleProductos = carrito.map(item => {
        const producto = productos.find(p => p.id === item.id);
        if (!producto) return "";

        const precio = precioProducto(producto);

        return `• ${producto.nombre} x${item.cantidad} — ${dinero(precio * item.cantidad)}`;
    }).filter(Boolean).join("\n");

    const mensaje = [
        "🛒 *NUEVO PEDIDO - NAHO MARKET*",
        `Folio: ${folio}`,
        "",
        "*Productos:*",
        detalleProductos,
        "",
        `Subtotal: ${dinero(subtotal)}`,
        `Envío: ${envio === 0 ? "Gratis" : dinero(envio)}`,
        `*TOTAL: ${dinero(total)}*`,
        "",
        "*Datos del cliente:*",
        `Nombre: ${nombre}`,
        `Dirección de entrega: ${direccion}`,
        correo ? `Correo: ${correo}` : "",
        `Método de pago preferido: ${metodo}`,
        "",
        "Por favor, confirma disponibilidad, costo de envío y total final. Este mensaje no representa un pago realizado."
    ].filter(Boolean).join("\n");

    const whatsappURL =
        `https://wa.me/528994957051?text=${encodeURIComponent(mensaje)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    document.getElementById("mensajePago").textContent =
        "Se abrió WhatsApp con tu pedido. Revisa el mensaje y pulsa Enviar para confirmarlo.";

    cerrarModal("modalPago");

    // El carrito se conserva hasta que el cliente confirme el envío del mensaje.
});

const botonEnviarPedido = document.querySelector(
    '#formPago button[type="submit"]'
);

if (botonEnviarPedido) {
    botonEnviarPedido.textContent = "Enviar pedido por WhatsApp";
}

function alternarChat() {
    const ventana = document.getElementById("ventanaChat");

    ventana.classList.toggle("visible");

    if (ventana.classList.contains("visible")) {
        document.getElementById("entradaChat").focus();
    }
}

function responderDuda(texto) {
    const pregunta = texto.toLowerCase();

    if (/hola|buenas|buenos días|buenas tardes/.test(pregunta)) {
        return "¡Hola! 😊 Bienvenido/a a Naho Market. ¿En qué puedo ayudarte?";
    }

    if (/precio|cuesta|costo|barato/.test(pregunta)) {
        return "Los precios aparecen en cada producto. También tenemos ofertas con descuentos del 10%.";
    }

    if (/pago|tarjeta|transferencia|efectivo/.test(pregunta)) {
        return "Puedes seleccionar tu método de pago preferido al finalizar el pedido. El pago se confirma directamente con Naho Market.";
    }

    if (/entrega|envío|envio|domicilio|dirección|direccion/.test(pregunta)) {
        return "En la pantalla de pedido puedes escribir tu dirección de entrega. La disponibilidad y el costo se confirman por WhatsApp.";
    }

    if (/pedido|compra|carrito|comprar/.test(pregunta)) {
        return "Agrega tus productos al carrito, completa tus datos y envía tu pedido directamente por WhatsApp a Naho Market.";
    }

    if (/producto|catálogo|catalogo|categoría|categoria/.test(pregunta)) {
        return "Tenemos 50 productos en alimentos, bebidas, limpieza e higiene personal. Usa el buscador o las categorías para encontrarlos.";
    }

    if (/horario|abren|abierto/.test(pregunta)) {
        return "Los horarios de atención no están configurados todavía. Puedes consultar directamente con el administrador.";
    }

    if (/gracias/.test(pregunta)) {
        return "¡Con gusto! Gracias por visitar Naho Market. ❤️";
    }

    return "Gracias por tu pregunta. Soy el asistente automático de Naho Market. Puedes consultarme sobre productos, precios, pedidos y entregas.";
}

function agregarMensajeChat(texto, tipo) {
    const contenedor = document.getElementById("mensajesChat");
    const mensaje = document.createElement("div");

    mensaje.className =
        tipo === "usuario" ? "mensaje-usuario" : "mensaje-bot";

    mensaje.textContent = texto;

    contenedor.appendChild(mensaje);
    contenedor.scrollTop = contenedor.scrollHeight;
}

document.getElementById("formChat").addEventListener("submit", event => {
    event.preventDefault();

    const entrada = document.getElementById("entradaChat");
    const pregunta = entrada.value.trim();

    if (!pregunta) return;

    agregarMensajeChat(pregunta, "usuario");
    agregarMensajeChat(responderDuda(pregunta), "bot");

    entrada.value = "";
    entrada.focus();
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("visible");
        }
    });
});

// INICIALIZACIÓN
mostrarProductos();
mostrarOfertas();
actualizarCarrito();
actualizarUsuario();