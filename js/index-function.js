import {getProjects, sendMail} from "./firestore-functions.js";
import Mail from "./models/mail-model.js";

function setListeners() {
    const elements = document.querySelectorAll('.copy');

    elements.forEach(element => {
        element.addEventListener('click', async function () {
            try {
                await navigator.clipboard.writeText(element.textContent);
                
                const popup = document.createElement("div");
                popup.classList.add("popup");
                popup.textContent = "copiado al portapapeles";

                element.insertBefore(popup, element.firstChild);

                setTimeout(() => {
                    if (popup.parentNode === element) {
                      element.removeChild(popup);
                    }
                  }, 2000);

              } catch (err) {
                console.error('Error al copiar: ', err);
              }
        });
    });

    document.getElementById("formButton").addEventListener("click", function () {
        const name = document.getElementById("nameInput").value;
        const email = document.getElementById("emailInput").value;
        const subject = document.getElementById("subjectInput").value;
        const message = document.getElementById("messageInput").value;

        sendMail(new Mail(name, email, subject, message));

        alert("correo enviado satisfactoriamente");
    })
}

async function createCards(projects) {

    const languagesIcons = new Map([
        ["flutter", "https://img.icons8.com/color/48/flutter.png"],
        ["kotlin", "https://img.icons8.com/color/48/kotlin.png"],
        ["web", "https://img.icons8.com/color/48/html-5--v1.png"]
    ]);

    const projectsContainer = document.getElementById("projectsContainer");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("cardHeader");

        const cardBody = document.createElement("div");
        cardBody.classList.add("cardBody");

        const cardImg = document.createElement("img");
        cardImg.classList.add("cardImg");
        cardImg.src = project.image;

        const languageIcon = document.createElement("img");
        languageIcon.classList.add("languageIcon");
        languageIcon.src = languagesIcons.get(project.language);

        const cardTitle = document.createElement("h3");
        cardTitle.classList.add("cardTitle");
        cardTitle.textContent = project.title;

        const cardContent = document.createElement("h4");
        cardContent.classList.add("cardContent");
        cardContent.textContent = project.content;

        const cardButton = document.createElement("button");
        cardButton.classList.add("cardButton");
        cardButton.textContent = "ver mas";
        cardButton.addEventListener("click", function () {
            sessionStorage.setItem("project", JSON.stringify(project));
            window.location.href = "project-page.html";
        });

        cardHeader.appendChild(cardImg);
        cardHeader.appendChild(languageIcon);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardContent);
        cardBody.appendChild(cardButton);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        projectsContainer.appendChild(card);
    })
};

function showLoading(projectsContainer) {
    const loading = document.createElement("div");
    loading.classList.add("loading");

    const text = document.createElement("h3");
    text.textContent = "Cargando proyectos";

    const img = document.createElement("img");
    img.src = "./img/loading.gif";

    loading.appendChild(text);
    loading.appendChild(img);

    projectsContainer.appendChild(loading);
};

$(document).ready(function () {
    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

});

window.onload = async function () {
    setListeners();
    const response = sessionStorage.getItem("projects");
    var projects;

    const projectsContainer = document.getElementById("projectsContainer");
    
    showLoading(projectsContainer);

    if (response !== null && response !== undefined) {
        projects = JSON.parse(response);
    } else {
        projects = await getProjects();
    }

    projectsContainer.removeChild(projectsContainer.firstChild);

    await createCards(projects);


    sessionStorage.setItem("projects", JSON.stringify(projects));
};