document.addEventListener("DOMContentLoaded", function() {
    window.electron.asientosprint();
    $("#btn-cancelar-asientos").click(async function() {
        window.electron.cancelarasientos();
    })
})