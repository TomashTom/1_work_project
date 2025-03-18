document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            // Gauti įvestus duomenis
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const requestType = document.getElementById("request-type").value;
            const message = document.getElementById("message").value;

            // Išsaugoti duomenis
            saveSubmission(name, email, phone, requestType, message);

            // Išvalyti formą
            form.reset();
        });
    }

    function saveSubmission(name, email, phone, requestType, message) {
        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        submissions.push({ name, email, phone, requestType, message, completed: false });
        localStorage.setItem("submissions", JSON.stringify(submissions));
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".gallery-track");
    const images = document.querySelectorAll(".gallery-track img");
    const totalImages = images.length;
    let index = 0;

    function moveSlide() {
        index++;

      
        if (index >= totalImages - 1) {
            index = 0;
        }

        updateSlide();
    }

    function updateSlide() {
        const moveAmount = -index * (320 + 30); // 320px nuotrauka + 30px tarpas
        track.style.transform = `translateX(${moveAmount}px)`;
    }

    // Automatinis slinkimas kas 3 sekundes
    setInterval(() => {
        moveSlide();
    }, 3000);
});