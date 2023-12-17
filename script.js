let html = document.querySelector('html');
let btnFoco = document.querySelector('.app__card-button--foco ');
let btnCurto = document.querySelector('.app__card-button--curto');
let btnLongo = document.querySelector('.app__card-button--longo');

let imgPessoa = document.querySelector('.app__image');
let texto = document.querySelector('.app__title');
let botoes = document.querySelectorAll('.app__card-button');
let timer = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let btnPausar = document.querySelector('#start-pause')
let intervaloID = null

let musicaFoco = document.querySelector('#alternar-musica');
let musica = new Audio('sons/luna-rise-part-one.mp3')
musica.loop = true;

musicaFoco.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
        musica.volume = 0.5;
    } else {
        musica.pause()
    }
})

let play = new Audio('sons/play.wav')
let pause = new Audio('sons/pause.mp3')
let beep = new Audio('sons/beep.mp3')

let botaoMusic = document.querySelector('.app__card-primary-butto-icon')
let botaoPause = document.querySelector('.app__card-primary-butto-text')

//elemento.addEventListener(evento, callback);

btnFoco.addEventListener('click', () => {   
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto)
    imgPessoa.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            // btnFoco.classList.add('active')
            // btnCurto.classList.remove('active')
            // btnLongo.classList.remove('active')
            texto.innerHTML = `Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong> `
            break;

        case "descanso-curto":
            // btnFoco.classList.remove('active')
            // btnCurto.classList.add('active')
            // btnLongo.classList.remove('active')
            texto.innerHTML = `Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;

        case "descanso-longo":
            // btnFoco.classList.remove('active')
            // btnCurto.classList.remove('active')
            // btnLongo.classList.add('active')
            texto.innerHTML = ` Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}

let contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        botaoMusic.setAttribute('src', 'imagens/play_arrow.png')
        botaoPause.innerHTML = 'Começar'
        beep.play()
        beep.volume = 0.3
        zerar()
        Swal.fire("Tempo esgotado!");
        return
    } 
    tempoDecorridoEmSegundos -= 1 
    mostrarTempo()
}

function iniciarOuPausar() {
    if (intervaloID) {
        botaoMusic.setAttribute('src', 'imagens/play_arrow.png')
        botaoPause.innerHTML = 'Começar'
        pause.play()
        pause.volume = 0.2
        zerar()
        return
    } 

    botaoMusic.setAttribute('src', 'imagens/pause.png')
    botaoPause.innerHTML = 'Pausar'
    play.play()
    play.volume = 0.2
    intervaloID = setInterval(contagemRegressiva, 1000)
}

btnPausar.addEventListener('click',iniciarOuPausar)

function zerar() {
    clearInterval(intervaloID);
    intervaloID = null;
}

function mostrarTempo() {
    let tempo = new Date(tempoDecorridoEmSegundos * 1000)
    let tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`    
}

mostrarTempo()