const respTimes = [
    "10:01:05", "11:03:35", "12:06:05", "13:08:35",
    "14:11:05", "15:13:35", "16:16:05", "17:18:35",
    "18:21:05", "19:23:35", "20:26:05", "21:28:35", "22:31:05"
];

function getNextResp() {
    const now = new Date();
    for (let i = 0; i < respTimes.length; i++) {
        const [h, m, s] = respTimes[i].split(":").map(Number);
        const respTime = new Date();
        respTime.setHours(h, m, s, 0);

        if (respTime > now) {
            return { nextResp: respTimes[i], lastResp: respTimes[i - 1] || "Brak" };
        }
    }
    return { nextResp: respTimes[0], lastResp: respTimes[respTimes.length - 1] };
}

function updateCountdown() {
    const { nextResp, lastResp } = getNextResp();
    document.getElementById("nextResp").textContent = nextResp;
    document.getElementById("lastResp").textContent = lastResp;

    const [h, m, s] = nextResp.split(":").map(Number);
    const respTime = new Date();
    respTime.setHours(h, m, s, 0);

    const now = new Date();
    const timeDiff = (respTime - now) / 1000;

    if (timeDiff > 0) {
        const minutes = Math.floor(timeDiff / 60);
        const seconds = Math.floor(timeDiff % 60);
        document.getElementById("timeLeft").textContent = `${minutes} minut, ${seconds} sekund`;
    } else {
        document.getElementById("timeLeft").textContent = "Resp trwa!";
    }
}

function updateRespList() {
    const list = document.getElementById("respList");
    list.innerHTML = "";
    
    const now = new Date();
    let counter = 0;

    for (let i = 0; i < respTimes.length && counter < 12; i++) {
        const [h, m, s] = respTimes[i].split(":").map(Number);
        const respTime = new Date();
        respTime.setHours(h, m, s, 0);

        if (respTime > now) {
            const li = document.createElement("li");
            li.textContent = respTimes[i];
            list.appendChild(li);
            counter++;
        }
    }
}

document.getElementById("next12").addEventListener("click", updateRespList);

setInterval(updateCountdown, 1000);
updateCountdown();
updateRespList();
