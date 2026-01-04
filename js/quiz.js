import { supabase } from './supabase.js';

const display = document.querySelector("#display");
const form = document.querySelector("form");
const respInput = document.querySelector("#inResp");
const out = document.querySelector("h3");

let palavraAtual = null;

// Função para buscar uma palavra aleatória no Supabase
async function sortearPalavra() {
    // Buscamos todas as palavras (em sistemas maiores, usaríamos outra estratégia de sorteio)
    const { data, error } = await supabase.from('dicionario').select('*');

    if (error) {
        console.error("Erro ao buscar dados:", error.message);
        return;
    }

    if (data.length > 0) {
        // Sorteia um índice aleatório do array de dados
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        palavraAtual = data[indiceAleatorio];

        // Exibe a palavra no span
        display.textContent = palavraAtual.termo.toUpperCase();
        out.textContent = ""; // Limpa mensagens anteriores
        respInput.value = ""; // Limpa o input
        respInput.focus();
    } else {
        display.textContent = "Banco Vazio";
    }
}

// Evento de verificação
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!palavraAtual) return;

    const respostaUser = respInput.value.trim().toLowerCase();
    
    // O pulo do gato: verifica se a resposta está dentro do ARRAY de traduções
    // Convertemos todas as traduções salvas para lowercase para comparar
    const traducoesCorretas = palavraAtual.traducoes.map(t => t.toLowerCase());

    if (traducoesCorretas.includes(respostaUser)) {
        out.textContent = "✅ Correto!";
        out.style.color = "green";
        
        // Espera 1.5 segundos e sorteia a próxima
        setTimeout(sortearPalavra, 1500);
    } else {
        out.textContent = `❌ Errado. Tente novamente!`;
        out.style.color = "red";
    }
});

// Inicia o quiz sorteando a primeira palavra
sortearPalavra();