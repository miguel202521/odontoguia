let patients = JSON.parse(localStorage.getItem("patients")) || [];
let editingPatientId = null;

document.getElementById("save-button").addEventListener("click", savePatient);
document.getElementById("search").addEventListener("keyup", filterPatients);

function savePatient() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const weight = document.getElementById("weight").value;
    const complaints = document.getElementById("complaints").value;
    const history = document.getElementById("history").value;
    const notes = document.getElementById("notes").value;
    const consultationDate = document.getElementById("consultation-date").value;

    // Define a imagem com base no gênero
    const photo =
        gender === "Feminino"
            ? "Asuna Yuuki.jpeg" // Imagem para o gênero feminino
            : "Itachi Uchiha.jpeg"; // Imagem para o gênero masculino

    if (!name || !age || !gender || !consultationDate) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
    }

    const patientData = {
        id: editingPatientId || new Date().getTime(),
        name,
        age,
        gender,
        weight,
        complaints,
        history,
        notes,
        consultationDate,
        photo,
    };

    if (editingPatientId) {
        patients = patients.filter((patient) => patient.id !== editingPatientId);
    }

    patients.push(patientData);
    localStorage.setItem("patients", JSON.stringify(patients));

    clearForm();
    renderPatients();
    editingPatientId = null;
}

function renderPatients() {
    const patientList = document.getElementById("patient-list");
    patientList.innerHTML = "";

    patients.forEach((patient) => {
        const patientCard = document.createElement("div");
        patientCard.className = "patient-card";
        patientCard.innerHTML = `
            <img src="${patient.photo}" alt="Foto de ${patient.name}">
            <span>${patient.name}</span>
            <button class="btn-view" onclick="showDetails(${patient.id})">Ver Ficha</button>
        `;
        patientList.appendChild(patientCard);
    });
}

function showDetails(patientId) {
    const patient = patients.find((p) => p.id === patientId);

    document.getElementById("details-name").textContent = patient.name;
    document.getElementById("details-photo").src = patient.photo;
    document.getElementById("details-age").textContent = patient.age;
    document.getElementById("details-gender").textContent = patient.gender;
    document.getElementById("details-weight").textContent = patient.weight;
    document.getElementById("details-complaints").textContent = patient.complaints;
    document.getElementById("details-history").textContent = patient.history;
    document.getElementById("details-notes").textContent = patient.notes;
    document.getElementById("details-consultation-date").textContent = patient.consultationDate;

    editingPatientId = patientId;

    document.getElementById("overlay").style.display = "block";
    document.getElementById("details-popup").style.display = "block";
}

function closeDetails() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("details-popup").style.display = "none";
}

function editPatient() {
    const patient = patients.find((p) => p.id === editingPatientId);

    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("weight").value = patient.weight;
    document.getElementById("complaints").value = patient.complaints;
    document.getElementById("history").value = patient.history;
    document.getElementById("notes").value = patient.notes;
    document.getElementById("consultation-date").value = patient.consultationDate;

    closeDetails();
}

function confirmDeletion() {
    document.getElementById("confirmation-popup").style.display = "block";
}

function deletePatient() {
    patients = patients.filter((p) => p.id !== editingPatientId);
    localStorage.setItem("patients", JSON.stringify(patients));

    closeDetails();
    closeConfirmation();
    renderPatients();
}

function closeConfirmation() {
    document.getElementById("confirmation-popup").style.display = "none";
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "Masculino";
    document.getElementById("weight").value = "";
    document.getElementById("complaints").value = "";
    document.getElementById("history").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("consultation-date").value = "";
}

function filterPatients() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredPatients = patients.filter((p) =>
        p.name.toLowerCase().includes(searchTerm)
    );

    const patientList = document.getElementById("patient-list");
    patientList.innerHTML = "";

    filteredPatients.forEach((patient) => {
        const patientCard = document.createElement("div");
        patientCard.className = "patient-card";
        patientCard.innerHTML = `
            <img src="${patient.photo}" alt="Foto de ${patient.name}">
            <span>${patient.name}</span>
            <button class="btn-view" onclick="showDetails(${patient.id})">Ver Ficha</button>
        `;
        patientList.appendChild(patientCard);
    });
}

renderPatients();
