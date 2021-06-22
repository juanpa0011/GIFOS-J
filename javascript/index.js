const arrright = document.getElementById('right');
const arrleft = document.getElementById('left');

const btnPlus = document.getElementById('creategift');
const showmore = document.getElementById('showmore');
const search = document.getElementById('buscador');

//Mis Favor
const misFavor = document.getElementById('misFavor');

// STICKY NEEDED CODE
const header = document.getElementById('sticky');
const nav = document.getElementById('nav');

// DARKNESS NEEDED CODE
const dark = document.getElementById('darkness');
const configUser = window.matchMedia('(prefers-color-scheme: dark)')
const localSt = localStorage.getItem('theme');

const conteiner = document.getElementById('gifobuilder');
const searchingAnim = document.getElementById('buscadoranimation');

//Max-popup NEEDED CODE
const popupCross = document.getElementById("popup__btn--cross");
const popupImg = document.getElementById("popup__gif--max");
const popupTitle = document.getElementById("gif_title");
const popupUser = document.getElementById("gif_username");
/* const popupBtnFav = document.getElementById("popup__btn--fav");
const popupBtnDown = document.getElementById("popup__btn--down"); */
const actions = document.querySelector('.actions')
const popup__section = document.getElementById("popup__section");
const popup__container = document.querySelector('maximizar__container');

//
const blue_bottom = document.getElementById('bottom_blue');
const blue_top = document.getElementById('top_blue');
const main = document.getElementById('main');
const footer = document.getElementById('footer')
// Header
//

// SVGs PATH () //
const path = "../assets/"

if(localSt === 'dark') {
    document.body.classList.toggle('dark-theme')
}
else if (localSt === 'light') {
    document.body.classList.toggle('light-theme')
}
// los value de  localStorage seran 'dark' y 'light'
dark.addEventListener('click',() => {
    if(dark.innerHTML == "MODO DIANURO"){
        dark.innerHTML = "MODO NOCTURNO";
    }
    else{
        dark.innerHTML = "MODO DIANURO";
    }
    let colorTheme;
    if (configUser.matches) {
        document.body.classList.toggle('light-theme');
        colorTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark ';
    }
    else {
        document.body.classList.toggle('dark-theme');
        colorTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }
    localStorage.setItem('theme', colorTheme)
})


// needs called InitTrending()
function InitTrending() {
    displayed = trendingArr.slice(0, 3)
}

// ========================= HEADER - Sticky Code //

window.onscroll = function() {stickyfunction()};

// Get the offset position of the navbar
let sticky = null;

function stickyfunction() {
    if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } else {
    header.classList.remove("sticky");
    }
}

// ===================== HEADER - Sticky END //


// Searching Images

const cant = ()=>{
    deleteNode(conteiner);
    let A = document.getElementById('searchResult');
    A.innerHTML = search.value;
    
    if(info.data.lenght == 0) {
        return
    }
    for(let i = 0 ; i< cantidad ; i++){
        let placeholder = document.createElement('div');
        placeholder.className = 'placeholder';
        let btnholder = document.createElement('div');
        btnholder.className = 'btnholder';
    
        let svgFav = document.createElement('img');
        svgFav.src = path + "favoritos/icon-fav.svg";
        svgFav.className = "iconholder"

        let svgMax = document.createElement('img');
        svgMax.src = path + "max/icon-max-normal.svg"
        svgMax.className = "iconholder"

        let svgDownload = document.createElement('img');
        svgDownload.src = path + "download/icon-download.svg";
        svgDownload.className = "iconholder"
    
        let img = document.createElement('img');
        img.id = info.data[i].id;
        img.src = info.data[i].images.original.url;

        let cover = document.createElement('div');
        cover.className = "cover";

        placeholder.appendChild(img);
        img.addEventListener('click', () => {
            popUp(info.data[i].id, info.data[i].images.original.url, info.data[i].username, info.data[i].title);
        })

        placeholder.appendChild(cover);

        btnholder.appendChild(svgFav);
        svgFav.addEventListener('click',() => {
            addFavorites(info.data[i].id, info.data[i].images.original.url, info.data[i].username, info.data[i].title);
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
            popUp(info.data[i].id, info.data[i].images.original.url, info.data[i].username, info.data[i].title);
        })
        btnholder.appendChild(svgDownload);
        placeholder.appendChild(btnholder);
        conteiner.appendChild(placeholder);
        ConstructImgHolder.push = new ConstructImgHolder(cover,btnholder,svgFav,svgMax,svgDownload);
    }
    searchAnimationEnd()
}


