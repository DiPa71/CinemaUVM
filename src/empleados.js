document.addEventListener("DOMContentLoaded", function() {
    let mylist;
    let opcsuc;
    window.electron.getsuc();
    opcsuc = document.getElementById("opcsuc");
    window.electron.opcsuc();
    $("#btn").click(function() {
        opcrol = $("#opcrol").val();
        opcsuc = $("#opcsuc").val();
        nombre = $("#Nombre").val();
        telefono = $("#Telefono").val();
        nick = $("#Nickname").val();
        pass = $("#Contraseña").val();
        obj = {
            nombre: nombre,
            telefono: telefono,
            id_suc: opcsuc,
            nickname: nick,
            password: pass,
            rol: opcrol
        }
        window.electron.instempleado(obj);

        queryempleados();
        mylist.innerHTML = " "
        $('#opcrol').val('')
        $('#opcsuc').val('')
        $('#Nombre').val('')
        $('#Telefono').val('')
        $('#Nickname').val('')
        $('#Contraseña').val('')
    });


    mylist = document.getElementById("mylist");
    queryempleados(); //hACE QUERY
    window.electron.imprimirempleados();

    $("#btnback").click(function() {
        window.electron.cancelarempleados();
    })
});

async function queryempleados() {
    await window.electron.queryempleados();
}