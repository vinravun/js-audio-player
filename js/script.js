// script for custom audio player


var audioList = document.getElementsByClassName('audio_player');
console.log('No. of audio files: ' + audioList.length);

for(var i=0; i<audioList.length; i++) {
    addPlayer(audioList[i]);
};

function addPlayer(player) {
    var currentAudio = player.querySelector('audio');

    var audioButton = player.querySelector('.button'),
    seekBar = player.querySelector('.seekbar'),
    timeDisplay = player.querySelector('.time_display');

    seekBar.min = 0;
    seekBar.value = seekBar.min;

    currentAudio.load();
    currentAudio.addEventListener('loadedmetadata', function() {
        seekBar.max = Math.floor(currentAudio.duration);
        console.log('Audio length: ' + seekBar.max);
    });

    audioButton.addEventListener('click', toggleAudio);
    currentAudio.addEventListener('ended', resetAudio);
    seekBar.addEventListener('input', seekChange);

    function toggleAudio() {
        if(currentAudio.paused) {    
            for(var i=0; i<audioList.length; i++) {
                audioList[i].querySelector('audio').pause();
                audioList[i].querySelector('.button').className = "button play";
            };
            playClip();
            audioButton.className = "button pause";
        } else {
            currentAudio.pause();
            audioButton.className = "button play";
        };
    };

    function playClip() {
        currentAudio.play();
        currentAudio.addEventListener("timeupdate", function() {
            seekBar.value = currentAudio.currentTime;
            updateTimeDisplay();
        });
    };

    function resetAudio() {
        seekBar.value = seekBar.min;
        audioButton.className = "button play";
        timeDisplay.innerHTML = "00:00";
    };

    function seekChange() {
        if(!currentAudio.paused) {
            currentAudio.pause();
            updateAudio();
            playClip();
        }
        else {
            updateAudio();
        }
    };

    function updateAudio() {
        currentAudio.currentTime = seekBar.value;
        updateTimeDisplay();
    };

    function updateTimeDisplay() {
        var seconds = Math.floor(currentAudio.currentTime%60),
        minutes = Math.floor(currentAudio.currentTime/60);

        (seconds < 10) ? (seconds = "0" + seconds) : seconds;
        (minutes < 10) ? (minutes = "0" + minutes) : minutes;
        var timeText = minutes + ":" + seconds;
        timeDisplay.innerHTML = timeText;
    };
};
