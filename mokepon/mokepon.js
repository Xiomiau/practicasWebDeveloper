let ataqueJugador
let ataqueContrario
let vidasJugador = 3;
let vidasEnemigo = 3;


const hipodoge = document.querySelector('#hipodoge');
const capipepo = document.querySelector('#capipepo');
const ratigueya = document.querySelector('#ratigueya');
const spanMascotaJugador=document.querySelector('#mascota-jugador');


function iniciarJuego() {

    let seccionAtaque = document.querySelector('#atack');
    seccionAtaque.style.display='none';
    
    hipodoge.addEventListener('click', seleccionarMascotaJugador);
    capipepo.addEventListener('click', seleccionarMascotaJugador);
    ratigueya.addEventListener('click', seleccionarMascotaJugador);


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
    

    // Condicional para mensaje de elección de mascota
    if(hipodoge.checked) {
        seccionAtaque.style.display='flex';
        seccionMascota.style.display='none';
        spanMascotaJugador.innerHTML="Hipodoge"


    } else if (capipepo.checked) {
        seccionAtaque.style.display='flex';
        seccionMascota.style.display='none';
        spanMascotaJugador.innerHTML="Capipepo"


    } else if (ratigueya.checked) {
        seccionAtaque.style.display='flex';
        seccionMascota.style.display='none';
        spanMascotaJugador.innerHTML="Ratigueya"

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

function crearMensaje() {

    let mensajesSection = document.querySelector('#mensajes');

    let = parrafoAtaqueJugador = document.createElement('p')
    let = parrafoAtaqueEnemigo = document.createElement('p')

    parrafoAtaqueJugador.innerHTML= 'Tu mokepon atacó con '+  ataqueJugador;
    parrafoAtaqueJugador.setAttribute('class', 'parrafoAtaqueJugador');

    if (ataqueJugador=='FUEGO 🔥'){
        parrafoAtaqueJugador.style.boxShadow='1px -1px 10px 7px rgb(240, 58, 45)';
    } else if (ataqueJugador=='AGUA 💧') {
        parrafoAtaqueJugador.style.boxShadow = '1px -1px 10px 7px rgba(111,210,232,1)';
    } else if (ataqueJugador=='TIERRA 🌿') {
        parrafoAtaqueJugador.style.boxShadow = '1px -1px 10px 7px rgb(170, 84, 4)';
    }




    parrafoAtaqueEnemigo.innerHTML=' El enemigo atacó con ' + ataqueContrario;
    parrafoAtaqueEnemigo.setAttribute('class', 'parrafoAtaqueEnemigo')
    if (ataqueContrario=='FUEGO 🔥'){
        parrafoAtaqueEnemigo.style.boxShadow='1px -1px 10px 7px rgb(240, 58, 45)';
    } else if (ataqueContrario =='AGUA 💧') {
        parrafoAtaqueEnemigo.style.boxShadow = '1px -1px 10px 7px rgba(111,210,232,1)';
    } else if (ataqueContrario =='TIERRA 🌿') {
        parrafoAtaqueEnemigo.style.boxShadow = '1px -1px 10px 7px rgb(170, 84, 4)';
    }

    mensajesSection.appendChild(parrafoAtaqueJugador);
    mensajesSection.appendChild(parrafoAtaqueEnemigo);



    
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
