function redirectToRecipes() {
    // Get all the selected ingredient checkboxes
    const checkboxes = document.querySelectorAll('#ingredientsList input[type="checkbox"]:checked');
  
    // Create an array to store the selected ingredient names
    const selectedIngredients = [];
    checkboxes.forEach((checkbox) => {
      selectedIngredients.push(checkbox.labels[0].textContent);
    });
  
    // Array to store the matching coffee IDs
    const matchingCoffeeIds = [];
  
    // Array of coffee objects from the API
    fetch('coffeeData.json')
    .then(response => response.json())
    .then(data => {
        // Use the data as needed
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  
    // Loop through each coffee object
    coffeeData.forEach((coffee) => {
      // Check if the selected ingredients match the coffee's ingredients
      if (coffee.ingredients.every((ingredient) => selectedIngredients.includes(ingredient))) {
        // Add the coffee's ID to the matchingCoffeeIds array
        matchingCoffeeIds.push(coffee.id);
      }
    });
  
    // Redirect to recipes.html with the matching coffee IDs as query parameters
    window.location.href = `recipes.html?coffees=${matchingCoffeeIds.join(',')}`;
  }