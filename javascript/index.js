const arrright = document.getElementById('right');
const arrleft = document.getElementById('left');

const btnPlus = document.getElementById('creategift');
const showmore = document.getElementById('showmore');
const search = document.getElementById('buscador');

const emptySearch = document.querySelector('.empty-search');

//Mis Favor
const misFavor = document.getElementById('misFavor');

// STICKY NEEDED CODE
const header = document.getElementById('sticky');
const nav = document.getElementById('nav');

// DARKNESS NEEDED CODE
const dark = document.getElementById('darkness');

const conteiner = document.getElementById('gifobuilder');
const indexMore = document.querySelector('.btn--index');
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
const ul = document.getElementById('ul--header')
//

const body = document.getElementById('body');

// SVGs PATH () //
const path = "../assets/"

/*
window.addEventListener("resize", () => {
    if (window.innerWidth>840) {
        ul.style.backgroundColor = 'transparent';
    }
    else  {
        ul.style.backgroundColor = '#572EE5';
    }
});
*/

if(localStorage.getItem('theme') == 'dark') {
        dark.textContent = "MODO DIANURO";
        body.classList.add('dark');
        body.classList.remove('light-theme');
}else if (localStorage.getItem('theme') == 'light') {
        body.classList.remove('dark')
        body.classList.add('light-theme')
        dark.textContent = "MODO NOCTURNO";
} else {
    localStorage.setItem('theme', 'light');
    body.classList.remove('dark')
    body.classList.add('light-theme')
    dark.textContent = "MODO NOCTURNO";
}


// los value de  localStorage seran 'dark' y 'light'
dark.addEventListener('click',() => {
    if(dark.textContent == "MODO DIANURO"){
        dark.textContent = "MODO NOCTURNO";
    }
    else{
        dark.textContent = "MODO DIANURO";
    }
    let colorTheme;
    if (localStorage.getItem('theme') == 'light') {
        body.classList.add('dark')
        body.classList.remove('light-theme')
        colorTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', 'dark')
    }else {
        body.classList.remove('dark')
        body.classList.add('light-theme')
        colorTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark ';
        localStorage.setItem('theme', 'light')
    }
    //localStorage.setItem('theme', colorTheme)
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
    conteiner.classList.add('hidden');
    indexMore.classList.add('hidden');
    deleteNode(conteiner);

    if(info.data.lenght == 0) {
        return
    }
    conteiner.classList.remove('hidden');
    indexMore.classList.remove('hidden');
    edificar();
    searchAnimationEnd()
}

function edificar (){
    for(let i = start ; i< end ; i++){
        let placeholder = document.createElement('div');
        placeholder.className = "searchitem";

        let overlay = document.createElement('div');
        overlay.className = 'placeholder';
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
        img.id = gifArray[i].id;
        img.src = gifArray[i].images.original.url;

        let title = document.createElement('h4');
        title.textContent = gifArray[i].title;

        btnholder.appendChild(title);
        btnholder.appendChild(svgFav);
        svgFav.addEventListener('click',() => {
            addFavorites(gifArray[i].id, gifArray[i].images.original.url, gifArray[i].username, gifArray[i].title);
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
            popUp(gifArray[i].id, gifArray[i].images.original.url, gifArray[i].username, gifArray[i].title);
        })
        btnholder.appendChild(svgDownload);
        svgDownload.addEventListener('click', () => {
            download(gifArray[i].id, gifArray[i].title);
        })
        placeholder.appendChild(img);
        img.addEventListener('mouseover', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'flex';
            }
        })
        img.addEventListener('click', () => {
            if(window.innerWidth>800) {
                
            } else {
                popUp(gifArray[i].id, gifArray[i].images.original.url, gifArray[i].username, gifArray[i].title);
            }
        })
        img.addEventListener('mouseleave', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'none';
            }
        })
        btnholder.addEventListener('click', () => {
            btnholder.style.display = 'none';
        })

        overlay.appendChild(btnholder);
        
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
        placeholder.appendChild(overlay);
        conteiner.appendChild(placeholder);
        ConstructImgHolder.push = new ConstructImgHolder(img,btnholder,svgFav,svgMax,svgDownload);
    }
}

indexMore.addEventListener('click', () => {
    start = start +12;
    end = end +12;
    if(end > 50) {
        end = 49;
        indexMore.classList.toggle('hidden');
    }
    edificar();
})

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
    emptySearch.classList.add('hidden');
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
        checkGifArray(gifArray);
        gifArray = info.data;
        cant();
        emptySearch.classList.add('hidden');
    } catch (err) {
        gifArray = [];
        checkGifArray(gifArray);
        console.log(err);
        nothingFound();
    }
}

function nothingFound () {
    let A = document.getElementById('searchResult');
    A.innerHTML = "Lorem Ipsum"
    searchingAnim.src = path + "searching/icon-search.svg";
    search.textContent = '';

    emptySearch.classList.remove('hidden');
    conteiner.classList.add('hidden');
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

let start = 0;
let end = 12;
let gifArray = [];
let cantidad = '50';



window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        navsphere.classList.remove('navsphere-extended');
        gifArray = [];
        let searchvalue = search.value;
        searchAnimation();
        let A = document.getElementById('searchResult');
        A.textContent = search.value;
        newSearch(searchvalue);
    }
})

