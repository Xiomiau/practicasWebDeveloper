let ataqueJugador
let ataqueContrario
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {

    let seccionAtaque = document.querySelector('#atack');
    seccionAtaque.style.display='none';
    
    


    let botonMascotaJugador = document.querySelector('#boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    let botonFuego=document.querySelector('#boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua=document.querySelector('#boton-agua');
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra=document.querySelector('#boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);

    let botonReiniciar = document.querySelector('#reiniciarBtn');
    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonReiniciar.style.display= 'none';
    

}


function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function seleccionarMascotaJugador() {

    let seccionAtaque = document.querySelector('#atack');
    seccionAtaque.style.display='flex';

    let seccionMascota = document.querySelector('#pet');
    seccionMascota.style.display='none';

    // apuntadores de las mascotas
    const hipodoge = document.querySelector('#hipodoge');
    const capipepo = document.querySelector('#capipepo');
    const ratigueya = document.querySelector('#ratigueya');
    const langostelvis = document.querySelector('#langostelvis');
    const tucapalma = document.querySelector('#tucapalma');
    const pydos = document.querySelector('#pydos');
    const spanMascotaJugador=document.querySelector('#mascota-jugador');

    // Condicional para mensaje de elección de mascota
    if(hipodoge.checked) {
        //alert("Seleccionaste a: Hipodoge");
        spanMascotaJugador.innerHTML="Hipodoge"
    } else if (capipepo.checked) {
        //alert("Seleccionaste a: Capipepo");
        spanMascotaJugador.innerHTML="Capipepo"
    } else if (ratigueya.checked) {
        //alert("Seleccionaste a: Ratigueya");
        spanMascotaJugador.innerHTML="Ratigueya"
    } else if (langostelvis.checked) {
        //alert("Seleccionaste a: Langostelvis");
        spanMascotaJugador.innerHTML="Langostelvis"
    } else if (tucapalma.checked) {
        //alert("Seleccionaste a: Tucapalma");
        spanMascotaJugador.innerHTML="Tucapalma"
    } else if (pydos.checked) {
        //alert("Seleccionaste a: Pydos");
        spanMascotaJugador.innerHTML="Pydos"
    }
    else {
        alert('Primero debes elegir tu combatiente')
        reiniciarJuego()
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigo = aleatorio(1,6);
    let spanMascotaEnemigo = document.querySelector('#mascota-enemigo')
    
    if(mascotaEnemigo==1) {
        spanMascotaEnemigo.innerHTML="Hipodogue"
    } else if (mascotaEnemigo==2){
        spanMascotaEnemigo.innerHTML="Capipepo"
    } else if (mascotaEnemigo==3){
        spanMascotaEnemigo.innerHTML="Ratigueya"
    } else if (mascotaEnemigo==4){
        spanMascotaEnemigo.innerHTML="Langostelvis"
    }else if (mascotaEnemigo==5){
        spanMascotaEnemigo.innerHTML="Tucapalma"
    }else if (mascotaEnemigo==6){
        spanMascotaEnemigo.innerHTML="Pydos"
    }
}

function ataqueFuego (){
    ataqueJugador = 'FUEGO 🔥';
    ataqueEnemigo()
    //alert("Elegiste ataque " + ataqueJugador);
}

function ataqueAgua (){
    ataqueJugador = 'AGUA 💧';
    ataqueEnemigo()
    //alert("Elegiste ataque " + ataqueJugador);
}

function ataqueTierra (){
    ataqueJugador = 'TIERRA 🌿';
    ataqueEnemigo()
    //alert("Elegiste ataque " + ataqueJugador);
    
}

function ataqueEnemigo() {
    ataqueContrario = aleatorio(1,3);

    if(ataqueContrario == 1){
        ataqueContrario ='FUEGO 🔥';
        //alert(`Tu enemigo eligió ataque FUEGO`);
        } else if (ataqueContrario == 2) {
            ataqueContrario ='AGUA 💧';
        //alert(`Tu enemigo eligió ataque AGUA`);
        } else if (ataqueContrario == 3){
            ataqueContrario = 'TIERRA 🌿';
            //alert(`Tu enemigo eligió ataque TIERRA`);
        }

        combate()
}


function combate() {

    let spanVidaJugador = document.querySelector('#spanVidaJugador');
    let spanVidaEnemigo = document.querySelector('#spanVidaEnemigo');

    if(ataqueContrario == ataqueJugador) {
        crearMensaje('EMPATE');
    } 
        else if(ataqueJugador == 'FUEGO 🔥' && ataqueContrario == 'TIERRA 🌿') {
        crearMensaje('GANASTE');
        vidasEnemigo--
        spanVidaEnemigo.innerHTML = vidasEnemigo;
    } 

        else if (ataqueJugador =='AGUA 💧' && ataqueContrario == 'FUEGO 🔥'){
        crearMensaje('GANASTE');
        vidasEnemigo--
        spanVidaEnemigo.innerHTML = vidasEnemigo;
    } 

        else if (ataqueJugador == 'TIERRA 🌿' && ataqueContrario =='AGUA 💧'){
        crearMensaje('GANASTE');
        vidasEnemigo--
        spanVidaEnemigo.innerHTML = vidasEnemigo;
        }

        else {
        crearMensaje('PERDISTE');
        vidasJugador--
        spanVidaJugador.innerHTML = vidasJugador;
    }
        revisarVidas()
}

function revisarVidas(){
    if(vidasJugador==0){
        crearMensajeFinal('Oww Perdiste 😢');
    } else if (vidasEnemigo==0){
        crearMensajeFinal('GANASTE 🥳');

    }
}

function crearMensaje(resultado) {

    let mensajesSection = document.querySelector('#mensajes');

    let = parrafo = document.createElement('p')
    parrafo.innerHTML= 'Tu mokepon atacó con '+  ataqueJugador + ' el enemigo atacó con ' + ataqueContrario + '- ' + resultado ;
    mensajesSection.appendChild(parrafo);

    
}

function crearMensajeFinal(resultadoFinal) {

    let mensajesSection = document.querySelector('#mensajes');
    let botonReiniciar = document.querySelector('#reiniciarBtn');


    let parrafoResultadoFinal = document.createElement('p');
    parrafoResultadoFinal.setAttribute('id','resultadoFinal')
    parrafoResultadoFinal.innerHTML= resultadoFinal;
    mensajesSection.appendChild(parrafoResultadoFinal);

    let botonFuego=document.querySelector('#boton-fuego');
    botonFuego.disabled=true;
    let botonAgua=document.querySelector('#boton-agua');
    botonAgua.disabled=true;
    let botonTierra=document.querySelector('#boton-tierra');
    botonTierra.disabled=true; 
    botonReiniciar.style.display= 'block';
}


function reiniciarJuego() {
    location.reload()
}

window.addEventListener('load',  iniciarJuego);
