window.onload = function () {

    var audio = document.getElementById("myaudio");
    audio.volume = 0.3;

    nombre = document.getElementById("name")
    pass = document.getElementById("pass")
    btn = document.getElementById("btn")
    $("#btn").click(function () {
        const obj = {
            nombre: nombre.value,
            pass: pass.value
        }
        window.electron.invokemsg(obj)
    })

    function show() {
        var p = document.getElementById('pass');
        p.setAttribute('type', 'text');
    }

    function hide() {
        var p = document.getElementById('pass');
        p.setAttribute('type', 'password');
    }

    var pwShown = 0;

    document.getElementById("eye").addEventListener("click", function () {
        if (pwShown == 0) {
            pwShown = 1;
            show();
        } else {
            pwShown = 0;
            hide();
        }
    }, false);   

}
