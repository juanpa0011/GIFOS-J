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

        let svgTrash = document.createElement('img');
        svgTrash.src = "../assets/trash/icon-trash-normal.svg";
        svgTrash.className = "iconholder";

        let svgMax = document.createElement('img');
        svgMax.src = path + "max/icon-max-normal.svg"
        svgMax.className = "iconholder"

        let svgDownload = document.createElement('img');
        svgDownload.src = path + "download/icon-download.svg";
        svgDownload.className = "iconholder"

        let cover = document.createElement('div');
        cover.className = "cover";
    
        let img = document.createElement('img');

        img.id = element.id;
        img.src = element.url;

        placeholder.appendChild(img);
        placeholder.appendChild(cover);
        cover.addEventListener("click",() => {
            if(btnholder.style.display == 'flex') {
                btnholder.style.display = 'none';
                cover.classList.remove('.cover--active')
            } else {
                btnholder.style.display = 'flex';
                cover.classList.add('.cover--active')
            }
        });
        btnholder.appendChild(svgTrash);
        
        svgTrash.addEventListener('click', () => {
            deleteFav (element.id);
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
            popUp(element.id, element.url, element.user, element.title)
        })
        btnholder.appendChild(svgDownload);
        placeholder.appendChild(btnholder);
        misFavor.appendChild(placeholder);
    });
}

/* FUNCIÓN ELIMINAR FAVORITO */
const deleteFav = (id) => {
    const LS = JSON.parse(localStorage.getItem('favorites'));
    LS.filter((el, index) => {
      if (el.id == id) {
        LS.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(LS));
        if (JSON.parse(localStorage.getItem('favorites')).length == 0) {
          localStorage.removeItem('favorites');
          eventFire(goToFavorites, 'click');
        }
        if (localStorage.getItem('favorites')) {
          deleteElement(document.getElementById(id));
        };
      };
    });
  };


renderFav (arrayFavorites);
