const guardarProductosLS = (contenido) => {
  localStorage.setItem("productos", JSON.stringify(contenido));
};

const obtenerProductosLS = () => {
  return JSON.parse(localStorage.getItem("productos")) || [];
};

const guardarCarritoLS = (contenido) => {
  localStorage.setItem("carrito", JSON.stringify(contenido));
};

const obtenerCarritoLS = () => {
  return JSON.parse(localStorage.getItem("carrito")) || [];
};

const obtenerIdProductoLS = () => {
    return parseInt(localStorage.getItem('id_producto')) || null;
};

const cantTotalProductos = () => {
  const carrito = obtenerCarritoLS();

  return carrito.length;
};

const eliminarCarrito = () => {
  localStorage.removeItem("carrito");
  renderCarrito();
  renderBotonCarrito();
  notificacion("Carrito Eliminado!");
};

const verProducto = (id) => {
  localStorage.setItem("producto", JSON.stringify(id));
};

const buscarProducto = () => {
  const productos = obtenerProductosLS();
  const id = obtenerIdProductoLS();
  const producto = productos.find((item) => item.id === id);

  return producto;
};

const agregarProductoCarrito = () => {
  const producto = buscarProducto();
  const carrito = obtenerCarritoLS();
  carrito.push(producto);
  guardarCarritoLS(carrito);
  renderBotonCarrito();
  notificacion("Producto Agregado!");
};

const eliminarProductoCarrito = (id) => {
  const carrito = obtenerCarritoLS();
  const carritoActualizado = carrito.filter((item) => item.id != id);
  guardarCarritoLS(carritoActualizado);
  renderCarrito();
  renderBotonCarrito();
  notificacion("Producto Eliminado!");
};

const renderBotonCarrito = () => {
  document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
};

const finalizarCompra = () => {
  Swal.fire({
    title: "Gracias por tu Compra!",
    text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
    imageUrl:
      "https://centrofranchising.com/wp-content/uploads/2018/01/CAFE-MARTINEZ-Franquicias-LOGO.png",
    imageWidth: 160,
    imageAlt: "Cafe Martinez",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarCarrito();
    }
  });
};

const notificacion = (texto) => {
  Swal.fire({
    position: "top-end",
    title: texto,
    showConfirmButton: false,
    timer: 1000,
  });
};

guardarProductosLS(contenido);
