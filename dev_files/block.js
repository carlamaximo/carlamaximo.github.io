/* Verifica AdBlock */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var publicidadeFixa = {
    init: function () {
        var interval = setInterval(function () {
            if (!getCookie("block")) {
                var alturaBannerTop = $('.block').height();
                var alturaBannerSidebar = $('#ad').height();
                var alturaBannerSidebarMobile = $('#dfp-single-middle').height();
                if (alturaBannerTop > 0 || alturaBannerSidebar > 0 || alturaBannerSidebarMobile > 0) {  //BANNER CARREGOU
                    $(".adblock-conteudo").hide();
                    document.cookie = "block=false";
                } else {
                    if (localStorage.getItem("cookiesAccepted") == "true")
                        $(".adblock-conteudo").show();
                }
                if (alturaBannerTop > 20) {
                    clearTimeout(interval);
                }
            }
        }, 5000);
    }
}

$(document).ready(function () {
    setTimeout(function () {
        publicidadeFixa.init();
    }, 5000);
});