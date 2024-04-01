const html = document.querySelector('html')

const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const iniciarOuPausarBt = document.querySelector('#start-pause span')

const tempoNaTela = document.querySelector('#timer')

const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon')
const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title')

const musicaBt = document.querySelector('#alternar-musica')

const audioMusica = new Audio('/sons/luna-rise-part-one.mp3')
audioMusica.loop = true
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('sons/beep.mp3')

const startPauseBt = document.querySelector('#start-pause')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null


musicaBt.addEventListener('change', () => {
    if(audioMusica.paused){
        audioMusica.play()
    } else {
        audioMusica.pause()
    }
})


focoBt.addEventListener('click', (target) => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', (target) => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})


function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    })
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong> 
            `
        default:
            break;
    }
}

function decrementarTempo () {
    if(tempoDecorridoEmSegundos <= 0){
        audioFim.play()
        alert('Tempo Finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if(focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(decrementarTempo, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarImg.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000) // em milisegundos
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}


mostrarTempo()