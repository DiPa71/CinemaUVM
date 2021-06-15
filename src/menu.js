document.addEventListener("DOMContentLoaded", function() {
    let card;
    let menu;
    card = document.getElementById("card");
    menu = document.getElementById("menu");
    window.electron.datauser();

    var audio = document.getElementById('audio');
    var playPauseBTN = document.getElementById('playPauseBTN');
    var count = 0;
    $("#cardt").click(function () {
        playPause()
        $("button").removeClass("none2");
        audio.volume = 0.1;
        audio.currentTime = 4;
        audio.play();
        
        
    })
    $("#playPauseBTN").click(()=>{
        playPause()
    })
    $("#playPauseBTNN").click(()=>{
        stop()
    })
    function playPause(){
        if(count == 0){
            count = 1;
            audio.play();
            playPauseBTN.innerHTML = "Pause &#9208;";
        }else{
            count = 0;
            audio.pause();
            playPauseBTN.innerHTML = "Play &#9658;";
        }
    
    }
    
    function stop(){
        playPause()
        audio.pause();
        audio.currentTime = 0;
        playPauseBTN.innerHTML = "Play &#9658;";
    }
    
});