function popUp ( id, url, user, title) {
    deleteNode(actions);
    let popupBtnFav = document.createElement('div');
    popupBtnFav.setAttribute("class", "favorites")
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
        addFavorites(id, url, user, title);
    })
    popupBtnDown.addEventListener('click', () => {
        download(id, title);
    })

}

function deleteElement (element) {
    element.remove()
}

function searchAnimation () {
    searchingAnim.src = path + "loadingcheck/loader.svg";
}

function searchAnimationEnd() {
    searchingAnim.src = path + "loadingcheck/ok.svg";
}


let info;
async function newSearch(gifo) {
    const apiKey = 'T96v34LvfncPq5iV6LjP4GsHYqeQEupg';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifo}&limit=${cantidad}`;

    try {
        const response = await fetch(url);
        info = await response.json();
        cant();
    } catch (err) {
        console.log(err);
    }
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

let cantidad = '12';

window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        let searchvalue = search.value;
        searchAnimation();
        newSearch(searchvalue);
    }
})

// ===================================================== Trending

let trendLimit = '9';
let arrayImg = [];
let arrayIndex = 0;
trendingCrafter();
async function trendingCrafter() {
    const apiKey = 'T96v34LvfncPq5iV6LjP4GsHYqeQEupg';
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${trendLimit}`;

    try {
        const response = await fetch(url);
        info = await response.json();
        trendingDownload();
    } catch (err) {
        console.log(err);
    }

}
const containerTrend = document.getElementById('gifs');
const trendingDownload = ()=>{
    for(let i = 0 ; i< trendLimit ; i++){
        arrayImg[i] = info.data[i].images.original.url;
    }
    showTrendArray();
}

function showTrendArray () {
    for (let i = 0; i < 8; i++) {
        let img = document.createElement('img');
        img.src = arrayImg[i];
        containerTrend.appendChild(img);
    }
}

arrright.addEventListener('click', () => {
    containerTrend.scrollLeft+= 400;
})

arrleft.addEventListener('click', () => {
    containerTrend.scrollLeft-=400;
})


// ===================================================== Trending End


// AUXILIAR FEDE EL AMOR =========================================


function deleteNode (node) {
    if(node) {
        while(node.lastChild) {
            node.lastChild.remove();
        }
    }
}

/* FUNCIÓN AGREGAR A FAVORITOS*/
const addFavorites = (id, url, username, title) => {
    let LS = JSON.parse(localStorage.getItem('favorites'));
    if (LS !== null && LS.length > 0) {
        const exist = LS.filter(element => element.id == id);
        if (!exist.length == 1) {
            const favorite = {
                id: id,
                url: url,
                username: username,
                title: title
            };
            LS.push(favorite);
            localStorage.setItem('favorites', JSON.stringify(LS));
        }
    } else {
        const LS = [];
        const favorite = {
        id,
        url,
        username,
        title
        };
        LS.push(favorite);
        localStorage.setItem('favorites', JSON.stringify(LS));
    }
};

// ============================ //

/* FUNCIÓN DESCARGAR GIF */
const download = async (id, title) => {
    let a = document.createElement('a');
    try {
        let response = await fetch(`https://media.giphy.com/media/${id}/giphy.gif`);
        let file = await response.blob();
        a.download = title;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    } catch (error) {
        console.error(error);
    }
};

// ============================ //