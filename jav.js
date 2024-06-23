let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn'); 
const backwardBtn = document.querySelector('.backward-btn');

playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play(); 
    } else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    currentTime.innerHTML = '00:00';
    
    music.addEventListener('loadedmetadata', () => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    });
    
    music.load();
};

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time/60);
    if(min<10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');

}

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length -1 ){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0 ){
        currentMusic = songs.length -1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})

function showImage() {
    var imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    var image = document.createElement("img");
    image.src = "images/star.png";
    image.className = "displayed-image";

    var closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;"; 
    closeButton.className = "close-btn";
    closeButton.onclick = function () {
        imageContainer.classList.remove("show");
        setTimeout(function() {
            document.body.removeChild(imageContainer);
        }, 300); 
    };

    imageContainer.appendChild(closeButton);
    imageContainer.appendChild(image);

    document.body.appendChild(imageContainer);

    setTimeout(function() {
        imageContainer.classList.add("show");
    }, 10); 
}
