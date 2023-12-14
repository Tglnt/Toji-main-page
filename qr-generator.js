function handleInputType() {
    // Get the selected input type
    var inputType = document.getElementById("inputType").value;

    // Hide all input fields
    var inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach(function (field) {
        field.style.display = "none";
    });

    // Show the selected input field
    if (inputType !== "refresh") {
        var selectedField = document.getElementById(inputType + "Input");
        selectedField.style.display = "block";
    } else {
        // If "Refresh" is selected, clear the QR code, reset input fields, and hide the selected image
        document.getElementById("qrCode").innerHTML = "";
        document.getElementById("downloadBtn").style.display = "none";
        document.getElementById("inputType").selectedIndex = 0;

        var selectedImageContainer = document.getElementById("selectedImageContainer");
        selectedImageContainer.style.display = "none";
        document.getElementById("selectedImage").src = "";
    }
}

function generateQRCode() {
    // Get the selected input type
    var inputType = document.getElementById("inputType").value;

    // Get the value based on the selected input type
    var inputValue;
    switch (inputType) {
        case "text":
            inputValue = document.getElementById("text").value;
            break;
        case "email":
            inputValue = document.getElementById("email").value;
            break;
        case "link":
            inputValue = document.getElementById("link").value;
            break;
        case "phone":
            inputValue = document.getElementById("phone").value;
            break;
        case "image":
            // You can handle image input differently (e.g., upload to a server) if needed
            // For simplicity, we'll use a placeholder text here
            inputValue = "Image Input (Not Implemented)";
            break;
        case "geolocation":
            // Get the geolocation data
            inputValue = document.getElementById("geolocationOutput").innerText;
            break;
        case "contact":
            // Get contact information
            var contactName = document.getElementById("contactName").value;
            var contactEmail = document.getElementById("contactEmail").value;
            var contactPhone = document.getElementById("contactPhone").value;
            inputValue = `Name: ${contactName}\nEmail: ${contactEmail}\nPhone: ${contactPhone}`;
            break;
    }

    // Generate QR Code with a white border
    var qrCodeDiv = document.getElementById("qrCode");
    qrCodeDiv.innerHTML = "";
    var qrcode = new QRCode(qrCodeDiv, {
        text: inputValue,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff", // White border color
    });

    // Show the download button
    var downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.style.display = "block";
}

function downloadQRCode() {
    // Get the QR code image as a data URL
    var qrCodeImage = document.getElementById("qrCode").getElementsByTagName("img")[0];

    // Create a canvas and set its size
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = qrCodeImage.width + 20; // Add 20 pixels for the white border
    canvas.height = qrCodeImage.height + 20; // Add 20 pixels for the white border

    // Draw the QR code with a white border on the canvas
    ctx.fillStyle = "#ffffff"; // Set fill color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with white
    ctx.drawImage(qrCodeImage, 10, 10, qrCodeImage.width, qrCodeImage.height);

    // Convert the canvas to a data URL
    var canvasDataURL = canvas.toDataURL("image/png");

    // Create a link element and set its attributes
    var link = document.createElement("a");
    link.href = canvasDataURL;
    link.download = "qrcode.png"; // Ensure the file extension is ".png"

    // Append the link to the document and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
