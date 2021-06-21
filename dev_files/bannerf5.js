$(document).ready(function () {   
    // ajuda no refresh da pagina, para nao aparecer o header...
    // acontece q o banner as vezes demora para carregar ai acaba quebrando o layout
    // quando ele nao demora para carregar fica o header bonitinho la
    if ($(window).scrollTop() == 0) {
        setTimeout(function () {
            $(".wrap-navbar").removeClass("navbar2");
            $(".wrap-navbar").removeClass("fixed");
        }, 100);

    } else {
        setTimeout(function () {
            $(".wrap-navbar").removeClass("navbar2");
            $(".wrap-navbar").removeClass("fixed");
        }, 400);
    }
});