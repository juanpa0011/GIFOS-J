const arrright = document.getElementById('right');
const arrleft = document.getElementById('left');
const btnPlus = document.getElementById('creategift');
const facebook = document.getElementById('facebook');
const twitter = document.getElementById('twitter');
const insta = document.getElementById('insta');
const sticknav = document.getElementById('sticknav');
const showmore = document.getElementById('showmore');
const inputsearch = document.getElementById('buscador');

// STICKY NEEDED CODE
const header = document.getElementById('sticky');
const nav = document.getElementById('nav');

// DARKNESS NEEDED CODE
const dark = document.getElementById('darkness');
const configUser = window.matchMedia('(prefers-color-scheme: dark)')
const localSt = localStorage.getItem('theme');

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

let pathFinders = [];

class Pathfinder {
    constructor(HTMLelement, hoverSvg, leaveSvg, clickSvg, nocSvg, nocHoverSvg) {
        this.HTMLelement = HTMLelement;

        this.hoverSvg = path + hoverSvg;
        this.leaveSvg = path + leaveSvg;
        this.clickSvg = path + clickSvg;
        this.nocSvg = path + nocSvg;
        this.nocHoverSvg = path + nocHoverSvg;
    }
    Init() {
        this.HTMLelement.addEventListener("mouseover",() => {
            this.HTMLelement.src = this.hoverSvg;
        });
        this.HTMLelement.addEventListener("mouseleave",() => {
            this.HTMLelement.src = this.leaveSvg;
        });
        if (this.clickSvg != "") {
            this.HTMLelement.addEventListener("click",() => {
                this.HTMLelement.src = this.clickSvg;
            });  
        }
    }    
}


let trendingArr = []; //All images urls are added here.
const displayAtOneTime = 3;
index = displayAtOneTime;
let displayed = []


// needs called InitTrending()
function InitTrending() {
    displayed = trendingArr.slice(0, 3)
}

//On next
/*
function onNext() {
    if (trendingArr.length > displayAtOneTime) {
        displayed.reverse().pop();
        displayed.push(trendingArr[index]);
        index += 1;
        if (index > trendingArr.length - 1) {
            index = 0;
        }
    } else {
        alert("Not enough images found")
    }
}
function onPrevious() {
    if (trendingArr.length > displayAtOneTime) {
        displayed.reverse().pop();
        displayed.push(trendingArr[index]);
        index -= 1;
        if (index < 0) {
            index = trendingArr.length - 1;
        }
    } else {
        alert("Not enough images found")
    }
}
*/


function AddAllListeners() {
    pathFinders.push(new Pathfinder(arrright, "arrow/right/button-slider-right-hover.svg", "arrow/right/button-slider-right.svg", "arrow/right/button-slider-right-hover.svg", "arrow/right/button-slider-right-md-noct.svg", "arrow/right/button-slider-right-hover.svg"))

    pathFinders.push(new Pathfinder(arrleft, "arrow/left/button-slider-left-hover.svg", "arrow/left/button-slider-left.svg", "arrow/left/button-slider-left-hover.svg", "arrow/left/button-slider-left-md-noct.svg", "arrow/left/button-slider-left-hover.svg"))

    pathFinders.push(new Pathfinder(btnPlus, "plusbtn/CTA-crear-gifo-hover.svg", "plusbtn/button-crear-gifo.svg", "plusbtn/CTA-crear-gifo-active.svg", "plusbtn/CTA-crear-gifo-modo-noc.svg", "plusbtn/CTA-crear-gifo-hover-modo-noc.svg"))

    pathFinders.push(new Pathfinder(facebook, "facebook/icon_facebook_hover.svg","facebook/icon_facebook.svg", "facebook/icon_facebook_hover.svg", "facebook/icon_facebook_noc.svg", "facebook/icon_facebook_hover.svg"))

    pathFinders.push(new Pathfinder(twitter, "twitter/icon_twitter-hover.svg","twitter/icon_twitter.svg", "twitter/icon_twitter-hover.svg", "twitter/icon_twitter_noc.svg", "twitter/icon_twitter-hover.svg"))

    pathFinders.push(new Pathfinder(insta, "insta/icon_instagram-hover.svg","insta/icon_instagram.svg", "insta/icon_instagram-hover.svg", "insta/icon_instagram_noc.svg", "insta/icon_instagram-hover.svg"))

    pathFinders.push(new Pathfinder(showmore, "viewmorebtn/ver-mas-hover.svg","viewmorebtn/ver-mas.svg", "viewmorebtn/ver-mas-hover.svg", "viewmorebtn/ver-mas-noc.svg", "viewmorebtn/ver-mas-hover-noc.svg"))
}




AddAllListeners();



// HEADER - Sticky Code //

window.onscroll = function() {stickyfunction()};

// Get the offset position of the navbar
let sticky = nav.offsetTop;

function stickyfunction() {
    if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } else {
    header.classList.remove("sticky");
    }
}

// HEADER - Sticky END //


// Searching Images

  // ---- search gifos ----

const cant = ()=>{
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
        svgDownload.src = path + "link/icon-link-normal.svg";
        svgDownload.className = "iconholder"
    
        let img = document.createElement('img');


        img.id = i;
        img.src = info.data[i].images.original.url;

        placeholder.appendChild(img);
        btnholder.appendChild(svgFav);
        btnholder.appendChild(svgMax);
        btnholder.appendChild(svgDownload);
        placeholder.appendChild(btnholder);
        conteiner.appendChild(placeholder);
        ConstructImgHolder.push = new ConstructImgHolder(img,btnholder,svgFav,svgMax,svgDownload);
    }
    searchAnimationEnd()
}

function searchAnimation () {
    searchingAnim.src = path + "loadingcheck/loader.svg";
}

function searchAnimationEnd() {
    searchingAnim.src = path + "loadingcheck/ok.svg";
}

const search = document.getElementById('buscador');
const conteiner = document.getElementById('gifobuilder');
const searchingAnim = document.getElementById('buscadoranimation');


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
            } else {
                this.HTMLBtnHolder.style.display = 'flex';
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
            this.HTMLDownload.src = path + "link/icon-link-hover.svg";
        });
        this.HTMLDownload.addEventListener("mouseleave",() =>{
            this.HTMLDownload.src = path + "link/icon-link-normal.svg";
        });
    }
}


let cantidad = '12';
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        let condition = undefined;
        let searchvalue = search.value;
        searchAnimation();
        newSearch(searchvalue);
    }
})
/*
const myPromise = new Promise((resolve, reject) => {
    let condition;

    if(condition is met) {
        resolve('Promise is resolved successfully.');
    } else {
        reject('Promise is rejected');
    }
});
*/
