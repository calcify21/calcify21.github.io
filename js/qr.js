document.getElementById('generateBtn').addEventListener('click', function () {
    const qrInput = document.getElementById('qrInput').value;
    const qrSize = parseInt(document.getElementById('qrSize').value, 10);
    const qrCodeDiv = document.getElementById('qrcode');

    // Clear previous QR code
    qrCodeDiv.innerHTML = '';

    if (qrInput) {
        // Generate QR code
        new QRCode(qrCodeDiv, {
            text: qrInput,
            width: qrSize,
            height: qrSize,
        });

        // Show download button
        document.getElementById('downloadBtn').style.display = 'block';
    } else {
        alert('Please enter a valid text or URL');
    }
});

document.getElementById('downloadBtn').addEventListener('click', function () {
    const qrCodeImg = document.querySelector('#qrcode img');
    if (qrCodeImg) {
        const link = document.createElement('a');
        link.href = qrCodeImg.src;
        link.download = 'qr_code.png';
        link.click();
    } else {
        alert('Please generate the QR code first');
    }
});