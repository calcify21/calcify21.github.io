document.getElementById('generateBtn').addEventListener('click', function () {
    const qrInput = document.getElementById('qrInput').value;
    const qrSize = parseInt(document.getElementById('qrSize').value, 10);
    const qrCodeDiv = document.getElementById('qrcode');

    // Clear previous QR code
    qrCodeDiv.innerHTML = '';

    const toast = document.getElementById('liveToast');
    if (qrInput) {
        const qrCode = new QRCode(qrCodeDiv, {
            text: qrInput,
            width: qrSize,
            height: qrSize,
        });

        // Show the download button
        document.getElementById('downloadBtn').style.display = 'block';

        // Show QR code container
        document.getElementById('qrcode').style.display = 'block';
    } else {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
        toastBootstrap.show()
    }
});

// Function to download the QR code as an image
document.getElementById('downloadBtn').addEventListener('click', function () {
    const qrCodeImg = document.querySelector('#qrcode img');
    if (qrCodeImg) {
        const link = document.createElement('a');
        link.href = qrCodeImg.src;
        link.download = 'qr_code.png';
        link.click();
    } else {
        document.getElementById("generateBtn").click();
        document.getElementById("downloadBtn").click();
    }
});

// Toast
const toastTrigger = document.getElementById('removeFavoritesBtn')
const toastLiveExample = document.getElementById('liveToast')

if (document.querySelector("#removeFavoritesBtn")) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}