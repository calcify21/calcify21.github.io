function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let container = document.getElementById('favorites-container');
    if (favorites == undefined || favorites.length == 0) {
        container.innerHTML = '<div id="result" class="alert alert-danger" role="alert">You do not have any favorite calculators yet. Click on the star icon to add a calculator to your list.</div>';
    } else {
        favorites.forEach(id => {
            let calculatorHtml = generateCalculatorHtml(id);
            container.innerHTML += calculatorHtml;
        });
    }
}

function generateCalculatorHtml(id) {
    let text = "";
    firstWord = id.split(" ")[0];
    if (id == 'Prime Number Checker') {
        text = "A calculator to check whether the given number is prime or not."
    } else if (id == 'Percentage Calculator') {
        text = "A calculator containing various operations on percentages."
    } else if (id == 'Area Calculator') {
        text = "A calculator to find the area of various 2D figures."
    }
    return `<li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">
                            ${id}
                        </div>
                        ${text}
                    </div>
                    <a href="${firstWord.toLowerCase()}.html" class="btn btn-outline-primary">Open</a>
                </li>`;
}
window.onload = loadFavorites();