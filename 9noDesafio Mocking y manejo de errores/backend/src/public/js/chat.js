const socket = io();

const botonChat = document.getElementById('botonChat');
const parrafosMensajes = document.getElementById('parrafosMensajes');
const valInput = document.getElementById('chatBox');
let user

Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un nombre de usuario valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

botonChat.addEventListener('click', ()=>{
    let fechaActual = new Date().toLocaleDateString(); //pongo la fecha y hora en el msj

    if(valInput.value.trim().length > 0) { //con el trim evito que me envien un mensaje con espacios vacios
        socket.emit('mensaje', { fecha: fechaActual, user:user, mensaje: valInput.value})
        valInput.value = "" //limpio el input del chat
    }   
});

socket.on('mensajes', arrayMensajes => {
    parrafosMensajes.innerHTML = "" //Limio el html
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.fecha} ${mensaje.user} escribio ${mensaje.mensaje}</p>`
        //forma con desestructuracion
        // const { fecha, user, mensaje } = mensaje;
        // parrrafosMensajes.innerHTML += `<p>${fecha} : ${user} escribrio ${mensaje}</p>`
    });
});
