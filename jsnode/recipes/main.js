import recipes from './recipes.mjs';

// Random and Utility Functions
function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomItem(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Template Functions
function tagsTemplate(tags) {
    return tags.map(tag => `<p class="recipe-category_box">${tag}</p>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span
        class="recipe-rating"
        role="img"
        aria-label="Rating: ${rating} out of 5 stars"
    >`;

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }

    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `
    <div class="recipe-card">
        <div class="img_box_recipe">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        </div>
        <div class="Info_Catgorery_Rating_Sections">
            <div class="recipe-category">
                ${tagsTemplate(recipe.tags)}
            </div>
            <div class="name_and_rating">
                <a href="#" class="recipe-title">${recipe.name}</a>
                ${ratingTemplate(recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
        </div>
    </div>`;
}

// Filtering and Rendering Functions
function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            const lowerQuery = query.toLowerCase();
            return (
                recipe.name.toLowerCase().includes(lowerQuery) ||
                recipe.description.toLowerCase().includes(lowerQuery) ||
                recipe.tags.find(tag => tag.toLowerCase().includes(lowerQuery)) ||
                recipe.ingredients?.find(ingredient => ingredient.toLowerCase().includes(lowerQuery)) // Optional ingredients list
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
}

function renderRecipes(recipesList) {
    const main = document.querySelector('main');
    if (recipesList.length === 0) {
        main.innerHTML = `<p class="no-results">No recipes found matching your search.</p>`;
    } else {
        main.innerHTML = recipesList.map(recipeTemplate).join('');
    }
}

// Search Handler
function searchHandler(e) {
    e.preventDefault(); // Prevent form submission default behavior
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

// Event Listener
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', searchHandler);

// Initial Render of a Random Recipe
const randomRecipe = getRandomItem(recipes);
renderRecipes([randomRecipe]);
