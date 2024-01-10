function setProjectInfo(project) {
    const languagesIcons = new Map([
        ["flutter", "https://img.icons8.com/color/100/flutter.png"],
        ["kotlin", "https://img.icons8.com/color/100/kotlin.png"],
        ["web", "https://img.icons8.com/color/100/html-5--v1.png"]
    ]);

    const title = document.getElementById("title");
    const icon = document.getElementById("icon");
    const description = document.getElementById("description");
    const repository = document.getElementById("repository");


    title.textContent = project.title;
    icon.src = project.icon;
    description.innerHTML = project.content;
    repository.href = project.repository;
}

function createCarousel(screenshots) {
    const carousel = document.getElementById("carousel");

    screenshots.forEach(screenshot => {
        const img = document.createElement("img");
        img.classList.add("carouselImg");
        img.src = screenshot;

        carousel.appendChild(img);
    });
};

function initListeners(project) {
    document.getElementById("downloadButton").addEventListener("click", function () {
        try {
            const link = document.createElement('a');
            link.href = project.app;
            link.download = "${project.name}.apk";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.log(error);
        }
    });
};

function setButton(project) {
    const button = document.getElementById("downloadButton");

    if (project.app == null) {
        button.remove();
    }
    else {
        initListeners(project);
    }
}

window.onload = function () {
    var project = JSON.parse(sessionStorage.getItem("project"));
    setButton(project);
    setProjectInfo(project);
    createCarousel(project.screenshots);
};