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

        let svgTrash = document.createElement('img');
        svgTrash = path + "trash/icon-trash-nomral";
        svgTrash.className = "iconholder";

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
        btnholder.appendChild(svgTrash);
        //svgFav.addEventListener('click',() => {
            //removeFavorites(info.data[i].id, info.data[i].images.original.url, info.data[i].username, info.data[i].title);
        //})
        btnholder.appendChild(svgMax);
        btnholder.appendChild(svgDownload);
        placeholder.appendChild(btnholder);
        misFavor.appendChild(placeholder);
    });
}


class ConstructImgHolder {
    constructor (HTMLimg, HTMLBtnHolder, HTMLFav, HTMLMax, HTMLDownload) {
        this.HTMLimg = HTMLimg;
        this.HTMLBtnHolder = HTMLBtnHolder;
        this.HTMLFav = HTMLFav;
        this.HTMLMax = HTMLMax;
        this.HTMLDownload = HTMLDownload;
        this.imgInit();
        return;
    }
    imgInit() {
        this.HTMLimg.addEventListener("click",() => {
            if(this.HTMLBtnHolder.style.display == 'flex') {
                this.HTMLBtnHolder.style.display = 'none';
                this.HTMLimg.classList.remove('.cover--active')
            } else {
                this.HTMLBtnHolder.style.display = 'flex';
                this.HTMLimg.classList.add('.cover--active')
            }
        });
        this.HTMLFav.addEventListener("mouseover",() =>{
            this.HTMLFav.src = path + "favoritos/icon-fav-hover.svg";
        });
        this.HTMLFav.addEventListener("mouseleave",() =>{
            this.HTMLFav.src = path + "favoritos/icon-fav.svg";
        });
        this.HTMLFav.addEventListener("click",() =>{
            this.HTMLFav.src = path + "favoritos/icon-fav-active.svg";
        });
        this.HTMLMax.addEventListener("mouseover",() =>{
            this.HTMLMax.src = path + "max/icon-max-hover.svg";
        });
        this.HTMLMax.addEventListener("mouseleave",() =>{
            this.HTMLMax.src = path + "max/icon-max-normal.svg";
        });
        this.HTMLDownload.addEventListener("mouseover",() =>{
            this.HTMLDownload.src = path + "download/icon-download-hover.svg";
        });
        this.HTMLDownload.addEventListener("mouseleave",() =>{
            this.HTMLDownload.src = path + "download/icon-download.svg";
        });
    }
}


renderFav (arrayFavorites);
