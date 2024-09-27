function addField() {
    const newInputCount = document.getElementsByClassName("num-input").length + 1;
    const ordinalNum = utils().getOrdinalSuffixOf(newInputCount);
    // // * Row
    // const newInput = document.createElement("div");
    // newInput.className = "row";
    // // * Col 1
    // const newCol1 = document.createElement("div");
    // newCol1.className = "col";
    // // * Input Field and Label Div
    // const newDiv = document.createElement("div");
    // newDiv.className = "form-floating mb-3";
    // // * Input Field
    // const newInputField = document.createElement("input");
    // newInputField.type = "number";
    // newInputField.className = "form-control num-input";
    // newInputField.placeholder = `Enter number ${newInputCount}`;
    // newInputField.id = `num${newInputCount}`;
    // // * Input Label
    // const newInputLabel = document.createElement("label");
    // newInputLabel.htmlFor = `num${newInputCount}`;
    // newInputLabel.textContent = `Enter ${ordinalNum} Number`;
    // // * Col 2
    // const newCol2 = document.createElement("div");
    // newCol2.className = "col-1";
    // // * Remove Button
    // const newRemoveBtn = document.createElement("button");
    // newRemoveBtn.className = "fa-solid fa-xmark-circle btn text-danger";
    // newRemoveBtn.style.fontSize = "30px";
    // // * Append all new elements
    // document.getElementById("input-container").appendChild(newInput);
    // newInput.appendChild(newCol1);
    // newCol1.appendChild(newDiv);
    // newDiv.appendChild(newInputField);
    // newDiv.appendChild(newInputLabel);
    // newInput.appendChild(newCol2);
    // newCol2.appendChild(newRemoveBtn);

    let newInputCtrlHtml = `<div class="form-floating mb-3 input${newInputCount}">
    <div class="input-group">
        <input type="number" class="form-control num-input" placeholder="Enter ${ordinalNum} number"
            id="num${newInputCount}">
        <span class="input-group-text" id="basic-addon2">
        <button class="fa-solid fa-xmark-circle btn text-danger"
                style="font-size: 30px;" id=removeBtn${newInputCount}></button>
                </span>
    </div>
</div>`;
    document.getElementById("input-container").insertAdjacentHTML("beforeend", newInputCtrlHtml);

    // * Event Listener for Remove Button
    document.getElementById(`removeBtn${newInputCount}`).addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(`.input${newInputCount}`).remove();
    });
}

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
    // * Range, maximum and minimum values
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

    // * Sort values in ascending order
    const sortedValuesString = sortedValues.join(", ");

    // * Display results
    displayResults(mean, median, mode, range, max, min, values.length, sortedValuesString);
}

function displayResults(mean, median, mode, range, maximum, minimum, count, sortedValues) {
    let result = document.getElementById("result");
    let resultsTableBody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    document.getElementById("resultsTable").style.display = "table";
    result.classList.remove("alert-danger");
    result.style.display = "none";

    // Clear previous results
    resultsTableBody.innerHTML = "";

    // Add results to the table
    addRow(resultsTableBody, "Sorted Data Set", sortedValues);
    addRow(resultsTableBody, "Mean", mean);
    addRow(resultsTableBody, "Median", median);
    addRow(resultsTableBody, "Mode", mode);
    addRow(resultsTableBody, "Range", range);
    addRow(resultsTableBody, "Max value", maximum);
    addRow(resultsTableBody, "Min value", minimum);
    addRow(resultsTableBody, "Count", count);
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
    inputContainer.innerHTML = "";
}

const toastTrigger = document.getElementById("reset1");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
        toastBootstrap.show();
    });
}
