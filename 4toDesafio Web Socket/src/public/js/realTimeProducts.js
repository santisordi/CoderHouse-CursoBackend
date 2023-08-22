const socket = io();

const from = document.getElementById('formProduct');

from.addEventListener('submit', (e) => {
     e.preventDefault();
     const datForm = new FormData(e.target);
     const prod = Object.fromEntries(datForm); // dado un objeto iterable devuevlo los datos en un obj simple
    socket.emit('nuevoProducto', prod);

    socket.on('mensajeProductoCreado', (mensaje)=>{
        
        Swal.fire(
          mensaje
        );
    });
    e.target.reset();
    
});