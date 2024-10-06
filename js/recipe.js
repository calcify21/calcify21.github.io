const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
let recipes = [];

function fetchRecipes(query) {
    const fetchData = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            recipes = data.meals;
            if (recipes === null) {
                document.querySelector(".heading").textContent = "No recipe found for this query.";
                document.querySelector(".heading").classList.add("text-danger");
                document.querySelector("#recipe-container").innerHTML = "";
            } else {
                document.querySelector(".heading").innerHTML = `Showing ${recipes.length} recipes for "${query}": `;
                document.querySelector(".heading").classList.remove("text-danger");
                showRecipes();
            }
            // console.log(data.meals);
        })
        .catch(error => console.log(error));

}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    fetchRecipes(searchTerm)
})

function showRecipes() {
    const recipeContainer = document.getElementById("recipe-container");
    recipeContainer.innerHTML = "";
    recipes.forEach((recipe, index) => {
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
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="showModal(${index})">View Recipe</button>
                </div>
            </div>
        </div>
        `
        recipeContainer.insertAdjacentHTML("beforeend", recipeItemHtmlCtrl);
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

function showModal(id) {
    let ingredients = document.querySelector(".ingredients")
    let instructions = document.querySelector(".instructions")
    let recipeLink = document.querySelector(".recipe-link")
    let modalTitle = document.querySelector(".modal-title");
    const recipe = recipes[id];
    const recipeInstructions = recipe.strInstructions.replace(/\r\n/g, '<br>');
    const recipeIngredients = getIngredients(recipe);
    recipeLink.href = recipe.strYoutube;
    instructions.innerHTML = recipeInstructions;
    ingredients.innerHTML = recipeIngredients;
    modalTitle.innerHTML = recipe.strMeal;
}