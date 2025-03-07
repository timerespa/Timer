<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kiedy Spadną Metiny</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #121212;
            color: white;
            text-align: center;
            padding: 20px;
        }
        #passwordScreen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        #mainContent {
            display: none;
        }
        input {
            padding: 10px;
            font-size: 18px;
            margin-bottom: 10px;
        }
        button {
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
        }
    </style>
</head>
<body>

    <!-- Ekran wpisywania hasła -->
    <div id="passwordScreen">
        <h2>Podaj hasło, aby uzyskać dostęp</h2>
        <input type="password" id="passwordInput" placeholder="Wpisz hasło">
        <button onclick="checkPassword()">Zaloguj</button>
        <p id="errorMessage" style="color: red; display: none;">Niepoprawne hasło!</p>
    </div>

    <!-- Treść strony (domyślnie ukryta) -->
    <div id="mainContent">
        <h1>Kiedy Spadną Metiny</h1>
        <p>Najbliższy resp: <span id="nextResp"></span></p>
        <p id="timer"></p>
        <button id="toggleList">Kolejne 12 respów</button>
        <ul id="respList" class="hidden"></ul>
        <p>Autor: LuxuryPL</p>
    </div>

    <script>
        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        }

        async function checkPassword() {
            const enteredPassword = document.getElementById("passwordInput").value;
            const correctHash = "2d689c3524c2bb52c9bc2bb3685a5a9edc537cd68230fc635d3a78c125d697fd"; // Hash dla 1711

            const enteredHash = await hashPassword(enteredPassword);

            if (enteredHash === correctHash) {
                document.getElementById("passwordScreen").style.display = "none";
                document.getElementById("mainContent").style.display = "block";
            } else {
                document.getElementById("errorMessage").style.display = "block";
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            const timerElement = document.getElementById("timer");
            const nextRespElement = document.getElementById("nextResp");
            const respList = document.getElementById("respList");
            const toggleListButton = document.getElementById("toggleList");

            const initialHour = 2;
            const initialMinute = 0;
            const initialSecond = 55;
            const interval = 3750 * 1000;

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

            function getNextRespTime() {
                let lastResp = getLastRespTime();
                return new Date(lastResp.getTime() + interval);
            }

            function updateTimer() {
                let nextResp = getNextRespTime();
                let now = new Date();
                let timeDiff = nextResp - now;

                let hours = Math.floor(timeDiff / (1000 * 60 * 60));
                let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

                if (timeDiff <= 1000) {
                    updateRespList();
                }
            }

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

            toggleListButton.addEventListener("click", function () {
                respList.classList.toggle("hidden");
            });

            updateRespList();
            setInterval(updateTimer, 1000);
        });
    </script>

</body>
</html>
