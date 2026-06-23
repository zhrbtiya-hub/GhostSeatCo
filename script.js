const modal = document.getElementById("scannerModal");
const closeBtn = document.querySelector(".close-btn");
const scanButtons = document.querySelectorAll(".open-scan");
let html5QrCode;

// Function to start the scanner
function startScanner() {
    modal.style.display = "block";
    html5QrCode = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
        // --- SPEED & REDIRECT FIX ---
        // Instead of a slow alert, we go straight to the app page
        document.getElementById("scanResult").innerText = "Seat Detected: " + decodedText;
        
        setTimeout(() => {
            stopScanner();
            // This sends the user to app.html with the correct seat ID
            window.location.href = "app.html?seat=" + decodedText;
        }, 300); // Very fast 0.3 second delay
    });
}

// Function to stop the scanner
function stopScanner() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            modal.style.display = "none";
        }).catch(err => console.log(err));
    } else {
        modal.style.display = "none";
    }
}

// Attach event to all Scan buttons
scanButtons.forEach(button => {
    button.addEventListener("click", startScanner);
});

closeBtn.onclick = stopScanner;

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) { stopScanner(); }
}