
const spanMascotaJugador = document.querySelector('#mascota-jugador');
const seccionMascota     = document.querySelector('#pet');
const spanVidaJugador    = document.querySelector('#spanVidaJugador');
const seccionAtaque      = document.querySelector('#atack');
const spanMascotaEnemigo = document.querySelector('#mascota-enemigo');
const spanVidaEnemigo    = document.querySelector('#spanVidaEnemigo');
const mensajesSection    = document.querySelector('#mensajes');
const botonReiniciar     = document.querySelector('#reiniciarBtn');
const contenedorTarjetas = document.querySelector('#contenedor-tarjetas');
const contenedorAtaques  = document.querySelector('#contenedorAtaques');

const seccionVerMapa = document.querySelector('#ver-mapa')
const mapa = document.querySelector('#mapa')

const ataqueJugadorDiv=document.querySelector('#ataque-jugador');
const ataqueEnemyDiv =document.querySelector('#ataque-enemy');

let mascotaJugadorObjeto
let mascotaJugador
let vidasJugador = 5;
let victoriasJugador=0
let indexAtaqueJugador
let ataqueJugador =[]  

let ataquesMokepon
let opcionDeMokepones
let ataquesMokeponEnemigo
let indexAtaqueEnemigo
let ataqueEnemigo =[]
let vidasEnemigo = 5;
let victoriasEnemigo=0

let botonFuego   
let botonAgua   
let botonTierra
let botones=[] 
let mokepones = []
let mokeponesEnemigos = []
let elHipodoge
let elCapipepo
let laRatigueya
let jugadorId=null
let enemigoId=null

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src='/programaci-n-b-sica-platzi/mokepon/images/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 500

alturaQueBuscamos = anchoDelMapa*200/400
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
anchoDelMapa = anchoMaximoDelMapa
}


class Mokepon {
    constructor (nombre,foto,vida,fotoMapa, id=null ) {
        this.id = id
        this.nombre= nombre
        this.foto= foto
        this.vida= vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY=0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let hipodoge = new Mokepon('Hipodoge', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_hipodoge_attack.png', 5, '/programaci-n-b-sica-platzi/mokepon/images/hipodoge.png')
let capipepo = new Mokepon('Capipepo', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_capipepo_attack.png', 5,'/programaci-n-b-sica-platzi/mokepon/images/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_ratigueya_attack.png', 5,'/programaci-n-b-sica-platzi/mokepon/images/ratigueya.png')


const HIPODOGE_ATAQUES = [

    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🌿', id:'boton-tierra'},
]

const CAPIPEPO_ATAQUES = [

    {nombre: '🌿', id:'boton-tierra'},
    {nombre: '🌿', id:'boton-tierra'},
    {nombre: '🌿', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'},
]

const RATIGUEYA_ATAQUES = [

    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🌿', id:'boton-tierra'},
]

hipodoge.ataques.push (...HIPODOGE_ATAQUES)    
capipepo.ataques.push (...CAPIPEPO_ATAQUES)       
ratigueya.ataques.push (...RATIGUEYA_ATAQUES)



mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    seccionAtaque.style.display='none';
    seccionVerMapa.style.display='none'
    
    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = ` 
        <label  for=${mokepon.nombre}> ${mokepon.nombre} 
        <input id=${mokepon.nombre} type="radio" name="mascota"  > 
        <img width="200px" src=${mokepon.foto} alt=${mokepon.nombre}>
        </label> `
        
    contenedorTarjetas.innerHTML += opcionDeMokepones;
        
        elHipodoge = document.querySelector('#Hipodoge');
        elCapipepo = document.querySelector('#Capipepo');
        laRatigueya = document.querySelector('#Ratigueya');
    }) 

    elHipodoge.addEventListener('click', seleccionarMascotaJugador);
    elCapipepo.addEventListener('click', seleccionarMascotaJugador);
    laRatigueya.addEventListener('click', seleccionarMascotaJugador);

    botonReiniciar.addEventListener('click', reiniciarJuego);
    botonReiniciar.style.display= 'none'

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
    .then(function(res){
        if(res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId=respuesta
                })
        }
    })
}


