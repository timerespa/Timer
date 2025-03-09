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

    // Ustawienie pierwszego czasu respa na 13:44:55
    const initialHour = 13;
    const initialMinute = 44;
    const initialSecond = 55;
    const interval = 1 * 60 * 60 * 1000 + 2 * 60 * 1000 + 30 * 1000; // 1h 2m 30s w milisekundach

    function getLastRespTime() {
        const now = Date.now(); // Aktualny czas w milisekundach
        let baseTime = new Date();
        baseTime.setHours(initialHour, initialMinute, initialSecond, 0);

        // Jeśli czas bazowy jest w przyszłości, cofnij o jeden dzień
        if (baseTime.getTime() > now) {
            baseTime.setDate(baseTime.getDate() - 1);
        }

        // Znajdź ostatni resp w stosunku do bieżącego czasu
        let lastResp = baseTime.getTime();
        while (lastResp + interval <= now) {
            lastResp += interval;
        }

        return new Date(lastResp);
    }

    function getNextRespTime() {
        return new Date(getLastRespTime().getTime() + interval);
    }

    function updateTimer() {
        const nextResp = getNextRespTime().getTime();
        const now = Date.now();
        const timeDiff = nextResp - now;

        if (timeDiff <= 0) {
            updateRespList();
            return;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        // Użycie precyzyjnego setTimeout dla pełnej synchronizacji
        setTimeout(updateTimer, 1000 - (Date.now() % 1000));
    }

    function updateRespList() {
        respList.innerHTML = "";
        let nextResp = getNextRespTime().getTime();

        for (let i = 0; i < 12; i++) {
            let respTime = new Date(nextResp + i * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });

            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        nextRespElement.textContent = new Date(nextResp).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    // Uruchomienie timera
    updateRespList();
    updateTimer();
}
