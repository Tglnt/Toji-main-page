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

    // Generate QR Code and display it
    var qrCodeDiv = document.getElementById("qrCode");
    qrCodeDiv.innerHTML = "";
    var qrcode = new QRCode(qrCodeDiv, {
        text: inputValue,
        width: 128,
        height: 128,
    });

    // Show the download button
    var downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.style.display = "block";
}

function downloadQRCode() {
    // Get the QR code image as a data URL
    var qrCodeImage = document.getElementById("qrCode").getElementsByTagName("img")[0].src;

    // Create a link element and set its attributes
    var link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = "qrcode.png";

    // Append the link to the document and trigger a click event
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}

function displaySelectedImage() {
    // Get the selected image file
    var inputElement = document.getElementById("image");
    var file = inputElement.files[0];

    // Display the selected image in the container
    var selectedImageContainer = document.getElementById("selectedImageContainer");
    var selectedImage = document.getElementById("selectedImage");

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            selectedImageContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected, hide the image container
        selectedImageContainer.style.display = "none";
        selectedImage.src = "";
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var outputElement = document.getElementById("geolocationOutput");
            outputElement.innerText = `Latitude: ${latitude}\nLongitude: ${longitude}`;
        }, function (error) {
            console.error(error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

