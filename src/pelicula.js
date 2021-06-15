document.addEventListener("DOMContentLoaded", function() {
    let listp;
    $("#btn").click(function() {
        nombre = $("#pelicula").val();
        sinopsis = $("#sinopsis").val();
        duracion = $("#duracion").val();
        obj = {
            nombre: nombre,
            sinopsis: sinopsis,
            duracion: duracion
        }
        window.electron.insertar_peli(obj);
        querypeliculas();
    });

    listp = document.getElementById("listp");
    querypeliculas();
    window.electron.imprimirpeli();
    $("#btnback").click(function() {
        window.electron.cancelarpelicula();
    })
});
async function querypeliculas() {
    await window.electron.querypeliculas();
}