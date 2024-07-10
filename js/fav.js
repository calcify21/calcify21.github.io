function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let container = document.getElementById('favorites-container');
    favorites.forEach(id => {
        let calculatorHtml = generateCalculatorHtml(id);
        container.innerHTML += calculatorHtml;
    });
}

function generateCalculatorHtml(id) {
    let text = "";
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
                    <a href="${id}.html" class="btn btn-outline-primary" target="_blank">Open</a>
                </li>`;
}

window.onload = loadFavorites();