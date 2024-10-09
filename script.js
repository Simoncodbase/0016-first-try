// Data: category backgrounds
const categoryBackgrounds = {
    'crypto-king': [
        'https://via.placeholder.com/600x400?text=Crypto-King+1',
        'https://via.placeholder.com/600x400?text=Crypto-King+2',
        'https://via.placeholder.com/600x400?text=Crypto-King+3',
    ],
    'crypto-queen': [
        'https://via.placeholder.com/600x400?text=Crypto-Queen+1',
        'https://via.placeholder.com/600x400?text=Crypto-Queen+2',
        'https://via.placeholder.com/600x400?text=Crypto-Queen+3',
    ],
    'birthday': [
        'https://via.placeholder.com/600x400?text=Birthday+1',
        'https://via.placeholder.com/600x400?text=Birthday+2',
        'https://via.placeholder.com/600x400?text=Birthday+3',
    ],
    'christmas': [
        'https://via.placeholder.com/600x400?text=Christmas+1',
        'https://via.placeholder.com/600x400?text=Christmas+2',
        'https://via.placeholder.com/600x400?text=Christmas+3',
    ],
};

// Function to update background images based on selected category
function updateBackgrounds() {
    const category = document.getElementById('category-select').value;
    const backgroundImagesDiv = document.getElementById('background-images');
    const uploadButton = document.getElementById('upload-button');

    backgroundImagesDiv.innerHTML = ''; // Clear previous images
    uploadButton.style.display = 'none'; // Hide the upload button by default

    if (category === 'upload-own-picture') {
        uploadButton.style.display = 'block';
    } else if (category && categoryBackgrounds[category]) {
        categoryBackgrounds[category].forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.onclick = function() {
                changeBackground(imageUrl);
            };
            backgroundImagesDiv.appendChild(img);
        });
    }
}

// Function to trigger file input when upload button is clicked
function triggerFileInput() {
    document.getElementById('file-input').click();
}

// Function to handle the file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            changeBackground(imageUrl);
        }
        reader.readAsDataURL(file);
    }
}

// Function to change the background
function changeBackground(imageUrl) {
    const backgroundImage = document.getElementById('background');
    backgroundImage.src = imageUrl;
}

// Function to handle the review order and save the card content to localStorage
function reviewOrder() {
    saveCardState(); // Save the current state of the card before navigating

    // Clone the card-container to remove edit options
    const cardContainer = document.getElementById('card-container');
    const clonedCard = cardContainer.cloneNode(true);
    clonedCard.querySelectorAll('[contenteditable]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.style.border = 'none'; // Remove borders for a clean look
    });

    // Store the cleaned-up card HTML in localStorage
    localStorage.setItem('cardHTML', clonedCard.innerHTML);

    // Redirect to the review page
    window.location.href = '/review';
}

// Function to save the current state of the card for future editing
function saveCardState() {
    const cardContainer = document.getElementById('card-container');
    localStorage.setItem('cardState', cardContainer.innerHTML); // Save the full HTML of the card container
}

// Function to restore the saved card state and reapply functionality
function restoreCardState() {
    const savedState = localStorage.getItem('cardState');
    if (savedState) {
        document.getElementById('card-container').innerHTML = savedState;
        // Reapply functionality to restored elements
        document.querySelectorAll('#card-container > div').forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.onclick = function() {
                selectTextField(el);
            };
            makeDraggable(el);
        });
    }
}

// Call the restoreCardState function on page load
window.onload = restoreCardState;

let textFieldCount = 0;
let selectedTextField = null;

// Function to add a new text field
function addTextField() {
    textFieldCount++;
    const cardContainer = document.getElementById('card-container');
    const newTextField = document.createElement('div');

    newTextField.setAttribute('contenteditable', 'true');
    newTextField.style.top = '50%';
    newTextField.style.left = '50%';
    newTextField.style.transform = 'translate(-50%, -50%)';
    newTextField.innerText = 'Editable Text';

    newTextField.onclick = function(event) {
        selectTextField(newTextField);
    };

    cardContainer.appendChild(newTextField);
    makeDraggable(newTextField);
    selectTextField(newTextField);
}

// Function to select a text field
function selectTextField(field) {
    if (selectedTextField) {
        selectedTextField.style.borderColor = 'transparent';
    }
    selectedTextField = field;
    selectedTextField.style.borderColor = '#007BFF';
    selectedTextField.focus();
}

// Function to remove the selected text field
function removeSelectedTextField() {
    if (selectedTextField) {
        selectedTextField.remove();
        selectedTextField = null;
    }
}

// Update font, size, and color of the selected text field
function updateSelectedTextStyle() {
    if (!selectedTextField) return;

    const font = document.getElementById('font-select').value;
    const size = document.getElementById('font-size').value;
    const color = document.getElementById('font-color').value;

    selectedTextField.style.fontFamily = font;
    selectedTextField.style.fontSize = size + 'px';
    selectedTextField.style.color = color;
}

// Make text field draggable
function makeDraggable(element) {
    let offsetX = 0, offsetY = 0;

    element.onmousedown = function(e) {
        e.preventDefault();
        document.onmousemove = function(e) {
            offsetX = e.movementX;
            offsetY = e.movementY;
            const rect = element.getBoundingClientRect();
            element.style.left = rect.left + offsetX + 'px';
            element.style.top = rect.top + offsetY + 'px';
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
