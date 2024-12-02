document.addEventListener("DOMContentLoaded", () => {
    const odontograma = document.getElementById("odontograma");
    const periogramList = document.getElementById("periogram-list");
    const addToothButton = document.getElementById("add-tooth");
    const removeToothButton = document.getElementById("remove-tooth");
    const savePeriogramButton = document.getElementById("save-periogram");
    const patientNameInput = document.getElementById("patient-name");

    const periograms = JSON.parse(localStorage.getItem("periograms")) || [];

    function renderOdontograma() {
        document.querySelectorAll(".tooth").forEach(tooth => {
            tooth.addEventListener("click", () => handleToothClick(tooth));
        });
    }

    function handleToothClick(tooth) {
        const toothNumber = tooth.dataset.number;

        const existingNote = tooth.querySelector(".note");
        if (existingNote) {
            existingNote.remove();
        }

        const note = prompt(`Adicione uma anotação para o dente ${toothNumber}:`);
        if (note) {
            const noteElement = document.createElement("div");
            noteElement.classList.add("note");
            noteElement.textContent = note;
            tooth.appendChild(noteElement);
        }
    }

    function savePeriogram() {
        const patientName = patientNameInput.value.trim();
        if (!patientName) {
            alert("Por favor, insira o nome do paciente.");
            return;
        }

        const periogramData = Array.from(document.querySelectorAll(".tooth")).map(tooth => ({
            number: tooth.dataset.number,
            note: tooth.querySelector(".note")?.textContent || "",
            removed: tooth.classList.contains("removed")
        }));

        periograms.push({ name: patientName, data: periogramData });
        localStorage.setItem("periograms", JSON.stringify(periograms));
        renderPeriograms();
        alert(`Periograma de ${patientName} salvo com sucesso!`);
    }

    function renderPeriograms() {
        periogramList.innerHTML = "";

        periograms.forEach((periogram, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = periogram.name;

            listItem.addEventListener("click", () => {
                if (confirm(`Deseja abrir o periograma de ${periogram.name}?`)) {
                    loadPeriogram(periogram);
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("btn-delete");
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                if (confirm(`Tem certeza que deseja excluir o periograma de ${periogram.name}?`)) {
                    periograms.splice(index, 1);
                    localStorage.setItem("periograms", JSON.stringify(periograms));
                    renderPeriograms();
                }
            });

            listItem.appendChild(deleteButton);
            periogramList.appendChild(listItem);
        });
    }

    function loadPeriogram(periogram) {
        document.querySelectorAll(".tooth").forEach(tooth => {
            tooth.classList.remove("removed");
            tooth.querySelector(".note")?.remove();
        });

        periogram.data.forEach(toothData => {
            const tooth = document.querySelector(`.tooth[data-number="${toothData.number}"]`);
            if (tooth) {
                if (toothData.removed) {
                    tooth.classList.add("removed");
                }
                if (toothData.note) {
                    const noteElement = document.createElement("div");
                    noteElement.classList.add("note");
                    noteElement.textContent = toothData.note;
                    tooth.appendChild(noteElement);
                }
            }
        });
    }

    addToothButton.addEventListener("click", () => {
        const toothNumber = prompt("Digite o número do dente a ser adicionado:");
        if (toothNumber && !document.querySelector(`.tooth[data-number="${toothNumber}"]`)) {
            const newTooth = document.createElement("div");
            newTooth.classList.add("tooth");
            newTooth.dataset.number = toothNumber;
            newTooth.textContent = toothNumber;
            newTooth.addEventListener("click", () => handleToothClick(newTooth));
            odontograma.querySelector(".teeth-row").appendChild(newTooth);
        } else {
            alert("Esse número de dente já existe ou é inválido.");
        }
    });

    removeToothButton.addEventListener("click", () => {
        const toothNumber = prompt("Digite o número do dente a ser removido:");
        const tooth = document.querySelector(`.tooth[data-number="${toothNumber}"]`);
        if (tooth) {
            if (confirm(`Tem certeza que deseja remover o dente ${toothNumber}?`)) {
                tooth.classList.add("removed");
                const existingNote = tooth.querySelector(".note");
                if (existingNote) existingNote.remove();
            }
        } else {
            alert("Esse número de dente não foi encontrado.");
        }
    });

    savePeriogramButton.addEventListener("click", savePeriogram);

    renderOdontograma();
    renderPeriograms();
});
