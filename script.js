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

    // Ustawienie pierwszego czasu respa
    const initialHour = 13;
    const initialMinute = 44;
    const initialSecond = 55;
    const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

    // Funkcja do pobrania czasu ostatniego respa
    function getLastRespTime() {
        let now = new Date();
        let baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), initialHour, initialMinute, initialSecond);

        if (baseTime > now) {
            baseTime.setDate(baseTime.getDate() - 1);
        }

        let lastResp = new Date(baseTime.getTime());
        while (lastResp <= now) {
            lastResp = new Date(lastResp.getTime() + interval);
        }

        return new Date(lastResp.getTime() - interval);
    }

    // Funkcja do pobrania czasu następnego respa
    function getNextRespTime() {
        let lastResp = getLastRespTime();
        return new Date(lastResp.getTime() + interval);
    }

    // Funkcja do aktualizacji timera
    function updateTimer() {
        let nextResp = getNextRespTime();
        let now = new Date();
        let timeDiff = nextResp - now;

        if (timeDiff <= 0) {
            updateRespList(); // Automatyczna aktualizacja listy po odliczeniu
            return;
        }

        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Poprawiona aktualizacja timeru (bez opóźnień)
        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }

    // Funkcja do aktualizacji listy respów
    function updateRespList() {
        respList.innerHTML = "";
        let nextResp = getNextRespTime();

        for (let i = 0; i < 12; i++) {
            let respTime = new Date(nextResp.getTime() + i * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        nextRespElement.textContent = nextResp.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }

    // Przycisk do pokazywania i ukrywania listy
    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    updateRespList(); // Aktualizacja listy na start
    setInterval(updateTimer, 1000); // Odliczanie co sekundę
}
