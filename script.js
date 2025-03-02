// Konfiguracja czasu między respami w sekundach (1h 2 min 30 sek)
const respInterval = 3750;

// Funkcja do obliczania czasu do następnego respu
function calculateNextResp() {
    const now = new Date();
    const lastResp = new Date(Math.floor(now.getTime() / (respInterval * 1000)) * (respInterval * 1000));
    const nextResp = new Date(lastResp.getTime() + respInterval * 1000);

    return { now, nextResp };
}

// Aktualizacja timera
function updateTimer() {
    const { now, nextResp } = calculateNextResp();
    const timeDiff = Math.floor((nextResp - now) / 1000);

    const hours = Math.floor(timeDiff / 3600);
    const minutes = Math.floor((timeDiff % 3600) / 60);
    const seconds = timeDiff % 60;

    document.getElementById("countdown").textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    document.getElementById("nextRespTime").textContent =
        nextResp.toLocaleTimeString("pl-PL", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Aktualizacja co sekundę
setInterval(updateTimer, 1000);
updateTimer();
