import { supabase } from './supabase.js';

const form = document.querySelector("form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const termo = form.inPalavra.value.trim()
    const traducoes = [
        form.inTrad1.value.trim(),
        form.inTrad2.value.trim(),
        form.inTrad3.value.trim()
    ].filter(t => t !== "")

    if (traducoes.length === 0) {
        alert("Insira pelo menos uma tradução!")
        return
    }

    const registro = { termo, traducoes }

    // Use o nome correto da variável: _supabase
    const { error } = await supabase
        .from('dicionario')
        .insert([registro])

    if (error) {
        console.error("Detalhes do erro:", error)
        alert("Erro ao salvar: " + error.message)
    } else {
        alert("Palavra '" + termo + "' salva com sucesso!")
        form.reset()
        form.inPalavra.focus()
    }
})