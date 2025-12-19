
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


document.getElementById("projectForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const imageFile = document.getElementById("projectImage").files[0];
    const name = document.getElementById("projectName").value.trim();
    const description = document.getElementById("projectDescription").value.trim();

    if (!imageFile) {
        alert("Please upload project image");
        return;
    }

    cropImage(imageFile, (croppedImage) => {
        const projects = getData("projects");

        projects.push({
            image: croppedImage,
            name,
            description,
            date: new Date().toLocaleString()
        });

        setData("projects", projects);

        alert("Project added successfully!");
        e.target.reset();
        loadPreviews();
    });
});


document.getElementById("clientForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const imageFile = document.getElementById("clientImage").files[0];
    const name = document.getElementById("clientName").value.trim();
    const description = document.getElementById("clientDescription").value.trim();
    const designation = document.getElementById("clientDesignation").value.trim();

    if (!imageFile) {
        alert("Please upload client image");
        return;
    }

    cropImage(imageFile, (croppedImage) => {
        const clients = getData("clients");

        clients.push({
            image: croppedImage,
            name,
            description,
            designation,
            date: new Date().toLocaleString()
        });

        setData("clients", clients);

        alert("Client added successfully!");
        e.target.reset();
        loadPreviews();
    });
});


function loadContacts() {
    const contacts = getData("contacts");
    const tableBody = document.querySelector("#contactTable tbody");

    tableBody.innerHTML = "";

    contacts.forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.fullName}</td>
            <td>${c.email}</td>
            <td>${c.mobile}</td>
            <td>${c.city}</td>
            <td>${c.date}</td>
        `;
        tableBody.appendChild(row);
    });
}


function loadNewsletters() {
    const newsletters = getData("newsletters");
    const tableBody = document.querySelector("#newsletterTable tbody");

    tableBody.innerHTML = "";

    newsletters.forEach(n => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${n.email}</td>
            <td>${n.date}</td>
        `;
        tableBody.appendChild(row);
    });
}


function loadPreviews() {
    const projectPreview = document.getElementById("projectPreview");
    const clientPreview = document.getElementById("clientPreview");

    projectPreview.innerHTML = "";
    clientPreview.innerHTML = "";

    getData("projects").slice(-3).forEach(p => {
        const img = document.createElement("img");
        img.src = p.image;
        projectPreview.appendChild(img);
    });

    getData("clients").slice(-3).forEach(c => {
        const img = document.createElement("img");
        img.src = c.image;
        clientPreview.appendChild(img);
    });
}


window.addEventListener("DOMContentLoaded", () => {
    loadContacts();
    loadNewsletters();
    loadPreviews();
});
