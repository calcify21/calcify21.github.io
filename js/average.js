function addField() {
    const newInputCount = document.getElementsByClassName("num-input").length + 1
    // * Row
    const newInput = document.createElement("div");
    newInput.className = "row";
    // * Col 1
    const newCol1 = document.createElement("div");
    newCol1.className = "col";
    // * Input Field and Label Div
    const newDiv = document.createElement("div");
    newDiv.className = "form-floating mb-3";
    // * Input Field
    const newInputField = document.createElement("input");
    newInputField.type = "number";
    newInputField.className = "form-control num-input";
    newInputField.placeholder = `Enter number ${newInputCount}`;
    newInputField.id = `num${newInputCount}`;
    // * Input Label
    const newInputLabel = document.createElement("label");
    newInputLabel.htmlFor = `num${newInputCount}`;
    newInputLabel.textContent = `Number ${newInputCount}`;
    // * Col 2
    const newCol2 = document.createElement("div");
    newCol2.className = "col-1";
    // * Remove Button
    const newRemoveBtn = document.createElement("button");
    newRemoveBtn.className = "fa-solid fa-xmark-circle btn text-danger";
    newRemoveBtn.style.fontSize = "30px";
    // * Append all new elements
    document.getElementById("input-container").appendChild(newInput);
    newInput.appendChild(newCol1);
    newCol1.appendChild(newDiv);
    newDiv.appendChild(newInputField);
    newDiv.appendChild(newInputLabel);
    newInput.appendChild(newCol2);
    newCol2.appendChild(newRemoveBtn);
    // * Event Listener for Remove Button
    newRemoveBtn.addEventListener("click", function () {
        newInput.remove();
    })
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

function resetFields() {
    const result = document.getElementById("result");
    result.style.display = "none";
}

const toastTrigger = document.getElementById('reset1')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}