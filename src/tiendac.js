document.addEventListener("DOMContentLoaded", () => {
    $("#btnbackc").click(function() {
        window.electron.coffyc();
        modal.style.display = "none";
    })
    let tiket;
    let total;
    let productos_contenedor_c_c;
    let productos_contenedor_b_c;
    window.electron.getproductos__comida_c()
    window.electron.getproductos__bebida_c()
    productos_contenedor_c_c = document.getElementById("productos_contenedor_c_c");
    productos_contenedor_b_c = document.getElementById("productos_contenedor_b_c");
    total = document.getElementById("total")
    tiket = document.getElementById("tiket");
    window.electron.comidadc()
    window.electron.bebidac()
    window.electron.totalc();
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