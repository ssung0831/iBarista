function redirectToRecipes() {
    // Get all the selected ingredient checkboxes
    const checkboxes = document.querySelectorAll('#ingredientsList input[type="checkbox"]:checked');
  
    // Create an array to store the selected ingredient names
    const selectedIngredients = [];
    checkboxes.forEach((checkbox) => {
      selectedIngredients.push(checkbox.labels[0].textContent);
    });

    console.log(selectedIngredients);
  
    // Array to store the matching coffee IDs
    const matchingCoffeeIds = [];
    
  
  fetch('coffeeData.json')
  .then(response => response.json())
  .then(data => {
    console.log("hello" + data);

    // Loop through each coffee object
    data.forEach((coffee) => {
      console.log("hey" + coffee.ingredients);

      // Check if the selected ingredients match the coffee's ingredients
      if (coffee.ingredients.every((ingredient) => selectedIngredients.includes(ingredient))) {
        // Add the coffee's ID to the matchingCoffeeIds array
        console.log("hi" + coffee.id);
        matchingCoffeeIds.push(coffee.id);
      }
    });

    if(matchingCoffeeIds.length == 0){
      alert("There are no recipes found! Please try again.");

      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }
    }
    else{
    const queryString = `coffees=${matchingCoffeeIds.join(',')}`;
    const url = `recipes.html?${queryString}`;
    window.location.href = url;
    }

  })
  .catch(error => {
    console.error('Error:', error);
  });
  

    //window.location.href = `recipes.html`;
  }
