document.addEventListener("DOMContentLoaded", function() {
    let opcsuc;
    let listpro;
    window.electron.getsucpro();
    opcsuc = document.getElementById("opcsuc");
    window.electron.opcsuc();
    $("#btn").click(function() {
        nombre = $("#nombre").val();
        opcsuc = $("#opcsuc").val();
        descripcion = $("#descripcion").val();
        categoria = $("#cat").val();
        precio = $("#precio").val();
        obj = {
            nombre: nombre,
            descripcion: descripcion,
            categorias: categoria,
            id_suc: opcsuc,
            precio: precio,
        }
        window.electron.instprod(obj);
        queryproductos();
        $('#nombre').val('')
        $('#opcsuc').val('')
        $('#descripcion').val('')
        $('#cat').val('')
        $('#precio').val('')
    });
    listpro = document.getElementById('listpro');
    queryproductos()
    window.electron.imprimirproduc();

    $("#btnback").click(function() {
        window.electron.cancelarproductos();
    })

})
async function queryproductos() {
    await window.electron.queryproductos();
}