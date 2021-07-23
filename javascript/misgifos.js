const emptyMyGifs = document.getElementById('misGifos-empty');
const myGifsBuild = document.getElementById('edifMisGifs');
const arrayMyGifs = JSON.parse(localStorage.getItem('mygifos'));
const myMore = document.querySelector('.btn--misgifos');


let startMy = 0
let endMy = 12

myMore.addEventListener('click', () => {
    startMy = startMy +12;
    endMy = endMy +12;
  if(endMy >= arrayMyGifs.length) {
    endMy = arrayMyGifs.length;
    favMore.classList.toggle('hidden');
  }
  renderFav(arrayMyGifs);
})

function renderMy (array) {
    if ( array && array.length > 0)  {
        emptyMyGifs.classList.add('hidden');
    } else{
        return;
    }
    deleteNode(array);
    for(let i = startMy ; i< endMy; i++) {
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

        img.id = array[i].id;
        img.src = array[i].url;

        let title = document.createElement('h4');
        title.textContent = array[i].title;

        placeholder.appendChild(img);
        img.addEventListener('mouseover', () => {
          if(window.innerWidth>800) {
              btnholder.style.display = 'flex';
          }
        })
        img.addEventListener('click', () => {
          if(window.innerWidth>800) {
              
          } else {
            popUpMy(array[i].id, array[i].url, array[i].username, array[i].title);
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
            deleteMy (array[i].id);
        })
        svgTrash.addEventListener('mouseover', () => {
          svgTrash.src = path + "/trash/icon-trash-hover.svg";
        })
        svgTrash.addEventListener('mouseleave', () => {
          svgTrash.src = path + "/trash/icon-trash-normal.svg";
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
          popUpMy(array[i].id, array[i].url, array[i].username, array[i].title)
        })
        svgMax.addEventListener('mouseover', () => {
          svgMax.src= path + "/max/icon-max-hover.svg";
        })
        svgMax.addEventListener('mouseleave', () => {
          svgMax.src = path + "/max/icon-max-normal.svg";
        })
        btnholder.appendChild(svgDownload);
        svgDownload.addEventListener('click', () => {
          download(array[i].id, array[i].title);
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
        myGifsBuild.appendChild(placeholder);
        
    }
}

/*  POP-UP FOR FAVS */

function popUpMy ( id, url, user, title) {
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
      deleteMy(id);
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


/* FUNCIÓN ELIMINAR FAVORITO */
const deleteMy = (id) => {
    const LS = JSON.parse(localStorage.getItem('mygifos'));
    LS.filter((el, index) => {
      if (el.id == id) {
        LS.splice(index, 1);
        localStorage.setItem('mygifos', JSON.stringify(LS));
        if (JSON.parse(localStorage.getItem('mygifos')).length == 0) {
          localStorage.removeItem('mygifos');
          window.location.reload(false);
        }
        if (localStorage.getItem('mygifos')) {
          deleteElement(document.getElementById(id));
          //eventFire(goToMyGifos, 'click');
        };
      };
    });
  };

if(arrayMyGifs == null) {
   } else {
     if(arrayMyGifs.length > 12) {
        myMore.classList.toggle('hidden')
     } else {
       endMy = arrayMyGifs.length;
     }
   }

renderMy (arrayMyGifs);

