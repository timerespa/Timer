<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kiedy Spadną Metiny</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <h1>Kiedy Spadną Metiny</h1>
        <p id="nextResp">Najbliższy resp: --:--:--</p>
        <div id="timer">--h --m --s</div>
        <button id="toggleList">Kolejne 12 respów</button>
        <ul id="respList" class="hidden"></ul>
        <p>Autor: LuxuryPL</p>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const timerElement = document.getElementById("timer");
            const nextRespElement = document.getElementById("nextResp");
            const respList = document.getElementById("respList");
            const toggleListButton = document.getElementById("toggleList");

            // Ustawienia respa
            const initialHour = 13;
            const initialMinute = 44;
            const initialSecond = 55;
            const interval = 3750 * 1000; // 1h 2m 30s w milisekundach

            function getNextRespTime() {
                const now = new Date();
                let baseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), initialHour, initialMinute, initialSecond);
                
                // Jeśli najbliższy czas jest w przeszłości — dodaj interwał
                while (baseTime <= now) {
                    baseTime = new Date(baseTime.getTime() + interval);
                }
                return baseTime;
            }

            function updateTimer() {
                const nextResp = getNextRespTime();
                const now = new Date();
                const timeDiff = nextResp - now;

                if (timeDiff <= 0) {
                    updateRespList();
                }

                const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
                nextRespElement.textContent = nextResp.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
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
            }

            toggleListButton.addEventListener("click", function () {
                respList.classList.toggle("hidden");
            });

            updateRespList();
            setInterval(updateTimer, 1000);
        });
    </script>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #1c1c1c;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background-color: #222;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
            width: 90%;
            max-width: 400px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        #nextResp {
            font-size: 18px;
            color: #bbb;
            margin-bottom: 5px;
        }
        #timer {
            font-size: 36px;
            font-weight: bold;
            color: #ffc107;
            margin-bottom: 10px;
        }
        #toggleList {
            background-color: #ffc107;
            color: #000;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 10px;
            transition: background-color 0.2s ease;
        }
        #toggleList:hover {
            background-color: #e0a800;
        }
        #respList {
            list-style-type: none;
            padding: 0;
            max-height: 200px;
            overflow-y: auto;
            background-color: #333;
            border-radius: 8px;
            display: none;
        }
        #respList li {
            padding: 10px;
            border-bottom: 1px solid #444;
            color: #ffc107;
        }
        #respList li:last-child {
            border-bottom: none;
        }
        .hidden {
            display: none;
        }
    </style>
</body>
</html>
