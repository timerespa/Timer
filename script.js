document.addEventListener("DOMContentLoaded", function () {
    const password = "1711";
    let userPassword = prompt("Podaj hasło, aby uzyskać dostęp:");

    if (userPassword !== password) {
        document.body.innerHTML = "<h1 style='text-align:center; color:red;'>Niepoprawne hasło. Dostęp zabroniony.</h1>";
        return;
    }

    initializePage();
});

function initializePage() {
    const timerElement = document.getElementById("timer");
    const nextRespElement = document.getElementById("nextResp");
    const respList = document.getElementById("respList");
    const toggleListButton = document.getElementById("toggleList");

    if (!timerElement || !nextRespElement || !respList || !toggleListButton) {
        console.error("Nie znaleziono wymaganych elementów strony!");
        return;
    }

    // Czas początkowy pierwszego respa
    const initialRespTime = new Date();
    initialRespTime.setHours(13);
    initialRespTime.setMinutes(44);
    initialRespTime.setSeconds(55);
    initialRespTime.setMilliseconds(0);

    const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

    // Funkcja do obliczania czasu następnego respa
    function getNextRespTime(lastRespTime) {
        return new Date(lastRespTime.getTime() + interval);
    }

    // Funkcja do aktualizacji timera
    function updateTimer() {
        let now = new Date();
        let lastRespTime = new Date(initialRespTime); // Ustalamy bazowy czas pierwszego respa
        let timeDiff = now - lastRespTime;

        // Dopóki czas jest mniejszy od interwału, szukamy najbliższego respa
        if (timeDiff < 0) {
            updateRespList(); // Automatyczna aktualizacja listy po odliczeniu
            return;
        }

        // Przesuwamy się przez kolejne respy, aż znajdziemy ten najbliższy
        let nextRespTime = lastRespTime;
        while (timeDiff > 0) {
            nextRespTime = getNextRespTime(nextRespTime);
            timeDiff = now - nextRespTime;
        }

        let timeUntilNextResp = nextRespTime - now;
        let hours = Math.floor(timeUntilNextResp / (1000 * 60 * 60));
        let minutes = Math.floor((timeUntilNextResp % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeUntilNextResp % (1000 * 60)) / 1000);

        // Wyświetlamy czas do następnego respa
        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        nextRespElement.textContent = nextRespTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    // Funkcja do aktualizacji listy respów
    function updateRespList() {
        respList.innerHTML = "";
        let nextRespTime = new Date(initialRespTime);

        for (let i = 0; i < 12; i++) {
            let respTime = getNextRespTime(nextRespTime);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);

            nextRespTime = respTime; // Ustawiamy kolejne resp w liście
        }
    }

    // Przycisk do pokazywania i ukrywania listy
    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    updateRespList(); // Aktualizacja listy na start
    setInterval(updateTimer, 1000); // Odliczanie co sekundę
}
