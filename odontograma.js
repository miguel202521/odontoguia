let odontograma = JSON.parse(localStorage.getItem("odontograma")) || {};
let periograms = JSON.parse(localStorage.getItem("periograms")) || {};

// Gerar quadrantes e dentes
function generateOdontograma() {
    const quadrants = [1, 2, 3, 4];
    quadrants.forEach((quad) => {
        const row = document.getElementById(`q${quad}`);
        row.innerHTML = "";
        for (let i = 1; i <= 8; i++) {
            const toothNumber = quad <= 2 ? `${quad}${i}` : `${quad}${9 - i}`;
            const tooth = document.createElement("div");
            tooth.classList.add("tooth");
            tooth.textContent = toothNumber;
            tooth.setAttribute("data-tooth", toothNumber);

            if (odontograma[toothNumber]) {
                tooth.classList.add("selected");
            }

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
    });
}

// Salvar periograma
function savePeriogram() {
    const patientName = document.getElementById("patient-name").value.trim();
    if (!patientName) {
        alert("Por favor, insira o nome do paciente.");
        return;
    }
    periograms[patientName] = { ...odontograma };
    localStorage.setItem("periograms", JSON.stringify(periograms));
    listPeriograms();
    alert("Periograma salvo com sucesso!");
}

// Listar periogramas salvos
function listPeriograms() {
    const list = document.getElementById("periogram-list");
    list.innerHTML = "";
    Object.keys(periograms).forEach((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        item.addEventListener("click", () => {
            odontograma = { ...periograms[name] };
            generateOdontograma();
        });
        list.appendChild(item);
    });
}

// Adicionar dente
function addTooth() {
    const toothNumber = prompt("Número do dente para adicionar:");
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
    const toothNumber = prompt("Número do dente para remover:");
    if (odontograma[toothNumber]) {
        delete odontograma[toothNumber];
        saveOdontograma();
        generateOdontograma();
    } else {
        alert("Esse dente não existe no odontograma.");
    }
}

// Salvar odontograma no localStorage
function saveOdontograma() {
    localStorage.setItem("odontograma", JSON.stringify(odontograma));
}

// Inicializar
generateOdontograma();
listPeriograms();
