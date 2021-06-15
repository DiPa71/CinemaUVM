document.addEventListener("DOMContentLoaded", function() { 
  let registros;
  $("#btnback").click(function() {
    window.electron.cancelaregistros();
})
  window.electron.callregistro();
  registros = document.getElementById("registros");
  window.electron.imprimirregistros();
});