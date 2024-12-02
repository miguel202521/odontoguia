// Dados do odontograma
let odontograma = JSON.parse(localStorage.getItem("odontograma")) || [];

// Função para gerar a arcada dentária
function generateOdontograma() {
    const odontogramaContainer = document.getElementById("odontograma");
    odontogramaContainer.innerHTML = "";

    // Criar 32 dentes
    for (let i = 1; i <= 32; i++) {
        const tooth = document.createElement("div");
        tooth.classList.add("tooth");
        tooth.setAttribute("data-tooth", i);
        tooth.innerHTML = `<span>${i}</span>`;

        // Restaurar nota, se existir
        const toothData = odontograma.find((t) => t.number === i);
        if (toothData) {
            tooth.classList.add("selected");
            const notes = document.createElement("div");
            notes.classList.add("tooth-notes");
            notes.innerText = toothData.notes;
            tooth.appendChild(notes);
        }

        // Evento de clique no dente
        tooth.addEventListener("click", () => {
            const notes = prompt(`Anotações para o dente ${i}:`, toothData?.notes || "");
            if (notes !== null) {
                updateToothData(i, notes);
            }
        });

        odontogramaContainer.appendChild(tooth);
    }
}

// Atualizar ou adicionar dados de um dente
function updateToothData(toothNumber, notes) {
    const index = odontograma.findIndex((t) => t.number === toothNumber);

    if (index !== -1) {
        // Atualizar dente existente
        odontograma[index].notes = notes;
    } else {
        // Adicionar novo dente
        odontograma.push({ number: toothNumber, notes });
    }

    // Salvar no localStorage
    saveOdontograma();

    // Atualizar visualização
    generateOdontograma();
}

// Salvar odontograma no localStorage
function saveOdontograma() {
    localStorage.setItem("odontograma", JSON.stringify(odontograma));
    alert("Odontograma salvo com sucesso!");
}

// Inicializar
generateOdontograma();
