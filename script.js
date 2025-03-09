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
        let now = Date.now(); // Aktualny czas w milisekundach
        let baseTime = new Date();
        baseTime.setHours(initialHour, initialMinute, initialSecond, 0);

        // Jeśli baza czasu jest w przyszłości, cofnij o jeden dzień
        if (baseTime.getTime() > now) {
            baseTime.setDate(baseTime.getDate() - 1);
        }

        // Znajdź ostatni czas respa w odniesieniu do bieżącego czasu
        while (baseTime.getTime() + interval <= now) {
            baseTime = new Date(baseTime.getTime() + interval);
        }

        return baseTime;
    }

    function getNextRespTime() {
        return new Date(getLastRespTime().getTime() + interval);
    }

    function updateTimer() {
        let nextResp = getNextRespTime();
        let now = Date.now();
        let timeDiff = nextResp.getTime() - now;

        if (timeDiff <= 0) {
            updateRespList();
            return;
        }

        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        // Synchronizacja co do sekundy z realnym czasem systemowym
        setTimeout(updateTimer, 1000 - (Date.now() % 1000));
    }

    function updateRespList() {
        respList.innerHTML = "";
        let nextResp = getNextRespTime();

        for (let i = 0; i < 12; i++) {
            let respTime = new Date(nextResp.getTime() + i * interval);
            let formattedTime = respTime.toLocaleTimeString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            let listItem = document.createElement("li");
            listItem.textContent = formattedTime;
            respList.appendChild(listItem);
        }

        nextRespElement.textContent = nextResp.toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    toggleListButton.addEventListener("click", function () {
        respList.classList.toggle("hidden");
    });

    // Pełna synchronizacja z systemem
    updateRespList();
    updateTimer();
}
