
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function loadProjects() {
    const projects = getData("projects");
    const projectList = document.getElementById("projectList");

    projectList.innerHTML = "";

    if (projects.length === 0) {
        projectList.innerHTML = "<p>No projects available</p>";
        return;
    }

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${project.image}" alt="Project Image">
            <div class="card-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        `;

        projectList.appendChild(card);
    });
}


function loadClients() {
    const clients = getData("clients");
    const clientList = document.getElementById("clientList");

    clientList.innerHTML = "";

    if (clients.length === 0) {
        clientList.innerHTML = "<p>No clients available</p>";
        return;
    }

    clients.forEach(client => {
        const card = document.createElement("div");
        card.className = "card client-card";

        card.innerHTML = `
            <img src="${client.image}" alt="Client Image">
            <div class="card-content">
                <p>"${client.description}"</p>
                <div class="client-name">${client.name}</div>
                <div class="client-designation">${client.designation}</div>
            </div>
        `;

        clientList.appendChild(card);
    });
}


document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const contact = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        city: document.getElementById("city").value,
        date: new Date().toLocaleString()
    };

    const contacts = getData("contacts");
    contacts.push(contact);
    setData("contacts", contacts);

    alert("Thank you! Your message has been submitted.");

    this.reset();
});


document.getElementById("newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    const newsletters = getData("newsletters");

  
    if (newsletters.some(item => item.email === email)) {
        alert("This email is already subscribed!");
        return;
    }

    newsletters.push({
        email: email,
        date: new Date().toLocaleString()
    });

    setData("newsletters", newsletters);

    alert("Successfully subscribed to the newsletter!");

    this.reset();
});


window.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    loadClients();
});
