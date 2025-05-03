document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#submissions-table tbody");
    const clearButton = document.getElementById("clear-submissions");

    function loadSubmissions() {
        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        tableBody.innerHTML = ""; // Išvalyti esamus įrašus

        if (submissions.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Nėra pateiktų paraiškų.</td></tr>";
            return;
        }

        submissions.forEach((submission, index) => {
            addRow(index, submission.name, submission.email, submission.phone, submission.requestType, submission.message, submission.completed);
        });
    }

    function addRow(index, name, email, phone, requestType, message, completed) {
        const row = document.createElement("tr");

        let statusIcon = completed ? "✅" : "⚠️"; 

        row.innerHTML = `<td>${name}</td>
                         <td>${email}</td>
                         <td>${phone}</td>
                         <td>${requestType}</td>
                         <td>${message}</td>
                         <td class="status">${statusIcon}</td>
                         <td>
                            <button class="complete-btn" data-index="${index}">✅ Įvykdyta</button>
                            <button class="delete-btn" data-index="${index}">❌</button>
                         </td>`;
        tableBody.appendChild(row);
    }

    function toggleCompleted(index) {
        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        submissions[index].completed = !submissions[index].completed; // Apverčia būklę
        localStorage.setItem("submissions", JSON.stringify(submissions));
        loadSubmissions(); // Atnaujinti sąrašą
    }

    function deleteSubmission(index) {
        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
        submissions.splice(index, 1);
        localStorage.setItem("submissions", JSON.stringify(submissions));
        loadSubmissions(); // Atnaujinti sąrašą
    }

    if (clearButton) {
        clearButton.addEventListener("click", function () {
            localStorage.removeItem("submissions");
            loadSubmissions();
        });
    }

    tableBody.addEventListener("click", function (event) {
        const index = event.target.getAttribute("data-index");

        if (event.target.classList.contains("delete-btn")) {
            deleteSubmission(index);
        } else if (event.target.classList.contains("complete-btn")) {
            toggleCompleted(index);
        }
    });

    loadSubmissions();
});
