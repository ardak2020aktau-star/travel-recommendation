// Data: each recommendation has a title, a country, a category, and an image.
const destinations = [
  {name:'Bora Bora', country:'French Polynesia', category:'beach', description:'Explore turquoise water and quiet island scenery.', image:'photo-1500375592092-40eb2168fd21'},
  {name:'Copacabana Beach', country:'Brazil', category:'beach', description:'Discover a coastal escape in Rio de Janeiro.', image:'photo-1516306580123-e6e52b1b7b5f'},
  {name:'Angkor Wat', country:'Cambodia', category:'temple', description:'Explore a temple complex surrounded by a remarkable cultural landscape.', image:'photo-1566706546199-a93ba33ce9f7'},
  {name:'Kyoto temples', country:'Japan', category:'temple', description:'Discover traditional architecture and peaceful temple gardens.', image:'photo-1493976040374-85c8e12f0c0e'},
  {name:'Sydney', country:'Australia', category:'city', description:'Find inspiration around the harbour and waterfront.', image:'photo-1506973035872-a4ec16b8e8d9'},
  {name:'Melbourne', country:'Australia', category:'city', description:'Explore city streets, creative spaces, and urban culture.', image:'photo-1514395462725-fb4566210144'},
  {name:'Tokyo', country:'Japan', category:'city', description:'Experience a city of lively neighbourhoods and contrasting styles.', image:'photo-1540959733332-eab4deabeeaf'},
  {name:'Rio de Janeiro', country:'Brazil', category:'city', description:'Explore a city framed by mountains and the sea.', image:'photo-1483729558449-99ef09a8c325'}
];

// Normalize input so capital letters and surrounding spaces do not affect search.
function findDestinations(input) {
  const query = input.trim().toLowerCase();
  const categories = {beach:'beach', beaches:'beach', temple:'temple', temples:'temple', 'пляж':'beach', 'пляжи':'beach', 'храм':'temple', 'храмы':'temple'};
  const countries = {'австралия':'australia', 'япония':'japan', 'бразилия':'brazil'};
  if (!query) return [];
  if (['country', 'countries', 'страна', 'страны'].includes(query)) {
    return ['Australia', 'Japan', 'Brazil'].map(country =>
      destinations.find(place => place.country === country && place.category === 'city')
    );
  }
  if (categories[query]) return destinations.filter(place => place.category === categories[query]);
  const term = countries[query] || query;
  return destinations.filter(place => `${place.country} ${place.name}`.toLowerCase().includes(term));
}

const searchForm = document.querySelector('#search-form');
if (searchForm) {
  const keyword = document.querySelector('#keyword');
  const results = document.querySelector('#results');
  const status = document.querySelector('#search-status');

  function renderSearch(query) {
    results.replaceChildren();
    const matches = findDestinations(query);
    status.textContent = !query.trim() ? 'Enter a destination or category.' : matches.length ? `${matches.length} recommendations for “${query.trim()}”.` : 'No results. Try beach, temple, Australia, Japan, or Brazil.';
    for (const place of matches) {
      const card = document.createElement('article');
      card.className = 'card';
      const photo = document.createElement('img');
      photo.src = `https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=900&q=80`;
      photo.alt = `Travel inspiration for ${place.name}`;
      photo.loading = 'lazy';
      const body = document.createElement('div');
      body.className = 'card-body';
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = place.country;
      const heading = document.createElement('h3');
      heading.textContent = place.name;
      const description = document.createElement('p');
      description.textContent = place.description;
      body.append(tag, heading, description);
      card.append(photo, body);
      results.append(card);
    }
    document.querySelector('#explore').scrollIntoView({behavior:'smooth'});
  }

  searchForm.addEventListener('submit', event => {event.preventDefault(); renderSearch(keyword.value);});
  document.querySelector('#clear-button').addEventListener('click', () => {
    keyword.value = '';
    results.replaceChildren();
    status.textContent = 'Choose a category or enter a search above.';
    keyword.focus();
  });
  document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
    keyword.value = button.dataset.query;
    renderSearch(keyword.value);
  }));
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const message = contactForm.elements.message.value.trim();
  document.querySelector('#contact-status').textContent = name && message
    ? `Thank you, ${name}. The form passed validation. This demo has not sent or saved your message.`
    : 'Please enter a name and message containing more than spaces.';
});
