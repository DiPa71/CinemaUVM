document.addEventListener("DOMContentLoaded", () => {
    $("#dulce").click(function() {
        window.electron.candyo();
    })
    $("#cafe").click(function() {
        window.electron.coffyo();
    })

    $('#btnback').click(function() {
        window.electron.cancelarmenu();
    })
});