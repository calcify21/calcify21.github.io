function addField() {
    const newInputCount = document.getElementsByClassName("num-input").length + 1;
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
    newRemoveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        newInput.remove();
    });
    // }

    // function removeField(newInput) {
    //     newInput.remove();
}

// function find() {
//     const numInputs = document.getElementsByClassName("num-input");
//     let sum = 0;
//     let count = 0;
//     let result = document.getElementById("result");
//     result.style.display = "block";
//     for (let i = 0; i < numInputs.length; i++) {
//         const num = parseFloat(numInputs[i].value);
//         if (!isNaN(num)) {
//             sum += num;
//             count++;
//             result.classList.replace("alert-danger", "alert-success");
//             result.textContent = `The average is ${sum / count}`;
//         } else {
//             result.textContent = "Please enter valid numbers.";
//             result.classList.replace("alert-success", "alert-danger");
//         }
//     }
// }

function check() {
    const numInputs = document.getElementsByClassName("num-input");
    let result = document.getElementById("result");
    result.style.display = "block";
    let sum = 0;
    let values = [];
    for (let i = 0; i < numInputs.length; i++) {
        const num = parseFloat(numInputs[i].value);
        if (isNaN(num)) {
            result.innerHTML = "Please enter valid numbers.";
            result.classList.add("alert-danger");
            break;
        } else {
            sum += num;
            values.push(num);
            find(sum, values)
        }
    };
}

function find(sum, values) {
    const numInputs = document.getElementsByClassName("num-input");
    // * Mean (Average)
    const mean = sum / numInputs.length;
    // * Median
    const sortedValues = values.sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 !== 0 ? sortedValues[middle] : (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    // * Range
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    // * Mode
    const frequency = {};
    let mode = [];
    let maxFreq = 0;
    values.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });
    for (const num in frequency) {
        if (frequency[num] === maxFreq) {
            mode.push(Number(num));
        }
    }
    if (mode.length === values.length) {
        mode = "All values appeared just once.";
    } else if (mode.length === 1) {
        mode = `${mode} - appeared ${maxFreq} times.`;
    } else {
        // mode = mode.join(", ");
        mode = `${mode.join(", ")} - each appeared ${maxFreq} times.`
    }
    displayResults(mean, median, mode, range);
}

function displayResults(mean, median, mode, range) {
    let result = document.getElementById("result");
    let resultsTableBody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    document.getElementById("resultsTable").style.display = "table";
    result.classList.remove("alert-danger");
    result.style.display = "none";

    // Clear previous results
    resultsTableBody.innerHTML = "";

    // Add results to the table
    addRow(resultsTableBody, "Mode", mode);
    addRow(resultsTableBody, "Mean", mean);
    addRow(resultsTableBody, "Median", median);
    addRow(resultsTableBody, "Range", range);
}

function addRow(table, label, value) {
    const row = table.insertRow();
    const labelCell = row.insertCell();
    const valueCell = row.insertCell();
    labelCell.textContent = label;
    valueCell.textContent = value;
}

function resetFields() {
    const result = document.getElementById("result");
    let resultsTable = document.getElementById("resultsTable");
    resultsTable.style.display = "none";
    const inputContainer = document.getElementById("input-container");
    result.style.display = "none";
    inputContainer.innerHTML = `<div class="form-floating mb-3">
                        <input type="number" class="form-control num-input" placeholder="Enter number 1" id="num1">
                        <label for="num1">Number 1</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control num-input" placeholder="Enter number 2" id="num2">
                        <label for="num2">Number 2</label>
                    </div>`;
}

const toastTrigger = document.getElementById("reset1");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
    });
}
