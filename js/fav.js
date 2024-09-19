function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let container = document.getElementById('favorites-container');
    if (favorites == undefined || favorites.length == 0) {
        container.innerHTML = '<div class="center alert alert-warning" role="alert">You do not have any favorite calculators yet. Click on the star icon on the <a href="calcs.html" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">calculators page</a> to add a calculator to your list.</div>';
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
    } else if (id == 'Mean, Median, Mode, Range Calculator') {
        text = "A calculator to find the mean, median, mode, and range of a set of numbers."
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