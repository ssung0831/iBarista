// Get the favorite coffee IDs from local storage
const coffeeIdArray = getFavorites();

function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  console.log("favs" + favorites);
  return favorites ? JSON.parse(favorites) : [];
}

fetch('coffeeData.json')
  .then(response => response.json())
  .then(data => {
    console.log("hello" + data);
    console.log("do" + coffeeIdArray);
    // Loop through each coffee object
    data.forEach((coffee) => {
      console.log("hi" + coffee.id);
      if (coffeeIdArray.includes(coffee.id)) {
        console.log(coffee.id);

        const container = document.createElement('div');
        container.classList.add('container');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const image = document.createElement('img');
        image.src = coffee.image;
        image.alt = 'Coffee Image';
        imageContainer.appendChild(image);

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');
        const h2 = document.createElement('h2');
        h2.textContent = coffee.title;
        const starIcon = document.createElement('span');
        starIcon.classList.add('favorite-icon');
        starIcon.innerHTML = '<i class="fas fa-star"></i>';
        h2.appendChild(starIcon);
        const h3 = document.createElement('h3');
        h3.textContent = coffee.description;
        const h4 = document.createElement('h4');
        h4.textContent = `Ingredients: ${coffee.ingredients.join(' · ')}`;
        contentContainer.appendChild(h2);
        contentContainer.appendChild(h3);
        contentContainer.appendChild(h4);

        container.appendChild(imageContainer);
        container.appendChild(contentContainer);

        // Find the location where you want to insert the container in the document
        const coffeeContainer = document.getElementById('coffeeContainer');

        // Append the container to the location in the document
        coffeeContainer.appendChild(container);

         // Add event listener to the star icon
         starIcon.addEventListener('click', () => {
            // Toggle the favorite status
            const isFavorite = starIcon.classList.toggle('favorite');
  
            // Add/remove coffee from local storage
            if (isFavorite) {
              addToFavorites(coffee.id);
            } else {
              removeFromFavorites(coffee.id);
            }
          });
  
          // Check if the coffee is already in favorites and update the star icon accordingly
          if (isCoffeeInFavorites(coffee.id)) {
            starIcon.classList.add('favorite');
          }
        }
      });
    })
  .catch(error => {
    console.error('Error:', error);
  });

   // Function to add a coffee to favorites in local storage
function addToFavorites(coffeeId) {
    const favorites = getFavorites();
    favorites.push(coffeeId);
    saveFavorites(favorites);
    console.log("added");
    alert("added to favorites!");
  }
  
  // Function to remove a coffee from favorites in local storage
  function removeFromFavorites(coffeeId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(coffeeId);
    if (index !== -1) {
      favorites.splice(index, 1);
      saveFavorites(favorites);
      console.log("removed");
      alert("removed from favorites!");
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  
  }
  
  // Function to check if a coffee is in favorites
  function isCoffeeInFavorites(coffeeId) {
    const favorites = getFavorites();
    return favorites.includes(coffeeId);
  }
  
  // Function to get the favorites from local storage
  function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  
  // Function to save the favorites to local storage
  function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(favorites);
  }
  
  
  // Function to update the star icons on the Favorites page
  function updateFavoriteIcons() {
    const starIcons = document.getElementsByClassName('favorite-icon');
  
    // Loop through each star icon
    Array.from(starIcons).forEach((starIcon) => {
      const coffeeId = starIcon.getAttribute('data-coffee-id');
  
      // Check if the coffee is in favorites and update the star icon accordingly
      if (isCoffeeInFavorites(coffeeId)) {
        starIcon.classList.add('favorite');
      } else {
        starIcon.classList.remove('favorite');
      }
    });
  }
  
  