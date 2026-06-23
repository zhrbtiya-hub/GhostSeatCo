const modal = document.getElementById('appModal');
const startAppBtn = document.getElementById('startAppBtn');
const closeBtn = document.querySelector('.close-app');
let html5QrCode;
let selectedSeatNum = null;

// 1. OPEN APP
startAppBtn.onclick = () => {
    modal.style.display = "flex";
    showScreen('screen-scanner');
    startScanner();
};

// 2. SCANNER LOGIC
function startScanner() {
    html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (text) => {
        simulateScan(); // Successfully scanned!
    }).catch(err => console.log("Scanner error:", err));
}

function simulateScan() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            showScreen('screen-map');
            generateSeats();
        }).catch(() => {
            showScreen('screen-map');
            generateSeats();
        });
    } else {
        showScreen('screen-map');
        generateSeats();
    }
}

// 3. SCREEN SWITCHER
function showScreen(screenId) {
    document.querySelectorAll('.app-screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'flex';
    if(screenId === 'screen-timer') startTimer();
}

// 4. SEAT GENERATOR
function generateSeats() {
    const grid = document.getElementById('seatGrid');
    grid.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const seat = document.createElement('div');
        seat.className = 'seat';
        if (Math.random() > 0.7) {
            seat.classList.add('occupied');
            seat.innerText = "X";
        } else {
            seat.innerText = i;
            seat.onclick = () => {
                document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
                seat.classList.add('selected');
                selectedSeatNum = i;
                document.getElementById('bookBtn').disabled = false;
                document.getElementById('finalSeat').innerText = i;
            };
        }
        grid.appendChild(seat);
    }
}

// 5. TIMER LOGIC
function startTimer() {
    let time = 900; // 15 mins
    const timerDisplay = document.getElementById('countdown');
    const countdown = setInterval(() => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        timerDisplay.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (--time < 0) {
            clearInterval(countdown);
            alert("Time is up! Your seat is now available for others.");
            closeApp();
        }
    }, 1000);
}

function closeApp() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => { modal.style.display = "none"; });
    } else {
        modal.style.display = "none";
    }
}

closeBtn.onclick = closeApp;