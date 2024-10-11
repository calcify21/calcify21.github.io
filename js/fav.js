function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let container = document.getElementById('favorites-container');
    if (favorites == undefined || favorites.length == 0) {
        container.innerHTML = '<div class="text-center alert alert-warning" role="alert">You do not have any favorite calculators yet. Click on the star icon on the <a href="calcs.html" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">calculators page</a> to add a calculator to your list.</div>';
    } else {
        favorites.forEach(id => {
            let calculatorHtml = generateCalculatorHtml(id);
            container.innerHTML += calculatorHtml;
        });
    }
}

function generateCalculatorHtml(id) {
    let text = "";
    let firstWord;
    if (id == 'Prime Number Checker') {
        text = "A calculator to check whether the given number is prime or not."
        firstWord = "prime"
    } else if (id == 'Percentage Calculator') {
        text = "A calculator containing various operations on percentages."
        firstWord = "percentage"
    } else if (id == 'Area Calculator') {
        text = "A calculator to find the area of various 2D figures."
        firstWord = "area"
    } else if (id == 'Mean, Median, Mode, Range Calculator') {
        text = "A calculator to find the mean, median, mode, and range of a set of numbers."
        firstWord = "centraltendancy"
    } else if (id == "Recipe APP") {
        text = "A recipe app that allows users to search for their favourite recipes."
        firstWord = "recipe"
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

function removeAllFavorites() {
    localStorage.removeItem('favorites');
    loadFavorites();
}

// Toast
const toastTrigger = document.getElementById('removeFavoritesBtn')
const toastLiveExample = document.getElementById('liveToast')

if (document.querySelector("#removeFavoritesBtn")) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}

window.onload = loadFavorites();