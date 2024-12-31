const sliderValue = document.getElementById("passwordLength");
sliderValue.addEventListener("input", function () {
    document.getElementById("length").textContent = sliderValue.value;
});

// const generateBtn = document.getElementById("generateBtn");
// document.getElementById("generateBtn").addEventListener("click", generatePassword);

var generatePassword = function () {
    const length = sliderValue.value;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-specialChars').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}[]<>?,.';

    let characterPool = '';
    if (includeLowercase) characterPool += lowercase;
    if (includeUppercase) characterPool += uppercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }

    document.getElementById("generatedPwd").value = password;
}

function decreaseLength() {
    sliderValue.value = parseInt(sliderValue.value) - 1; // Convert to number and then subtract 1
    document.getElementById("length").textContent = sliderValue.value;
}

function increaseLength() {
    sliderValue.value = parseInt(sliderValue.value) + 1; // Convert to number and then add 1
    document.getElementById("length").textContent = sliderValue.value;
}

function copyPassword() {
    const password = document.getElementById('generatedPwd').value;
    // const toastTrigger = document.getElementById('copyBtn');

    const toast1 = document.getElementById('copied')
    const toast2 = document.getElementById('nopwd')
    const toast3 = document.getElementById('err')

    if (!password) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast2);
        toastBootstrap.show();
        return;
    }

    // Proceed with clipboard copy
    if (navigator.clipboard) {
        navigator.clipboard.writeText(password)
            .then(() => {
                // alert('Password copied to clipboard!');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast1);
                toastBootstrap.show()
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                // alert('Failed to copy password. Check browser permissions or HTTPS.');
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast3);
                toastBootstrap.show()
            });
    } else {
        alert('Clipboard API not supported in this browser. Please copy manually.');
    }
}

const checkboxes = document.querySelectorAll('.controlled-checkbox');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const checkedCheckboxes = [...checkboxes].filter(cb => cb.checked);
        if (checkedCheckboxes.length === 0) {
            checkbox.checked = true;
        }
    });
});

window.onload = function () {
    document.getElementById("length").textContent = sliderValue.value;
}