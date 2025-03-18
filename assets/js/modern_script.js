document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = button.getAttribute("data-category");

            projectCards.forEach(card => {
                if (category === "all" || card.getAttribute("data-category") === category) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const learnMoreButtons = document.querySelectorAll(".learn-more");
    const modalTitle = document.getElementById("serviceModalLabel");
    const modalBody = document.querySelector("#serviceModal .modal-body");

    learnMoreButtons.forEach(button => {
        button.addEventListener("click", function () {
            const title = this.parentElement.querySelector(".card-title").innerText;
            const description = this.parentElement.querySelector(".card-text").innerText;

            modalTitle.innerText = title;
            modalBody.innerHTML = `<p>${description}</p>`;
        });
    });
});