function seleccionarMascotaJugador() {
    
    seccionMascota.style.display='none';
    seccionVerMapa.style.display='flex'
    
    
    if(elHipodoge.checked) {
        spanMascotaJugador.innerHTML= elHipodoge.id
        mascotaJugador = elHipodoge.id

    } else if (elCapipepo.checked) {
        spanMascotaJugador.innerHTML=elCapipepo.id
        mascotaJugador = elCapipepo.id

    } else if (laRatigueya.checked) {
        spanMascotaJugador.innerHTML=laRatigueya.id
        mascotaJugador = laRatigueya.id
    } else {
        alert('Primero debes elegir tu combatiente')
        reiniciarJuego()
    }

    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador){
    fetch("http://localhost:8080/mokepon/" + jugadorId,{
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    
    })
}

function extraerAtaques (mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button class="ataques BAtaque " id= ${ataque.id}>${ataque.nombre}</button> `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    
    botonFuego  = document.querySelector('#boton-fuego');
    botonAgua   = document.querySelector('#boton-agua');
    botonTierra = document.querySelector('#boton-tierra');
    botones = document.querySelectorAll('.BAtaque');
    
   // botonReiniciar.style.display= 'none';
}

function secuenciaAtaque () {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO 🔥')
                console.log(ataqueJugador)
            boton.style.background= '#112f58';
            
        } else if (e.target.textContent=== '💧') {
            ataqueJugador.push('AGUA 💧')
            console.log(ataqueJugador)
            boton.style.background= '#112f58';
            
        } else if (e.target.textContent=== '🌿'){
            ataqueJugador.push('TIERRA 🌿')
            console.log(ataqueJugador)
            boton.style.background= '#112f58';
        }
        if(ataqueJugador.length===5){
            enviarAtaques()
        }
        
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method:"post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function ({ataques}){
                    if(ataques.length===5) {
                        ataqueEnemigo=ataques
                        combate()
                    }
                })
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueContrario() {
    let ataqueAleatorioContrario = aleatorio(0,ataquesMokeponEnemigo.length -1);
    
    if(ataqueAleatorioContrario == 0 || ataqueAleatorioContrario==1){
        ataqueEnemigo.push('FUEGO 🔥');
    } else if (ataqueAleatorioContrario == 3 || ataqueAleatorioContrario == 4) {
        ataqueEnemigo.push('AGUA 💧');
    } else {
            ataqueEnemigo.push('TIERRA 🌿');
        }
        iniciarPelea()
    }

function iniciarPelea () {
        if(ataqueJugador.length==5) {
            combate()
        }
    }

function indexAmbosOponentes(jugador, enemigo) {
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    }
    
function combate(){
    clearInterval(intervalo)

for (let index = 0; index < ataqueJugador.length; index++){

        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index,index)
            crearMensaje('EMPATE 🤜🏽🤛🏽');
            victoriasJugador++
            spanVidaJugador.innerHTML = `${victoriasJugador} victorias`
        }else if(ataqueJugador[index] === 'FUEGO 🔥' && ataqueEnemigo[index] === 'TIERRA 🌿') {
            indexAmbosOponentes(index,index)
            crearMensaje('GANASTE');
            victoriasJugador++
            spanVidaJugador.innerHTML = `${victoriasJugador} victorias`;


        }else if(ataqueJugador[index]==='AGUA 💧' && ataqueEnemigo[index]==='FUEGO 🔥') {
            indexAmbosOponentes(index,index)
            crearMensaje('GANASTE');
            victoriasJugador++
            spanVidaJugador.innerHTML = `${victoriasJugador} victorias`;

        }else if(ataqueJugador[index]==='TIERRA 🌿' && ataqueEnemigo[index]==='AGUA 💧' ) {
            indexAmbosOponentes(index,index)
            crearMensaje('GANASTE');
            victoriasJugador++
            spanVidaJugador.innerHTML = `${victoriasJugador} victorias`;

        }else {
            indexAmbosOponentes(index,index)
            crearMensaje('PERDISTE');
            victoriasEnemigo++
            spanVidaEnemigo.innerHTML = `${victoriasEnemigo} victorias`;
        }
    }
    revisarVictorias()
}


function revisarVictorias(){
    if(victoriasJugador===victoriasEnemigo){
        crearMensajeFinal('EMPATE 🤜🏽🤛🏽');
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Yeii, ganaste! 🎉');
    } else if (victoriasEnemigo > victoriasJugador){
        crearMensajeFinal('Suerte para la próxima. 🙁');
    }
}
    
function crearMensaje(resultado) {

let parrafoAtaqueJugador = document.createElement('p')
let parrafoAtaqueEnemigo = document.createElement('p')

mensajesSection.innerHTML= resultado
parrafoAtaqueJugador.innerHTML= indexAtaqueJugador
parrafoAtaqueEnemigo.innerHTML= indexAtaqueEnemigo

ataqueJugadorDiv.appendChild(parrafoAtaqueJugador)
ataqueEnemyDiv.appendChild(parrafoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

    mensajesSection.innerHTML= resultadoFinal
    mensajesSection.setAttribute('class', 'final')

    botonFuego.disabled=true;
    botonAgua.disabled=true;
    botonTierra.disabled=true; 
    botonReiniciar.style.display= 'block';
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY

    lienzo.clearRect(0,0, mapa.width, mapa.height) 
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height

    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x,y){
fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y 
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({enemigos}) {
                mokeponesEnemigos = enemigos.map(function(enemigo) {
                    let mokeponEnemigo = null
                    let mokeponNombre = enemigo.mokepon.nombre || ""
                    if(mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_hipodoge_attack.png', 5, '/programaci-n-b-sica-platzi/mokepon/images/hipodoge.png', enemigo.id)
                    } else if(mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon('Capipepo', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_capipepo_attack.png', 5,'/programaci-n-b-sica-platzi/mokepon/images/capipepo.png', enemigo.id)
                    } else if (mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon('Ratigueya', '/programaci-n-b-sica-platzi/mokepon/images/mokepons_mokepon_ratigueya_attack.png', 5,'/programaci-n-b-sica-platzi/mokepon/images/ratigueya.png', enemigo.id)
                    }
                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y
                    return mokeponEnemigo
                })
            })
        }
    })
}


function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 6
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX= -6
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 6
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY= -6
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
}

function sePresionoUnaTecla(event) {
    switch(event.key) {
        case 'ArrowUp':
            moverArriba()
            break
            case 'ArrowRight':
                moverDerecha()
            break
            case 'ArrowDown':
                moverAbajo()
                break
        case 'ArrowLeft':
            moverIzquierda()
            break;
            default:
                break
            }
        }
        
function iniciarMapa(){
    mascotaJugadorObjeto=obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50);
    
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
    }
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
const arribaEnemigo = 
    enemigo.y
const abajoEnemigo = 
    enemigo.y + enemigo.alto
const derechaEnemigo = 
    enemigo.x + enemigo.ancho
const izquierdaEnemigo = 
    enemigo.x 

const arribaMascota = 
    mascotaJugadorObjeto.y
const abajoMascota = 
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaMascota = 
    mascotaJugadorObjeto.x


    if (abajoMascota < arribaEnemigo||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo){
        return
    } 

    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId=enemigo.id
    seccionVerMapa.style.display='none'
    seccionAtaque.style.display='flex';
    seleccionarMascotaEnemigo(enemigo)

}
window.addEventListener('load',  iniciarJuego)
