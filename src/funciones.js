document.addEventListener("DOMContentLoaded", function() {
    let opcsalas;
    let peliculasopc;
    let fucntype;
    let listfunc;
    window.electron.getpeliculasfun()
    $("#fucntype").change(function() {
        let selct = $("#fucntype").val();
        obj = {
            tipo: selct
        }
        window.electron.getsalas(obj)
    });
    opcsalas = document.getElementById("opcsalas");
    peliculasopc = document.getElementById("peliculasopc");
    fucntype = document.getElementById("fucntype");
    window.electron.opcsalasfun();
    window.electron.opcpelicfun();
    $("#btn").click(function() {
        let idfun = document.querySelector('#fucntype').value
        let idsala = document.querySelector('#opcsalas').value
        let idpel = document.querySelector('#peliculasopc').value
        let fecha = document.querySelector('#Fecha').value
        let hora = document.querySelector('#Hora').value
        obj = {
            id_tipof: idfun,
            id_sala: idsala,
            n_pelicula: idpel,
            fecha: fecha,
            hr_i: hora
        }
        window.electron.insertobjfunciones(obj);
        $('#peliculasopc').val('')
        $('#Fecha').val('')
        $('#Hora').val('')
    });
    listfunc = document.getElementById('listfunc');
    window.electron.getfuncionesg();
    window.electron.printfunc();

    $("#btnback").click(function() {
        window.electron.cancelarfuncion();
    })
});