// Dados dos flashcards
import { flashcards } from './cards.js';


// Variáveis de estado
let currentIndex = 0;
const totalCartas = flashcards.length;
let textoEmMandarim = '';

// Elementos do DOM
const modal = document.getElementById('flashcardModal');
const abrirBtn = document.getElementById('abrirFlashcards');
const fecharBtn = document.querySelector('.fechar-modal');
const flashcard = document.getElementById('flashcard');
const ideogramaAtual = document.getElementById('ideogramaAtual');
const pinyinAtual = document.getElementById('pinyinAtual');
const traducaoAtual = document.getElementById('traducaoAtual');
const contadorAtual = document.getElementById('contadorAtual');
const totalCartasSpan = document.getElementById('totalCartas');
const anteriorBtn = document.getElementById('anterior');
const proximoBtn = document.getElementById('proximo');
const randomBtn = document.getElementById('randomCard');

// Funções
function abrirModal() {
    modal.style.display = 'flex';
    atualizarCarta();
}

function fecharModal() {
    modal.style.display = 'none';
    flashcard.classList.remove('virar');
}

function atualizarCarta() {
    const cartaAtual = flashcards[currentIndex];
    ideogramaAtual.textContent = cartaAtual.ideograma;
    pinyinAtual.textContent = cartaAtual.pinyin;
    traducaoAtual.textContent = cartaAtual.traducao;
    contadorAtual.textContent = currentIndex + 1;
    totalCartasSpan.textContent = totalCartas;

    return textoEmMandarim = cartaAtual.ideograma
}


export function lerEmVozAlta() {
        // Verifica se o navegador suporta a API de síntese de fala
        if ('speechSynthesis' in window) {
            // Cria uma nova instância de SpeechSynthesisUtterance
            const utterance = new SpeechSynthesisUtterance(textoEmMandarim);
            
            // Define o idioma para mandarim (zh-CN)
            utterance.lang = 'zh-CN';
            
            // Fala o texto
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Seu navegador não suporta a leitura de texto em voz alta.');
        }
}

function proximaCarta() {
    if (currentIndex < totalCartas - 1) {
        currentIndex++;
        atualizarCarta();
        flashcard.classList.remove('virar');
    }
}

function cartaAnterior() {
    if (currentIndex > 0) {
        currentIndex--;
        atualizarCarta();
        flashcard.classList.remove('virar');
    }
}

function cartaAleatoria() {
    currentIndex = Math.floor(Math.random() * totalCartas);
    atualizarCarta();
    flashcard.classList.remove('virar');
}

// Event Listeners
abrirBtn.addEventListener('click', abrirModal);
fecharBtn.addEventListener('click', fecharModal);
proximoBtn.addEventListener('click', proximaCarta);
anteriorBtn.addEventListener('click', cartaAnterior);
randomBtn.addEventListener('click', cartaAleatoria);
flashcard.addEventListener('click', () => {
    flashcard.classList.toggle('virar');
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        fecharModal();
    }
});

// Inicialização
totalCartasSpan.textContent = totalCartas;