document.addEventListener("DOMContentLoaded", function() {
    let opcpeli;
    let opcfun;
    let btn;
    $("#btn").click(() => {
        window.electron.window_asientos()
    })
    $("#opcpeli").change(() => {
        let selct = $("#opcpeli").val();
        obj = {
            n_pelicula: selct
        }
        window.electron.getfunciones(obj);

    });
    opcpeli = document.getElementById("opcpeli");
    opcfun = document.getElementById("opcfun");
    btn = document.getElementById("btn");
    window.electron.opcpelic();
    window.electron.funcion_opc();
    btn.onchange = asientos;
    async function asientos(e) {
        if (e.srcElement.id == "btn") {
            const obj = {
                id: e.srcElement.value
            }
            ipcRenderer.send('asientos', obj);
        }

    }
    // window.electron.descripcion();
    $("#btnback").click(function() {
        window.electron.cancelarboletos();
    })
});