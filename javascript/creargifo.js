const path = "../assets/"
const endpointUpload = 'https://upload.giphy.com/v1/gifs?api_key=';
const apiKey = 'T96v34LvfncPq5iV6LjP4GsHYqeQEupg';

// ============================= DARK MODE ==============================

const dark = document.getElementById('darkness')

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
  console.log("Here")
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



// ===================================== JS Code for Creating GIFS

// ========================== CONSTANTES DE VARIABLES


const createGifos = document.querySelector('.creargif');
const gifCreateTitle = document.getElementById('crearGif_title');
const gifCreateText = document.getElementById('crearGif_text');
const gifCreateOverlay = document.getElementById('overlay');
const overlay__buttonscontainer = document.querySelector('.overlay__buttons-container');
const girCreateOverlayStatusIcon = document.getElementById('overlay_status-icon');
const girCreateOverlayStatusText = document.getElementById('overlay_status-text');
const gifCreateRecordingZone = document.querySelector('.creargif__recordingZone');
const recordedGifo = document.getElementById('recorded_gifo');
const timerRecording = document.getElementById('timer-recording');
const repeatShot = document.getElementById('repeatShot');

const stepOne = document.getElementById('step-1');
const stepTwo = document.getElementById('step-2');
const stepThree = document.getElementById('step-3');

const video = document.getElementById('recording_video');

const btnCreateGifoStart = document.getElementById('button-comenzar');
const btnCreateGifoRecord = document.getElementById('button-grabar');
const btnCreateGifoEnd = document.getElementById('button-finalizar');
const btnCreateGifoUpload = document.getElementById('button-subirGif');
const creargifCamara = document.querySelector('.creargif__camara');
const camaraCuerpo = document.querySelector('.camara');
const carreteChico = document.querySelector('.carrete-chico');
const carreteGrande = document.querySelector('.carrete-grande');
const celuloide = document.getElementById('celuloide');
const blobRec = document.querySelector('.blob');


// ========================== FIN DE LAS CONSTANTES DE VARIABLES

// ========================== EVENT LISTENERS


/* EVENTO CREAR GIFO - BOTÓN OBTENER PERMISOS */
btnCreateGifoStart.addEventListener('click', () => {
    getStreamAndRecord();
    btnCreateGifoStart.removeEventListener('click', () => getStreamAndRecord());
  });
  
  /* EVENTO CREAR GIFO - BOTÓN COMENZAR A GRABAR */
  btnCreateGifoRecord.addEventListener('click', () => {
    createGifo();
    btnCreateGifoRecord.removeEventListener('click', () => createGifo());
  });
  
  /* EVENTO CREAR GIFO - BOTÓN PARA DE GRABAR */
  btnCreateGifoEnd.addEventListener('click', () => {
    stopCreatingGif();
    btnCreateGifoEnd.removeEventListener('click', () => stopCreatingGif());
  });
  
  /* EVENTO CREAR GIFO - BOTÓN SUBIR*/
  btnCreateGifoUpload.addEventListener('click', () => {
    uploadCreatedGif();
    btnCreateGifoUpload.removeEventListener('click', () => uploadCreatedGif());
  });
  


// ========================== FUNCIONES RELACIONADAS A GRABADO.



let recorder;
const getStreamAndRecord = async () => {
  if (recorder) {
    recorder.destroy();
  }
  gifCreateTitle.textContent = '¿Nos das acceso a tu cámara?';
  gifCreateText.textContent = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.';
  stepOne.classList.add('step-active');
  await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 }
      }
    })
    .then((mediaStreamObj) => {
      btnCreateGifoStart.classList.add('hidden');
      btnCreateGifoRecord.classList.remove('hidden');
      gifCreateTitle.classList.add('hidden');
      gifCreateText.classList.add('hidden');
      video.classList.remove('hidden');
      stepOne.classList.remove('step-active');
      stepTwo.classList.add('step-active');
      video.srcObject = mediaStreamObj;
      video.play();
      recorder = RecordRTC(mediaStreamObj, {
        type: 'gif', frameRate: 1, quality: 10, width: 360, hidden: 240, onGifRecordingStarted: function () { }
      });
    })
    .catch((error) => console.error(error));
};


let timer;
const createGifo = () => {
  btnCreateGifoRecord.classList.add('hidden');
  timerRecording.classList.remove('hidden');
  btnCreateGifoEnd.classList.remove('hidden');
  creargifCamara.classList.add('on-record');
  blobRec.classList.remove('hidden')
  recorder.startRecording();
  timer = setInterval(timerActive, 1000);
};

let form;
let blob;
let hours = '00';
let minutes = '00';
let seconds = '00';
const stopCreatingGif = () => {
  form = new FormData();
  form.delete('file');
  btnCreateGifoEnd.classList.add('hidden');
  btnCreateGifoUpload.classList.remove('hidden');
  video.classList.add('hidden');
  recordedGifo.classList.remove('hidden');
  timerRecording.classList.add('hidden');
  repeatShot.classList.remove('hidden');
  creargifCamara.classList.remove('on-record');
  blobRec.classList.add('hidden')
  repeatShot.addEventListener('click', (e) => {
    e.preventDefault;
    repeatShot.classList.add('hidden');
    recordedGifo.classList.add('hidden');
    btnCreateGifoUpload.classList.add('hidden');
    stepThree.classList.remove('step-active');
    getStreamAndRecord();
  });
  stepTwo.classList.remove('step-active');
  stepThree.classList.add('step-active');
  recorder.stopRecording(() => {
    blob = recorder.getBlob();
    recordedGifo.src = URL.createObjectURL(blob);
    form.append('file', recorder.getBlob(), 'myGif.gif');
  });
  clearInterval(timer);
  hours = '00';
  minutes = '00';
  seconds = '00';
  timerRecording.innerText = `${hours}:${minutes}:${seconds}`;
};

let myGifoId;
const uploadCreatedGif = async () => {
  repeatShot.classList.add('hidden');
  btnCreateGifoUpload.classList.add('hidden');
  /* console.log(form.get('file')); */
  await fetch(endpointUpload + apiKey, {
    method: 'POST',
    body: form,
  })
    .then((response) => response.json())
    .then((myGif) => {

      myGifoId = myGif.data.id;

      const object = {
        id: myGifoId,
        url: `https://media.giphy.com/media/${myGifoId}/giphy.gif`,
        username: '',
        title: 'Tu gifo'
      };
      let arrayMyGifos = JSON.parse(localStorage.getItem('mygifos'));
      if (!arrayMyGifos) {
        arrayMyGifos = [];
        arrayMyGifos.push(object);
        localStorage.setItem('mygifos', JSON.stringify(arrayMyGifos));
      } else {
        arrayMyGifos.push(object);
        localStorage.setItem('mygifos', JSON.stringify(arrayMyGifos));
      }
    })
    .catch((error) => {
      console.error(error);
    });
    alert("Your Gif is now posted");
    window.location.reload(false);
};

const timerActive = () => {
  seconds++;
  if (seconds < 10) seconds = `0` + seconds;
  if (seconds > 59) {
    seconds = `00`;
    minutes++;
    if (minutes < 10) minutes = `0` + minutes;
  }
  if (minutes > 59) {
    minutes = `00`;
    hours++;
    if (hours < 10) hours = `0` + hours;
  }
  timerRecording.innerHTML = `${hours}:${minutes}:${seconds}`;
};