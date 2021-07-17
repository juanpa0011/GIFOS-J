
const endpointTrendingSearches = 'https://api.giphy.com/v1/trending/searches?api_key=';

const trendingSuggestionContainer = document.getElementById('container-trending')

function checkGifArray (gifArray) {
    if(gifArray.length == 0){
        conteiner.classList.add('hidden')
        indexMore.classList.add('hidden')
    } else {
        if(gifArray.length < end) {
            end = gifArray.length
            indexMore.classList.toggle('hidden');
        }
    }
}

/* FUNCIÓN OBTENER SUGERENCIAS AL BUSCAR */
const getTrendingSearches = async (amount) => {
    try {
      const response = await fetch(endpointTrendingSearches + 'T96v34LvfncPq5iV6LjP4GsHYqeQEupg');
      const data = await response.json();
      renderTrendingSearches(data.data.slice(0, amount));
    } catch (error) {
      console.error(error);
    }
  };

getTrendingSearches(6);

/* FUNCIÓN RENDERIZAR SUGERENCIAS AL BUSCAR */
const renderTrendingSearches = (data) => {
    const fragment = new DocumentFragment();
    data.forEach(element => {
      const span = document.createElement('span');
      span.setAttribute('class', 'trendingsugg__content-trend');
      span.textContent = element;
      fragment.appendChild(span);
      span.addEventListener('click', () => {
        let A = document.getElementById('searchResult');
        A.textContent = element;
        search.textContent = element;
        newSearch(element);
      });
    });
    trendingSuggestionContainer.appendChild(fragment);
  };