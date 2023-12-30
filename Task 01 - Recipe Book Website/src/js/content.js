// Recipe Management System

// DOM elements
const recipeContainer = document.getElementById('recipe-container');
const addRecipeForm = document.getElementById('recipe-form');
const editFormContainer = document.getElementById('edit-form-container');

// Recipes array
const recipes = [];

// Display recipes
function displayRecipes() {
  recipeContainer.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const card = createRecipeCard(recipe, index);
    recipeContainer.appendChild(card);
  });

  showAddRecipeForm();
}

// Create recipe card
function createRecipeCard(recipe, index) {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.dataset.index = index;
  card.innerHTML = `
    <h2>${recipe.name}</h2>
    <strong>Ingredients:</strong>
    <p>${recipe.ingredients}</p>
    <strong>Instructions:</strong>
    <p>${recipe.instructions}</p>
    <button class="edit-btn" onclick="editRecipe(${index})">Edit Recipe</button>
    <button class="delete-btn" onclick="deleteRecipe(${index})">Delete Recipe</button>
  `;
  card.addEventListener('click', () => selectRecipe(index));
  return card;
}

// Add a new recipe
function addRecipe() {
  const name = getValue('recipe-name');
  const ingredients = getValue('ingredients');
  const instructions = getValue('instructions');

  if (name && ingredients && instructions) {
    recipes.push({ name, ingredients, instructions });
    displayRecipes();
    clearForm();
  } else {
    alert('Please fill in all fields.');
  }
}

// Get input value by ID
function getValue(id) {
  return document.getElementById(id).value.trim();
}

// Show Add Recipe form and hide Edit/Delete buttons
function showAddRecipeForm() {
  addRecipeForm.style.display = 'block';
  hideButtons('.edit-btn', '.delete-btn');
  editFormContainer.style.display = 'none';
}

// Edit the selected recipe
function editRecipe(index) {
  const selectedRecipe = recipes[index];
  showEditForm(index, selectedRecipe);
}

// Delete the selected recipe
function deleteRecipe(index) {
  recipes.splice(index, 1);
  displayRecipes();
}

// Select a recipe when clicked
function selectRecipe(index) {
  showAddRecipeForm();
  showButtons('.edit-btn', '.delete-btn');
  const selectedRecipe = recipes[index];
  showEditForm(index, selectedRecipe);
}

// Clear the form fields
function clearForm() {
  setValue('recipe-name', '');
  setValue('ingredients', '');
  setValue('instructions', '');
}

// Set input value by ID
function setValue(id, value) {
  document.getElementById(id).value = value;
}

// Show the Edit Recipe form
function showEditForm(index, recipe) {
  setValue('edit-recipe-name', recipe.name);
  setValue('edit-ingredients', recipe.ingredients);
  setValue('edit-instructions', recipe.instructions);

  setButtonAction('save-edited-btn', () => saveEditedRecipe(index));
  setButtonAction('cancel-edit-btn', cancelEdit);

  addRecipeForm.style.display = 'none';
  editFormContainer.style.display = 'block';
}

// Save edited recipe
function saveEditedRecipe(index) {
  const editedName = getValue('edit-recipe-name');
  const editedIngredients = getValue('edit-ingredients');
  const editedInstructions = getValue('edit-instructions');

  if (editedName && editedIngredients && editedInstructions) {
    recipes[index] = { name: editedName, ingredients: editedIngredients, instructions: editedInstructions };
    displayRecipes();
    clearEditForm();
    showAddRecipeForm();
  } else {
    alert('Invalid data.');
  }
}

// Cancel the edit and show the add recipe form
function cancelEdit() {
  clearEditForm();
  showAddRecipeForm();
}

// Clear the edit form fields
function clearEditForm() {
  setValue('edit-recipe-name', '');
  setValue('edit-ingredients', '');
  setValue('edit-instructions', '');
  editFormContainer.style.display = 'none';
}

// Helper functions

function hideButtons(...selectors) {
  selectors.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) button.style.display = 'none';
  });
}

function showButtons(...selectors) {
  selectors.forEach(selector => {
    const button = document.querySelector(selector);
    if (button) button.style.display = 'inline-block';
  });
}

function setButtonAction(id, action) {
  document.getElementById(id).onclick = action;
}

// Initial display of recipes
displayRecipes();

// Function to edit the selected recipe
function editRecipe(index) {
  // Check if there is already an edit form, if yes, remove it
  removeEditForm();

  const selectedRecipe = recipes[index];

  // Create and append the edit form below the recipe card
  const editFormContainer = document.createElement('div');
  editFormContainer.className = 'edit-form-container';
  editFormContainer.innerHTML = `
      <form id="edit-recipe-form">
          <label for="edit-recipe-name">Edit Recipe Name:</label>
          <input type="text" id="edit-recipe-name" value="${selectedRecipe.name}" required>

          <label for="edit-ingredients">Edit Ingredients:</label>
          <textarea id="edit-ingredients" required>${selectedRecipe.ingredients}</textarea>

          <label for="edit-instructions">Edit Instructions:</label>
          <textarea id="edit-instructions" required>${selectedRecipe.instructions}</textarea>

          <button type="button" onclick="saveEditedRecipe(${index})">Save Changes</button>
          <button type="button" onclick="cancelEdit()">Cancel</button>
      </form>
  `;

  // Insert the edit form below the recipe card
  const recipeCard = document.querySelector(`.recipe-card[data-index="${index}"]`);
  recipeCard.parentNode.insertBefore(editFormContainer, recipeCard.nextSibling);

  // Hide the "Edit Recipe" button
  recipeCard.querySelector('.edit-btn').style.display = 'none';
}

// Function to remove the edit form
function removeEditForm() {
  // Remove any existing edit form
  const existingEditForm = document.querySelector('.edit-form-container');
  if (existingEditForm) {
    existingEditForm.parentNode.removeChild(existingEditForm);
  }

  // Show the "Edit Recipe" button for the previously selected recipe
  const previousIndex = getSelectedIndex();
  if (previousIndex !== -1) {
    const previousRecipeCard = document.querySelector(`.recipe-card[data-index="${previousIndex}"]`);
    if (previousRecipeCard) {
      previousRecipeCard.querySelector('.edit-btn').style.display = 'inline-block';
    }
  }
}

// Function to cancel the edit
function cancelEdit() {
  // Remove the edit form
  removeEditForm();
}

