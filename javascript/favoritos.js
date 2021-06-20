const arrayFavorites = JSON.parse(localStorage.getItem('favorites'));
const emptyscreen = document.getElementById('emptyFav');


function renderFav (arrayFav) {

    if ( arrayFav && arrayFav.length > 0)  {
        emptyscreen.classList.add('hidden');
    } else{
        return;
    }
    
    arrayFav.forEach(element => {
        let placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        let btnholder = document.createElement('div');
        btnholder.className = 'btnholder';
    
        //let svgFav = document.createElement('img');
        //svgFav.src = path + "favoritos/icon-fav.svg";
        //svgFav.className = "iconholder"

        let svgMax = document.createElement('img');
        svgMax.src = path + "max/icon-max-normal.svg"
        svgMax.className = "iconholder"

        let svgDownload = document.createElement('img');
        svgDownload.src = path + "link/icon-link-normal.svg";
        svgDownload.className = "iconholder"
    
        let img = document.createElement('img');

        img.id = element.id;
        img.src = element.url;

        placeholder.appendChild(img);
        //btnholder.appendChild(svgFav);
        //svgFav.addEventListener('click',() => {
            //removeFavorites(info.data[i].id, info.data[i].images.original.url, info.data[i].username, info.data[i].title);
        //})
        btnholder.appendChild(svgMax);
        btnholder.appendChild(svgDownload);
        placeholder.appendChild(btnholder);
        misFavor.appendChild(placeholder);
    });
}

renderFav (arrayFavorites);