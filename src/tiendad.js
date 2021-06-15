document.addEventListener("DOMContentLoaded", () => {
    $("#btnback2").click(function() {
        window.electron.candyc();
        modal.style.display = "none";
    })
    let total;
    let tiket;
    let productos_contenedor_c;
    let productos_contenedor_b;
    let productos_contenedor_k;
    window.electron.getproductos__comida()
    window.electron.getproductos__bebida()
    window.electron.getproductos__kombo()
    productos_contenedor_c = document.getElementById("productos_contenedor_c");
    productos_contenedor_b = document.getElementById("productos_contenedor_b");
    productos_contenedor_k = document.getElementById("productos_contenedor_k");
    total = document.getElementById("total")
    tiket = document.getElementById("tiket");
    window.electron.comidad()
    window.electron.bebida()
    window.electron.kombo()
    window.electron.totald();
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("modald");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    
});