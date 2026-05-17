// ============================================================
// RECIPE.JS — Recipe Search App (TheMealDB API)
// Replaces Bootstrap Modal with custom overlay system.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedQuery = urlParams.get("query");
  if (sharedQuery) {
    document.getElementById("recipeInput").value = sharedQuery;
    getRecipes();
  }
});

// Add Enter key support for search
document.getElementById("recipeInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") getRecipes();
});

async function getRecipes() {
  const query = document.getElementById("recipeInput").value.trim();
  const container = document.getElementById("recipeResults");

  if (!query) {
    showToast("Please enter a dish name to search!", "text-bg-warning");
    return;
  }

  // Loading state
  container.innerHTML = `
    <div class="col-span-full flex flex-col items-center justify-center py-12">
      <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-500">Searching for ${query}...</p>
    </div>
  `;

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    if (!data.meals) {
      container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center text-gray-400 py-12">
          <i class="fa-solid fa-face-frown text-6xl mb-4 opacity-20"></i>
          <p>No recipes found for "${query}". Try another dish!</p>
        </div>
      `;
      return;
    }

    renderRecipes(data.meals);
  } catch (err) {
    console.error(err);
    showToast("Failed to fetch recipes. Please check your connection.", "text-bg-danger");
    container.innerHTML = "";
  }
}

function renderRecipes(meals) {
  const container = document.getElementById("recipeResults");
  container.innerHTML = "";

  meals.forEach((meal, index) => {
    const card = document.createElement("div");
    card.className = `recipe-card animate-fade-in-up stagger-${(index % 4) + 1}`;
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy">
      <div class="recipe-card-body">
        <div class="recipe-meta">${meal.strCategory} • ${meal.strArea}</div>
        <h3 class="recipe-title">${meal.strMeal}</h3>
        <div class="mt-auto">
          <button class="btn-calc btn-calc-primary w-full justify-center" onclick="viewRecipe('${meal.idMeal}')">
            View Recipe
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

async function viewRecipe(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    const meal = data.meals[0];

    // Populating Modal
    document.getElementById("modalRecipeName").innerText = meal.strMeal;
    document.getElementById("modalRecipeImg").src = meal.strMealThumb;
    document.getElementById("modalRecipeCategory").innerText = meal.strCategory;
    document.getElementById("modalRecipeArea").innerText = meal.strArea;
    document.getElementById("modalInstructions").innerText = meal.strInstructions;

    // Ingredients & Measures
    const ingredientsList = document.getElementById("modalIngredients");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        const li = document.createElement("li");
        li.innerText = `${ingredient} — ${measure}`;
        ingredientsList.appendChild(li);
      }
    }

    // Tutorial Link
    const ytLink = document.getElementById("modalYoutubeLink");
    if (meal.strYoutube) {
      ytLink.href = meal.strYoutube;
      ytLink.classList.remove("hidden");
    } else {
      ytLink.classList.add("hidden");
    }

    // Share Button Logic
    const shareBtn = document.getElementById("modalShareBtn");
    shareBtn.onclick = () => {
      const shareText = `Check out this ${meal.strMeal} recipe on Calcify!\n\n${window.location.href}?query=${encodeURIComponent(meal.strMeal)}`;
      if (navigator.share) {
        navigator.share({
          title: meal.strMeal,
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        showToast("Link copied to clipboard!", "text-bg-success");
      }
    };

    openRecipeModal();
  } catch (err) {
    console.error(err);
    showToast("Failed to load recipe details.", "text-bg-danger");
  }
}

// Custom Modal Controls
function openRecipeModal() {
  const modal = document.getElementById("recipeModal");
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeRecipeModal() {
  const modal = document.getElementById("recipeModal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close on background click
document.getElementById("recipeModal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("recipeModal")) {
    closeRecipeModal();
  }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("recipeModal").classList.contains("active")) {
    closeRecipeModal();
  }
});
