	// Ustawienie domyślnej daty końcowej
		let countdownDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(); 

// Aktualizacja zegara co sekundę
function updateCountdown() {
    let now = new Date().getTime();
    let timeLeft = countdownDate - now;

    if (timeLeft > 0) {
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById("countdown").innerHTML = "<h2>Czas minął!</h2>";
    }
}

// Obsługa zmiany daty wprowadzonej przez użytkownika
document.getElementById("datetime-input").addEventListener("change", function () {
    let newDate = new Date(this.value).getTime();
    if (!isNaN(newDate)) {
        countdownDate = newDate;
        updateCountdown();
    }
});

// Uruchomienie zegara
setInterval(updateCountdown, 1000);
updateCountdown();