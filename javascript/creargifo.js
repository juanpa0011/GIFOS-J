const stepone = document.getElementById('stepone');
const steptwo = document.getElementById('steptwo');
const stepthree = document.getElementById('stepthree');

const path = "../assets/"

class Struct {

    HTMLelement;
    hoverSvg;
    leaveSvg;
    clickSvg;

    constructor(HTMLelement, hoverSvg, leaveSvg, clickSvg, nocSvg, nocHoverSvg) {
        this.HTMLelement = HTMLelement;
        this.hoverSvg = path + hoverSvg;
        this.leaveSvg = path + leaveSvg;
        this.clickSvg = path + clickSvg;
        this.nocSvg = path + nocSvg;
        this.nocHoverSvg = path + nocHoverSvg;
        this.Init();
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
        if (this.nocSvg != "") {
            
        }
        if (this.nocHoverSvg != "") {
            
        }
    }
}

let structs = [];
let trendingArr = []; //All images urls are added here.
const displayAtOneTime = 3;
index = displayAtOneTime;
let displayed = []


// needs called InitTrending()
function InitTrending() {
    displayed = trendingArr.slice(0, 3)
}

//On next
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


function AddAllListeners() {
    structs.push(new Struct(facebook, "facebook/icon_facebook_hover.svg","facebook/icon_facebook.svg", "", "", ""))
    structs.push(new Struct(twitter, "twitter/icon_twitter-hover.svg","twitter/icon_twitter.svg", "", "", ""))
    structs.push(new Struct(insta, "insta/icon_instagram-hover.svg","insta/icon_instagram.svg", "", "", ""))
}

AddAllListeners();

const dark = document.getElementById('darkness');
console.log(dark);
const configUser = window.matchMedia('(prefers-color-scheme: dark)')
const localSt = localStorage.getItem('theme');
if(localSt === 'dark') {
    document.body.classList.toggle('dark-theme')
}
else if (localSt === 'light') {
    document.body.classList.toggle('light-theme')
}
// los value de  localStorage seran 'dark' y 'light'

dark.addEventListener('click',() => {
    let colorTheme;
    if (configUser.matches) {
    document.body.classList.toggle('light-theme')
    colorTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark '
    }
    else {
        document.body.classList.toggle('dark-theme')
        colorTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    }
    localStorage.setItem('theme', colorTheme)
})