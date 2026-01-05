const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
let recipes = [];

function fetchRecipes(query) {
  // Show a loading message
  document.querySelector(".heading").textContent = "Searching...";
  document.querySelector("#recipe-container").innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((response) => response.json())
    .then((data) => {
      recipes = data.meals;
      if (recipes === null) {
        document.querySelector(".heading").textContent =
          "No recipe found for this query.";
        document.querySelector(".heading").classList.add("text-danger");
        document.querySelector("#recipe-container").innerHTML = "";
      } else {
        document.querySelector(
          ".heading"
        ).innerHTML = `Showing ${recipes.length} recipes for "${query}": `;
        document.querySelector(".heading").classList.remove("text-danger");
        showRecipes();
      }
      // console.log(data.meals);
    })
    .catch((error) => console.log(error));
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  fetchRecipes(searchTerm);
});

function showRecipes() {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";
  recipes.forEach((recipe, index) => {
    const recipeTitle = capitalize(recipe.strMeal);
    const recipeImage = recipe.strMealThumb;
    const recipeArea = recipe.strArea;
    const recipeItemHtmlCtrl = `
        <div class="col">
            <div class="card h-100">
                <img src=${recipeImage} class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${recipeTitle}</h5>
                    <p class="card-text"><span class="fw-bold">${recipeArea}</span> Dish</p>
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="showModal(${index})">View Recipe</button>
                </div>
            </div>
        </div>
        `;
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
};

function showModal(id) {
  let ingredients = document.querySelector(".ingredients");
  let instructions = document.querySelector(".instructions");
  let recipeLink = document.querySelector(".recipe-link");
  let modalTitle = document.querySelector(".modal-title");
  const recipe = recipes[id];
  const recipeInstructions = recipe.strInstructions.replace(/\r\n/g, "<br>");
  const recipeIngredients = getIngredients(recipe);
  recipeLink.href = recipe.strYoutube;
  instructions.innerHTML = recipeInstructions;
  ingredients.innerHTML = recipeIngredients;
  modalTitle.innerHTML = `How to make ${capitalize(recipe.strMeal)}`;
}

function capitalize(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

// const searchInput = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");
// let recipes = []; // This will now store Spoonacular recipe objects

// // IMPORTANT: Replace 'YOUR_SPOONACULAR_API_KEY' with your actual API key
// const SPOONACULAR_API_KEY = "310e1e45b44d4a9a96e987cd04b2681f";

// function fetchRecipes(query) {
//   // Spoonacular's complexSearch endpoint is great for general recipe queries
//   const fetchedData = fetch(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&number=20&addRecipeInformation=true&addRecipeNutrition=true`
//     // `number=20` to get up to 20 results (adjust as needed)
//     // `addRecipeInformation=true` to get details like instructions, ready time, servings directly in the search results
//     // `addRecipeNutrition=true` to get basic nutrition information
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       // Spoonacular search results are typically in a 'results' array
//       recipes = data.results;

//       if (recipes === null || recipes.length === 0) {
//         document.querySelector(".heading").textContent =
//           "No recipe found for this query.";
//         document.querySelector(".heading").classList.add("text-danger");
//         document.querySelector("#recipe-container").innerHTML = "";
//       } else {
//         document.querySelector(
//           ".heading"
//         ).innerHTML = `Showing ${recipes.length} recipes for "${query}": `;
//         document.querySelector(".heading").classList.remove("text-danger");
//         showRecipes();
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching recipes from Spoonacular:", error);
//       document.querySelector(".heading").textContent =
//         "Failed to fetch recipes. Please try again later.";
//       document.querySelector(".heading").classList.add("text-danger");
//       document.querySelector("#recipe-container").innerHTML = "";
//     });
// }

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const searchTerm = searchInput.value.trim();
//   if (searchTerm) {
//     // Only fetch if there's a search term
//     fetchRecipes(searchTerm);
//   } else {
//     document.querySelector(".heading").textContent =
//       "Please enter a recipe name to search.";
//     document.querySelector(".heading").classList.add("text-warning");
//     document.querySelector("#recipe-container").innerHTML = "";
//   }
// });

// function showRecipes() {
//   const recipeContainer = document.getElementById("recipe-container");
//   recipeContainer.innerHTML = ""; // Clear previous recipes
//   recipes.forEach((recipe, index) => {
//     // Spoonacular uses 'title' and 'image', and `id` for unique identifier
//     const recipeTitle = capitalize(recipe.title);
//     const recipeImage = recipe.image;
//     // Spoonacular results from complexSearch don't always have 'area' directly.
//     // You might need to fetch full details or infer from cuisine if available.
//     // For now, let's just display the title and image.
//     // If you want area, you'd typically get it from the detailed recipe object.
//     const recipeArea =
//       recipe.cuisines && recipe.cuisines.length > 0
//         ? capitalize(recipe.cuisines[0])
//         : "Various"; // Example: use first cuisine if available

//     const recipeItemHtmlCtrl = `
//         <div class="col">
//             <div class="card h-100">
//                 <img src=${recipeImage} class="card-img-top" alt="${recipeTitle}">
//                 <div class="card-body">
//                     <h5 class="card-title">${recipeTitle}</h5>
//                     <p class="card-text"><span class="fw-bold">${recipeArea}</span> Dish</p>
//                     <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#recipeModal" onclick="showModal(${index})">View Recipe</button>
//                 </div>
//             </div>
//         </div>
//         `;
//     recipeContainer.insertAdjacentHTML("beforeend", recipeItemHtmlCtrl);
//   });
// }

// const getIngredients = (recipe) => {
//   let ingredientList = "";
//   // Spoonacular's ingredients are in an array called 'extendedIngredients'
//   // Each item in this array is an object with 'original' (e.g., "1 cup sugar")
//   if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
//     recipe.extendedIngredients.forEach((ingredient) => {
//       ingredientList += `<li>${ingredient.original}</li>`; // Use <li> for better structure
//     });
//   } else {
//     ingredientList = "No ingredients listed.";
//   }
//   return ingredientList;
// };

// function showModal(id) {
//   let ingredientsContainer = document.querySelector(".ingredients");
//   let instructionsContainer = document.querySelector(".instructions");
//   let recipeLink = document.querySelector(".recipe-link");
//   let modalTitle = document.querySelector(".modal-title");
//   const recipe = recipes[id]; // Get the full recipe object from your 'recipes' array

//   // Spoonacular instructions are typically an array of objects
//   // Each object in 'analyzedInstructions' has a 'steps' array
//   let recipeInstructionsHtml = "";
//   if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
//     recipe.analyzedInstructions[0].steps.forEach((step) => {
//       recipeInstructionsHtml += `<li>${step.number}. ${step.step}</li>`;
//     });
//   } else if (recipe.instructions) {
//     // Sometimes plain text instructions are available
//     recipeInstructionsHtml = `<li>${recipe.instructions.replace(
//       /\./g,
//       ".</li><li>"
//     )}</li>`; // Basic formatting for plain text
//   } else {
//     recipeInstructionsHtml = "No instructions available.";
//   }

//   const recipeIngredientsHtml = getIngredients(recipe); // Re-using your updated function

//   recipeLink.href = recipe.sourceUrl || "#"; // Use sourceUrl for a more general recipe link
//   recipeLink.textContent = recipe.sourceUrl
//     ? "View Full Recipe"
//     : "No external link available";

//   instructionsContainer.innerHTML = `<ol>${recipeInstructionsHtml}</ol>`; // Use <ol> for ordered steps
//   ingredientsContainer.innerHTML = `<ul>${recipeIngredientsHtml}</ul>`; // Use <ul> for unordered ingredients
//   modalTitle.innerHTML = `How to make ${capitalize(recipe.title)}`;
// }

// // Your existing capitalize function remains the same
// function capitalize(str) {
//   if (!str) return ""; // Handle null or empty string
//   return str.replace(
//     /\w\S*/g,
//     (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
//   );
// }
