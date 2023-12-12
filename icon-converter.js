// icon-converter.js

function convertToIco() {
    const inputElement = document.getElementById('imageInput');
    const canvasElement = document.getElementById('resultCanvas');
    const downloadLink = document.getElementById('downloadLink');

    const file = inputElement.files[0];
    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const ctx = canvasElement.getContext('2d');
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(img, 0, 0, 64, 64);

            const imageData = ctx.getImageData(0, 0, 64, 64);
            // TODO: Implement ICO conversion logic (this is a simplified example)

            // Extract file name without extension
            const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');

            // Display download link
            downloadLink.href = canvasElement.toDataURL();
            downloadLink.download = `${fileNameWithoutExtension}.ico`;
            downloadLink.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Function to initiate download when the user clicks the "Download ICO" link
function initiateDownload() {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.click();
}
