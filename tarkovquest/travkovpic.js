const { request, gql } = window.GraphQLRequest;

// Define the GraphQL query to get traders
const query = gql`
  query MyQuery {
    traders {
      name
      imageLink
    }
  }
`;

// Fetch traders and display them
async function fetchTraders() {
  try {
    // Make the request to the GraphQL API
    const data = await request('https://api.tarkov.dev/graphql', query);
    
    // Get the container element for the traders
    const traderContainer = document.getElementById('trader-list');
    
    // Clear the container before rendering new data
    traderContainer.innerHTML = '';

    // Loop through the traders and create HTML elements to display them
    data.traders.forEach((trader) => {
      // Create a new div for each trader
      const traderDiv = document.createElement('div');
      traderDiv.className = 'trader';

      // Create the image element
      const img = document.createElement('img');
      img.src = trader.imageLink;
      img.alt = trader.name;

      // Create the name element
      const name = document.createElement('span');
      name.textContent = trader.name;

      // Append the image and name to the trader div
      traderDiv.appendChild(img);
      traderDiv.appendChild(name);

      // Append the trader div to the container
      traderContainer.appendChild(traderDiv);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the fetchTraders function to display the traders on page load
fetchTraders();