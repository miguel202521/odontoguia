// Dados do odontograma
let odontograma = JSON.parse(localStorage.getItem("odontograma")) || {};

// Função para gerar os quadrantes
function generateOdontograma() {
    for (let i = 1; i <= 4; i++) {
        const row = document.getElementById(`q${i}`);
        row.innerHTML = "";

        // Criar dentes para o quadrante
        for (let j = 1; j <= 8; j++) {
            const toothNumber = `${i}${j}`;
            const tooth = document.createElement("div");
            tooth.classList.add("tooth");
            tooth.setAttribute("data-tooth", toothNumber);

            if (odontograma[toothNumber]) {
                tooth.classList.add("selected");
            }

            // Evento de clique no dente
            tooth.addEventListener("click", () => {
                const notes = prompt(`Anotações para o dente ${toothNumber}:`, odontograma[toothNumber] || "");
                if (notes !== null) {
                    odontograma[toothNumber] = notes;
                    saveOdontograma();
                    generateOdontograma();
                }
            });

            row.appendChild(tooth);
        }
    }
}

// Salvar nome e periograma
function savePeriogram() {
    const patientName = document.getElementById("patient-name").value.trim();
    if (!patientName) {
        alert("Por favor, insira o nome do paciente.");
        return;
    }
    localStorage.setItem("odontograma", JSON.stringify(odontograma));
    localStorage.setItem("patientName", patientName);
    alert("Odontograma salvo com sucesso!");
}

// Adicionar dente
function addTooth() {
    const quadrant = prompt("Quadrante do dente (1-4):");
    const position = prompt("Posição do dente (1-8):");
    const toothNumber = `${quadrant}${position}`;

    if (odontograma[toothNumber]) {
        alert("Esse dente já está adicionado.");
    } else {
        odontograma[toothNumber] = "";
        saveOdontograma();
        generateOdontograma();
    }
}

// Remover dente
function removeTooth() {
    const toothNumber = prompt("Número do dente para remover (ex: 11, 24):");
    if (odontograma[toothNumber]) {
        delete odontograma[toothNumber];
        saveOdontograma();
        generateOdontograma();
    } else {
        alert("Esse dente não existe no odontograma.");
    }
}

// Inicializar
generateOdontograma();
