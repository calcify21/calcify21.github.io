const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function fetchRecipes(query) {
    const fetchData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            showRecipes(data.meals);
            console.log(data.meals);
        })
        .catch(error => console.log(error));

}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    fetchRecipes(searchTerm)
})

function showRecipes(recipes) {
    const recipeContainer = document.getElementById("recipe-container");
    const modalContainer = document.getElementById("modals");
    recipeContainer.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeTitle = recipe.strMeal;
        const recipeImage = recipe.strMealThumb;
        const recipeArea = recipe.strArea;
        const recipeItemHtmlCtrl = `
        <div class="col">
            <div class="card h-100">
                <img src=${recipeImage} class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${recipeTitle}</h5>
                    <p class="card-text"><span class="fw-bold">${recipeArea}</span> Dish</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" id=${recipes.indexOf(recipe)} onclick="showModal(${recipes.indexOf(recipe)}, ${JSON.stringify(recipes)})">View Recipe</button>
                </div>
            </div>
        </div>
        `
        // const recipeItemModalCtrl = `
        // <div class="modal fade" id="recipeModal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
        //     <div class="modal-dialog modal-dialog-scrollable">
        //         <div class="modal-content">
        //             <div class="modal-header">
        //                 <h1 class="modal-title fs-5" id="label">Modal title</h1>
        //                 <button type="button" class="btn-close" data-bs-dismiss="modal"
        //                             aria-label="Close"></button>
        //             </div>
        //             <div class="modal-body">
        //                 <h4 class="fw-bold">Ingredients:</h4>
        //                 <p>${getIngredients(recipe)}</p>
        //                 <h4 class="fw-bold">Instructions:</h4>
        //                 <p>${recipe.strInstructions}</p>
        //             </div >
        //             <div class="modal-footer">
        //                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        //                 <a class="btn btn-primary" href="" role="button">Open recipe in Youtube</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        //     `
        // const formattedText = recipeItemModalCtrl.replace(/\r\n/g, '<br>');
        recipeContainer.insertAdjacentHTML("beforeend", recipeItemHtmlCtrl);
        // modalContainer.insertAdjacentHTML("beforeend", formattedText);
    });
}

const getIngredients = (recipe) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientList += `${ingredient} - ${measure}<br>`;
        } else {
            break;
        }
    }
    return ingredientList;
}

function showModal(id, recipes) {
    // const modal = document.getElementById("recipeModal");
    const recipe = recipes[id];
    // const modalTitle = modal.querySelector(".modal-title");
    // const modalBody = modal.querySelector(".modal-body");
    // const modalFooter = modal.querySelector(".modal-footer a");
    // modalTitle.textContent = recipe.strMeal;
    // modalBody.innerHTML = `
    //     <h4 class="fw-bold">Ingredients:</h4>
    //     <p>${getIngredients(recipe)}</p>
    //     <h4 class="fw-bold">Instructions:</h4>
    //     <p>${recipe.strInstructions}</p>
    //     `;
    // modalFooter.href = `https://www.youtube.com/results?search_query=${recipe.strMeal}+recipe`;
    const recipeItemModalCtrl = `
        <div class="modal fade" id="recipeModal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="label">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h4 class="fw-bold">Ingredients:</h4>
                        <p>${getIngredients(recipe)}</p>
                        <h4 class="fw-bold">Instructions:</h4>
                        <p>${recipe.strInstructions}</p>
                    </div >
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a class="btn btn-primary" href="" role="button">Open recipe in Youtube</a>
                    </div>
                </div>
            </div>
        </div>
            `
    const formattedText = recipeItemModalCtrl.replace(/\r\n/g, '<br>');
    document.getElementById("modals").insertAdjacentHTML("beforeend", formattedText);
}