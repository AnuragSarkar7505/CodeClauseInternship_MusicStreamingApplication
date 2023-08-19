console.log("Welcome to Spotify Clone...");

// variables
let songind = 0;
let audioElement = new Audio('songs/Hawayein.mp3');
let masterplay = document.getElementById('masterplay');
let musicbar = document.getElementById('musicbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songs'));   
// this is done when in the html file we give the class name as 'songitem' for all the songs divs.

let songs = [
    {songname:"Hawaayein", filepath:"songs/Hawayein.mp3", coverpath:"covers/1.jpg", duration:"4:49"},
    {songname:"Dance Ka Bhoot", filepath:"songs/Dance ka Bhoot.mp3", coverpath:"covers/2.jpg", duration:"3:03"},
    {songname:"Kesariya", filepath:"songs/Kesariya.mp3", coverpath:"covers/3.jpeg", duration:"4:28"},
    {songname:"Om Deva Deva", filepath:"songs/Deva Deva.mp3", coverpath:"covers/4.jpg", duration:"4:39"},
    {songname:"Jhoome Jo Pathaan", filepath:"songs/Jhoome jo Pathaan.mp3", coverpath:"covers/5.jpg", duration:"3:22"},
    {songname:"Tum Kya Mile", filepath:"songs/Tum Kya Mile.mp3", coverpath:"covers/6.jpeg", duration:"3:16"},
    {songname:"Phir Na Aisi Raat Aayegi", filepath:"songs/Phir na Aisi Raat Aayegi.mp3", coverpath:"covers/7.jpg", duration:"4:45"},
    {songname:"Tere Hawale", filepath:"songs/Tere Hawaale.mp3", coverpath:"covers/8.jpg", duration:"5:50"},
];

songitem.forEach((element, i) => 
{
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
})

//audioElement.play();

// play / pause button
masterplay.addEventListener('click', () =>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// eventlisteners
audioElement.addEventListener('timeupdate', () =>
{
    //console.log('timeupdate');
    // musicbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    musicbar.value = progress;
});

musicbar.addEventListener('change', () => 
{
    audioElement.currentTime = musicbar.value*audioElement.duration/100;
});

const makeAllplays = () => 
{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => 
    {
        element.classList.remove('far', 'fa-pause-circle');
        element.classList.add('fas', 'fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => 
{
    element.addEventListener('click', (e) =>
    {
        //console.log(e.target);
        makeAllplays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${index+1}.mp3`;
        mastersongname.innerText = songs[songind].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-pause-circle');

    });
});

// next button
document.getElementById('next').addEventListener('click', () => 
{
    songind = (songind + 1) % songs.length;
  
    audioElement.src = songs[songind].filepath;
    mastersongname.innerText = songs[songind].songname;
  
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-pause-circle');
});

// previous button  
document.getElementById('previous').addEventListener('click', () => 
{
    songind = (songind - 1 + songs.length) % songs.length;
  
    audioElement.src = songs[songind].filepath;
    mastersongname.innerText = songs[songind].songname;
  
    audioElement.play();
    gif.style.opacity = 1;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-pause-circle');
});

const currentTimeLabel = document.getElementById('currentTime');
const totalDurationLabel = document.getElementById('totalDuration');

audioElement.addEventListener('timeupdate', () => 
{
    const currentTime = formatTime(audioElement.currentTime);
    currentTimeLabel.textContent = currentTime;

    const totalDuration = formatTime(audioElement.duration);
    totalDurationLabel.textContent = totalDuration;

    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    musicbar.value = progress;
});

function formatTime(timeInSeconds) 
{
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