searchingAnim.addEventListener('click', () => {
    let searchvalue = search.value;
    gifArray = [];
    searchAnimation();
    let A = document.getElementById('searchResult');
    A.textContent = search.value;
    newSearch(searchvalue);
    navsphere.classList.remove('navsphere-extended');
    navsuggestions.classList.add('hidden');
})

// ===================================================== Trending

let trendLimit = '12';
let arrayImg = [];
let arrayId = [];
let arrayTitle = [];
let arrayUser = [];
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
        arrayId[i] = info.data[i].id;
        arrayTitle[i] = info.data[i].title;
        arrayUser[i] = info.data[i].user;
    }
    showTrendArray();
}

function showTrendArray () {
    for (let i = 0; i < 11; i++) {

        let placeholder = document.createElement('div');
        placeholder.className = "item";

        let overlay = document.createElement('div');
        overlay.className = 'trendholder';

        let btnholder = document.createElement('div');
        btnholder.className = 'btnholder';
        btnholder.style.display = 'none';

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
        img.src = arrayImg[i];
        img.id = arrayId[i];

        let title = document.createElement('h4');
        title.textContent = arrayTitle[i];

        btnholder.appendChild(title);
        btnholder.appendChild(svgFav);
        svgFav.addEventListener('click',() => {
            addFavorites(arrayId[i], arrayImg[i], arrayUser[i], arrayTitle[i]);
        })
        btnholder.appendChild(svgMax);
        svgMax.addEventListener('click', () => {
            popUp(arrayId[i], arrayImg[i], arrayUser[i], arrayTitle[i]);
        })
        btnholder.appendChild(svgDownload);
        svgDownload.addEventListener('click', () => {
            download(arrayId[i], arrayTitle[i]);
        })
        placeholder.appendChild(img);
        img.addEventListener('mouseover', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'flex';
            }
        })
        img.addEventListener('click', () => {
            if(window.innerWidth>800) {
                
            } else {
                popUp(arrayId[i], arrayImg[i], arrayUser[i], arrayTitle[i]);
            }
        })
        img.addEventListener('mouseleave', () => {
            if(window.innerWidth>800) {
                btnholder.style.display = 'none';
            }
        })
        btnholder.addEventListener('click', () => {
            btnholder.style.display = 'none';
        })
        overlay.appendChild(btnholder);
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
        placeholder.appendChild(overlay);
        containerTrend.appendChild(placeholder);
        ConstructImgHolder.push = new ConstructImgHolder(img,btnholder,svgFav,svgMax,svgDownload);
    }
}

arrright.addEventListener('click', () => {
    containerTrend.scrollLeft+= 400;
})

arrleft.addEventListener('click', () => {
    containerTrend.scrollLeft-=400;
})


// ===================================================== Trending End


function deleteNode (node) {
    if(node) {
        while(node.lastChild) {
            node.lastChild.remove();
        }
    }
}

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
            alert("Un gifo se agrego a su lista de favoritos");
            window.location.reload(false);
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

// ============================ NAV BEHAVIOR ========================= //

const navsphere = document.querySelector('.navsphere');
const navsuggestions = document.querySelector('.nav_container--suggestions')
const endpointSuggestions = 'https://api.giphy.com/v1/tags/related/';
const cross = document.getElementById('closer-input');

cross.addEventListener('click', () => {
    let A = document.getElementById('buscador');
    A.value = '';
    cross.classList.add('hidden');
    navsphere.classList.remove('navsphere-extended');
    navsuggestions.classList.add('hidden');
    searchingAnim.src = path + "searching/icon-search.svg";
})

window.addEventListener('keydown', (e) => {
    let A = document.getElementById('buscador');
    //searchingAnim.src = path + "searching/icon-search.svg";
    if(e.key == 'Enter') { 
        navsphere.classList.remove('navsphere-extended');
        navsuggestions.classList.add('hidden');
        return; 
    }
    if(A.value != '') {
        navsphere.classList.add('navsphere-extended');
        navsuggestions.classList.remove('hidden');
        cross.classList.remove('hidden');
        edificarSuggestions(A.value);
        //getSuggestions(A.value);
    } else {
        navsphere.classList.remove('navsphere-extended');
        navsuggestions.classList.add('hidden');
        cross.classList.add('hidden');
    }
})

async function edificarSuggestions (string) {
    const response = await fetch(endpointSuggestions + '{' + string + '}' + '?api_key=' + 'T96v34LvfncPq5iV6LjP4GsHYqeQEupg');
    const data = await response.json();
    deleteNode(navsuggestions);
    let resultingSearch = document.getElementById('searchResult');
    for (let i = 0; i < 4; i++) {
        let A = document.createElement('li');
        let B = document.createElement('div');
        A.innerText = data.data[i].name;
        A.addEventListener('click', () => {
            search.value = A.innerText;
            search.innerText = A.innerText;
            deleteNode(navsuggestions);
            navsphere.classList.remove('navsphere-extended');
            navsuggestions.classList.add('hidden');
            resultingSearch.innerText = A.innerText;
            newSearch( A.innerText);
        })
        B.addEventListener('click', () => {
            search.value = A.innerText;
            search.innerText = A.innerText;
            deleteNode(navsuggestions);
            navsphere.classList.remove('navsphere-extended');
            navsuggestions.classList.add('hidden');
            resultingSearch.innerText = A.innerText;
            newSearch( A.innerText);
        })
        A.classList.add('suggestion-li');
        navsuggestions.appendChild(A);
        navsuggestions.appendChild(B);
    }
}
