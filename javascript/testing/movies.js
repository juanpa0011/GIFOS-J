
const search = document.getElementById('search');

let cantidad = '3';
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        

     // console.log(search.value);
    let busqueda = search.value;
    newSearch(busqueda);
    }
});
let info;

async function newSearch(gifo) {
    
    const apiKey = 'SNJ9a5GbDjgSmOddC8ab03rQXLhxjPvS';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${gifo}&limit=${cantidad}`;

    try {
        const response = await fetch(url);
        info = await response.json();
        cant();
    } catch (err) {
        console.log(err);
    }

}
const conteiner = document.getElementById('conteiner');
const cant = ()=>{
    for(let i = 0 ; i< cantidad ; i++){
        let img = document.createElement('img');
        img.src = info.data[i].images.original.url;
        conteiner.appendChild(img);
    }
}


//let busqueda = 'goku';//goku-perros-cualquier cosa
 // se puede modificar hasta 25 que es lo que permite la API de gifos

//let busqueda =search.value;



 
