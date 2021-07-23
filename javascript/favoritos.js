const arrayFavorites = JSON.parse(localStorage.getItem('favorites'));
const emptyscreen = document.getElementById('emptyFav');
const favMore = document.querySelector('.btn--favoritos')

let startFav = 0
let endFav = 12

favMore.addEventListener('click', () => {
  startFav = startFav +12;
  endFav = endFav +12;
  if(endFav >= arrayFavorites.length) {
    endFav = arrayFavorites.length;
    favMore.classList.toggle('hidden');
  }
  renderFav(arrayFavorites);
})

function renderFav (arrayFav) {
    if ( arrayFav && arrayFav.length > 0)  {
        emptyscreen.classList.add('hidden');
    } else{
        return;
    }
    deleteNode(arrayFav);
    for(let i = startFav ; i< endFav; i++) {
      let placeholder = document.createElement('div');
      placeholder.className = "searchitem";

      let overlay = document.createElement('div');
      overlay.className = 'placeholder';

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

        let img = document.createElement('img');
        img.id = arrayFav[i].id;
        img.src = arrayFav[i].url;

        let title = document.createElement('h4');
        title.textContent = arrayFav[i].title;

        placeholder.appendChild(img);
        img.addEventListener('mouseover', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'flex';
            }
        })
        img.addEventListener('click', () => {
            if(window.innerWidth>800) {
                
            } else {
              popUpFav(arrayFav[i].id, arrayFav[i].url, arrayFav[i].username, arrayFav[i].title);
            }
        })
        img.addEventListener('mouseleave', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'none';
            }
        })

        btnholder.appendChild(title);
        btnholder.appendChild(svgTrash);
        
        svgTrash.addEventListener('click', () => {
            deleteFav (arrayFav[i].id);
        })
        svgTrash.addEventListener('mouseover', () => {
          svgTrash.src = path + "/trash/icon-trash-hover.svg";
        })
        svgTrash.addEventListener('mouseleave', () => {
          svgTrash.src = path + "/trash/icon-trash-normal.svg";
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
          popUpFav(arrayFav[i].id, arrayFav[i].url, arrayFav[i].username, arrayFav[i].title)
        })
        svgMax.addEventListener('mouseover', () => {
          svgMax.src= path + "/max/icon-max-hover.svg";
        })
        svgMax.addEventListener('mouseleave', () => {
          svgMax.src = path + "/max/icon-max-normal.svg";
        })
        btnholder.appendChild(svgDownload);
        svgDownload.addEventListener('click', () => {
          download(arrayFav[i].id, arrayFav[i].title); // svgDownload.src = path + "download/icon-download.svg";
        })
        svgDownload.addEventListener('mouseover', () => {
          svgDownload.src = path + "/download/icon-download-hover.svg";
        })
        svgDownload.addEventListener('mouseleave', () => {
          svgDownload.src = path + "/download/icon-download.svg";
        })
        placeholder.addEventListener('', () => {
          if(window.innerWidth<800) {
              btnholder.style.display = 'none';
          }
        })
        overlay.addEventListener('mouseover', () => {
          if(window.innerWidth>800) {
              btnholder.style.display = 'flex';
          }
        })
        overlay.addEventListener('mouseleave', () => {
          if(window.innerWidth>800) {
              btnholder.style.display = 'none';
          }
        })
        overlay.appendChild(btnholder);
        placeholder.appendChild(overlay);
        misFavor.appendChild(placeholder);
        
    }
}

/*  POP-UP FOR FAVS */

function popUpFav ( id, url, user, title) {
  deleteNode(actions);
  let popupBtnFav = document.createElement('div');
  popupBtnFav.setAttribute("class", "trash")
  actions.appendChild(popupBtnFav);
  let popupBtnDown = document.createElement('div');
  popupBtnDown.setAttribute("class", "download")
  actions.appendChild(popupBtnDown);

  popupImg.setAttribute("src", url)
  popupImg.setAttribute("id", id)
  popupTitle.textContent = title;
  popupUser.textContent = user;

  blue_bottom.classList.add("hidden");
  blue_top.classList.add("hidden");
  main.classList.add("hidden");
  footer.classList.add("hidden");
  header.classList.add("hidden");
  popup__section.classList.remove("hidden");

  popupCross.addEventListener('click', () => {
      popup__section.classList.remove("hidden");
      blue_bottom.classList.remove("hidden");
      blue_top.classList.remove("hidden");
      main.classList.remove("hidden");
      footer.classList.remove("hidden");
      header.classList.remove("hidden");
      popup__section.classList.add("hidden");
  })
  popupBtnFav.addEventListener('click', () => {
      deleteFav(id);
      window.location.reload(false);
  })
  popupBtnDown.addEventListener('click', () => {
      download(id, title);
  })

}


function deleteNode (node) {
    if(node) {
        while(node.lastChild) {
            node.lastChild.remove();
        }
    }
}

const deleteFav = (id) => {
    const LS = JSON.parse(localStorage.getItem('favorites'));
    LS.filter((el, index) => {
      if (el.id == id) {
        LS.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(LS));
        if (JSON.parse(localStorage.getItem('favorites')).length == 0) {
          localStorage.removeItem('favorites');
          deleteNode(misFavor);
          emptyscreen.classList.toggle('hidden');
          //eventFire(goToFavorites, 'click');
        }
        if (localStorage.getItem('favorites')) {
          deleteElement(document.getElementById(id));
        };
      };
    });
  };

if(arrayFavorites == null) {
} else {
  if(arrayFavorites.length > 12) {
    favMore.classList.toggle('hidden')
  } else {
    endFav = arrayFavorites.length;
  }
}


renderFav (arrayFavorites);

