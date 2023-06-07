// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'coffees' parameter from the URL
const coffeeIds = urlParams.get('coffees');

// Split the coffee IDs into an array
const coffeeIdArray = coffeeIds.split(',');


fetch('coffeeData.json')
  .then(response => response.json())
  .then(data => {
    console.log("hello" + data);

    // Loop through each coffee object
    data.forEach((coffee) => {
      console.log("hi" + coffee.id);
      if (coffeeIdArray.includes(coffee.id.toString())) {
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
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
