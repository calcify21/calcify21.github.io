function addField() {
    const newInputCount = document.getElementsByClassName("num-input").length + 1
    const newInput = document.createElement("div");
    newInput.className = "form-floating mb-3";
    const newInputLabel = document.createElement("label");
    newInputLabel.htmlFor = `num${newInputCount}`;
    newInputLabel.textContent = `Number ${newInputCount}`;
    const newInputField = document.createElement("input");
    newInputField.type = "number";
    newInputField.className = "form-control num-input";
    newInputField.placeholder = `Enter number ${newInputCount}`;
    newInputField.id = `num${newInputCount}`;
    newInput.appendChild(newInputField);
    newInput.appendChild(newInputLabel);
    document.getElementById("input-container").appendChild(newInput);
}

function findAverage() {
    const numInputs = document.getElementsByClassName("num-input");
    let sum = 0;
    let count = 0;
    let result = document.getElementById("result");
    result.style.display = "block";
    for (let i = 0; i < numInputs.length; i++) {
        const num = parseFloat(numInputs[i].value);
        if (!isNaN(num)) {
            sum += num;
            count++;
            result.classList.replace("alert-danger", "alert-success")
            result.textContent = `The average is ${sum / count}`;
        } else {
            result.textContent = "Please enter valid numbers.";
            result.classList.replace("alert-success", "alert-danger")
        }
    }
}