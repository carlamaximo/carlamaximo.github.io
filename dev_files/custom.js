function cliqueBtnMobile() {
    $(".icon-menu-mobile-abre").click();
}

function fechaSelect() {
    $(".select input").prop("checked", false);
}

function customHeader() {
    if ($(window).width() >= 600 && $(window).width() <= 900) {
        $(".wrap-navbar").addClass("navbar2");
    } else {
        $(".wrap-navbar").removeClass("navbar2");
    }
}

function apagaBusca() {
    $(".icon-14").css("display", "none");
    $termo = $('.js-busca');
    $termo.val(null);
}

function fechaMenu() {
    $("input[type='radio']").prop('checked', false);
}

function scrollFunctions() {

    if ($(document).width() <= 962) {
        $('.desktop-dfp').remove();
        $('.mobile-dfp').show();
    } else {
        $('.mobile-dfp').remove();
        $('.desktop-dfp').show();
    }
    $lastScroll = 0;
    $scrollDesce = null;
    $scrollSobe = null;
    $scrollDesce = $(window).scrollTop();
    let num = 0;
    $(window).scroll(function () {

        fechaSelect();
        $scroll = $(window).scrollTop();
        $navbar = $(".wrap-navbar");
        $hnavbar = $navbar.innerHeight();
        $tamScroll = document.body.scrollHeight;
        $conteudo = $(".container-conteudo");

        //barra compartilhar nao esta no 3ºnivel
        if ($('.bloco-compartilhar-texto').length == 0) {
            if ($(window).width() >= 900) {
                if ($scroll >= $hnavbar && $lastScroll < $scroll && $(document).height() > 1600) {
                    $navbar.addClass("navbar2");
                    $navbar.addClass("fixed")
                    $navbar.css("top", "-" + $hnavbar + "px");
                    if ($hnavbar > 284) {
                        $conteudo.css("margin-top", 390 + "px");
                    } else {
                        $conteudo.css("margin-top", 190 + "px");
                    }
                }
                else if ($lastScroll > $scroll && $scroll >= $hnavbar) {
                    if ($hnavbar > 284) {
                        num = -285;
                    } else if ($hnavbar > 125) {
                        num = -125;
                    } else if ($hnavbar > 35) {
                        num = -35;
                    }

                    $navbar.css("top", num);
                } else if ($scroll < $hnavbar && $lastScroll > $scroll) {

                    $navbar.removeClass("navbar2");
                    $navbar.removeClass("fixed")
                    $navbar.removeAttr("style", "top");
                    $conteudo.removeAttr("style", "margin-top");
                }
            } else {
                if ($scroll >= $hnavbar && $lastScroll < $scroll) {
                    $navbar.addClass("navbar2");
                    $navbar.addClass("fixed")
                    $navbar.css("top", "-" + '100' + "%");
                } else if ($lastScroll > $scroll && $scroll >= $hnavbar) {
                    if ($(".container-banner").innerHeight() > 49 && localStorage.getItem("cookiesAccepted") !== "true") {
                        $navbar.css("top", "-" + 100 + "px");
                    } else if ($(".container-banner").innerHeight() > 49 && localStorage.getItem("cookiesAccepted") === "true") {
                        $navbar.css("top", "-" + 23 + "px");
                    } else {
                        $navbar.css("top", "-" + $(".container-banner").innerHeight() + "px");
                    }
                } else if ($scroll < ($hnavbar - 68) && $lastScroll > $scroll) {
                    $navbar.removeClass("navbar2");
                    $navbar.removeClass("fixed");
                    $navbar.removeAttr("style", "top");
                }
            }
        }

        // barra de compartilhar 3º nivel
        if ($('.bloco-compartilhar-texto').length > 0) {
            $hbannerMenu = $(".container-menu").innerHeight();
            $containerBarra = $(".container-barra-compartilhar");
            $barraCompartilharTexto = $('.bloco-compartilhar-texto');
            $barraCompartilharTop = $('.bloco-compartilhar-topo');
            $containerMenu = $(".cont-menu");
            $hnavbar = $(".container-menu").innerHeight() + $(".container-banner").innerHeight();

            if ($(window).width() >= 900) {
                // ativa a barra quando desce o scroll
                if ($scroll > $barraCompartilharTexto.offset().top && $scroll > $lastScroll && $scroll < $('.bloco-tags').offset().top) {
                    $navbar.addClass("navbar2");
                    $(".container-banner").addClass("fixed");
                    $containerBarra.show()
                    $navbar.addClass("fixed")
                    $navbar.css("top", "-" + $hbannerMenu + "px");
                    $conteudo.css("margin-top", $hnavbar + "px");
                } // scroll subindo e menor que o offset do barra compartilhar
                else if ($lastScroll > $scroll && $scroll <= $barraCompartilharTexto.offset().top) {
                    $navbar.removeClass("navbar2");
                    $navbar.removeClass("fixed")
                    $navbar.removeAttr("style", "top");
                    $conteudo.removeAttr("style", "margin-top");
                    $containerBarra.hide();
                    $(".container-banner").removeClass("fixed");
                }
                // scroll subindo e estiver dentro do campo do conteudo
                else if ($lastScroll > $scroll && $scroll > $barraCompartilharTexto.offset().top && $scroll < $('.bloco-tags').offset().top) {
                    $navbar.css("top", "0px");
                }//scroll descendo e passar o offset das tags
                else if ($scroll > $('.bloco-tags').offset().top) {
                    $navbar.css("top", "-100%");
                }
            } else {
                //scroll descendo no mobile
                if ($scroll > $("#historia-conteudo").offset().top && $scroll < $('.bloco-tags').offset().top) {
                    $(".container-banner").addClass("fixed");
                    $(".container-barra-compartilhar").show();
                    $navbar.addClass("fixed")
                    $navbar.css("top", "-100%");
                    $barraCompartilharTop.addClass("fixed");
                }// scroll chegando no topo
                else if ($scroll < $("#historia-conteudo .historia-titulo").offset().top) {
                    $(".container-barra-compartilhar").hide();
                    $(".container-banner").removeClass("fixed");
                    $navbar.removeClass("fixed")
                    $navbar.removeAttr("top")
                    $barraCompartilharTop.removeClass("fixed");
                }///scroll descendo e passar o offset das tags
                else if ($scroll > ($('.bloco-tags').offset().top)) {
                    $navbar.css("top", "-100%");
                    $navbar.find(".banner-top").removeClass("bottom")
                }
            }// scroll dentro do conteudo barra progress
            if ($scroll > ($("#historia-conteudo").offset().top)) {
                $barra = $(".bloco-compartilhar-topo .barra");
                $inicio = $("#historia-conteudo").offset().top;
                $fim = $(".divfim").offset().top - 180;
                pScroll = (($scroll - $inicio) * 100) / ($fim - $inicio) + "%"
                $(".bloco-compartilhar-topo .barra-progresso .barra").width(pScroll)
            }
        }
        $lastScroll = $scroll;
    });
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

$(window).resize(function () {
    customHeader();
});
//function q troca a cor da newsletter trocacor
let arrayNews = [];
$(".green1").on('change', function () {
    let objetoNews = {};
    if (this.checked) {
        objetoNews.id = $(this).attr('id');
        objetoNews.frequency = $(this).parent().parent().siblings(".-freq").find("input:checked").val();
        $(this).closest(".-white-news").addClass("-green-news").removeClass("-white-news");
        arrayNews.push(objetoNews);
    } else {
        $(this).closest(".-green-news").removeClass("-green-news").addClass("-white-news");
        arrayNews.splice(arrayNews.findIndex(function (i) {
            return i.id === objetoNews.id;
        }), 1);
    }
    localStorage.setItem("arrayNews", JSON.stringify(arrayNews));
})
// Recupera o json do localStorage
var jsonUser = window.localStorage.getItem('previousUser');
// Converte este json para objeto
var User = JSON.parse(jsonUser);

function openLoginPR() {
    if(User){        
        $("#login-pr").hide();
        $("#voltou-pr").show();
        $('.js-remenber-user b').text(User.first_name);
        $('.js-remenber-login input').val(User.login)
    }else{
        $("#voltou-pr").hide();     
    }
    $("#login-pr").removeClass("load-hidden");
    $("#titu").removeClass("load-hidden");
    $("#ncont").removeClass("load-hidden");
    $("#esqueci-pr").hide();
    $("#rsenha").hide();
}

function openLogin() {
    if(User){
        $("#login").hide();
        // $login_pr.hide();
        $("#voltou").show();
        // $voltou_pr.show();
        $('.js-remenber-user b').text(User.first_name);
        $('.js-remenber-login input').val(User.login)
    }else{
        $("#voltou").hide();
        // $voltou_pr.hide();    
    }
    $(".js-mdl-login").parent().fadeIn(0);
    $("#login").removeClass("load-hidden");
    // $login_pr.removeClass("load-hidden");
    $("#titu").removeClass("load-hidden");
    $("#ncont").removeClass("load-hidden");
    $("#esqueci").hide();
    // $esqueci_pr.hide();
    $("#rsenha").hide();
}

function NovaToPasta(){
    $(".salvar").removeClass("load-hidden");
    $(".nova").addClass("load-hidden");
    $(".mdl-pastas").removeClass("load-hidden");
    $(".conteudo-novo").addClass("load-hidden");
    $(".cancelar").removeClass("load-hidden");
    $(".criar").addClass("load-hidden");
    $(".nova-pasta").addClass("fright");
    $(".nova-pasta").removeClass("load-hidden");
}

$(function () {
    var $loadHidden = $(".load-hidden");
    var $btnOpenLogin = $(".js-open-login");
    var $mdlLogin = $(".js-mdl-login");
    var $btnCloseModal = $(".js-close-modal");
    var $mdlBackdrop = $(".mdl-backdrop:not([data-close])");
    var $mdlTudo = $(".mdl-tudo");
    var $senha = $(".js-esqueci-senha");
    var $esqueci = $("#esqueci");
    var $esqueci_pr = $("#esqueci-pr");
    var $login = $("#login");
    var $login_pr = $("#login-pr");
    var $titu = $("#titu");
    var $rsenha = $("#rsenha");
    var $ncont = $("#ncont");
    var $mdl = $(".mdl");
    var $logos = $(".-container-logos");
    var $voltou = $("#voltou");
    var $voltou_pr = $("#voltou-pr");
    var $naoSou = $(".js-nao-voce")

    $loadHidden.hide().removeClass("load-hidden");

    if (getUrlParameter('login') == 1) {
        openLogin();
        var url = window.location.href;
        url = url.split('?')[0];
        window.history.replaceState("login", "login", url);
    }    

    $btnOpenLogin.on('click', function () {
        openLogin();
    });

    $('.js-int-newsletter').on("click", function(e){
        if(!user_id){
            openLogin();
        }else{
            window.open(home_url+'painel-minha-conta/?p=news', '_blank');
        }
    });

    $('.js-restrict').on('submit', function(e){
        e.preventDefault();
        if(user_id){
            $.ajax({
                type: 'POST',
                url: url_admin+"admin-ajax.php",
                dataType: 'json',
                data: { 
                    'action': 'insertUserNewsletter',
                    'user_email': user_email,
                    'user_id': user_id,
                    'newsletter_id': 1, // ALTERAR QUANDO PASSAREM AS LISTAS CORRETAS FOI SOLICITADO EM DEZEMBRO
                    'frequency': 'teste-area-restrita' // ALTERAR QUANDO PASSAREM AS LISTAS CORRETAS FOI SOLICITADO EM DEZEMBRO
                },
                success: function(data){
                    window.open(home_url+'painel-minha-conta/?p=news', '_blank');
                },
                error: function(jsonAux){
                    console.log(jsonAux);
                }
            })
        }else{
            $('.js-news-login input').val($(this).find('input').val());
            $mdlLogin.parent().fadeIn(0);
            $login.removeClass("load-hidden");
            $('#voltou').hide();
            $('#voltou-pr').hide(); 
            $('#login').show();
        }
    });

    $btnCloseModal.on('click', function () {
        $(this).closest('.mdl-tudo').hide();
    });

    $mdlBackdrop.on('click', function () {
        $($mdlTudo).hide();
        $clicksm = 0;
    });

    $senha.on('click', function () {
        $login.addClass("load-hidden");
        $login_pr.addClass("load-hidden");
        $esqueci.show();
        $esqueci_pr.show();
        $titu.addClass("load-hidden");
        $rsenha.show();
        $ncont.addClass("load-hidden");
        $mdl.css({ "min-height": "auto" });
        $logos.css({ "margin": "20px 0" });
    })

    $naoSou.on('click', function () {
        localStorage.removeItem('previousUser');
        $voltou.hide();
        $voltou_pr.hide();
        $login.show();
        $login_pr.show();
    })
    // Modal Favoritos
    var $btnFavoritar = $(".btn-favoritar");
    var $mdlFavoritar = $(".js-mdl-favoritar");
    var $mdlFavoritarCriarNova = $(".nova-pasta");
    var $mdlContentNovo = $(".conteudo-novo");
    var $mdlPastas =  $(".mdl-pastas");
    var $tituloNova = $(".nova");
    var $tituloSlvar = $(".salvar");
    var $btnSalvar = $(".criar");
    var $btncancelar = $(".cancelar");

    function PastaToNova(){
        $tituloSlvar.addClass("load-hidden");
        $tituloNova.removeClass("load-hidden");
        $mdlPastas.addClass("load-hidden");
        $mdlContentNovo.removeClass("load-hidden");
        $btncancelar.addClass("load-hidden");
        $btnSalvar.removeClass("load-hidden");
        $mdlFavoritarCriarNova.removeClass("fright");
        $mdlFavoritarCriarNova.addClass("load-hidden");
    }

    $btnFavoritar.on('click', function(){
        if(user_id){
            if($(this).find('input').prop('checked')){
                $mdlFavoritar.parent().fadeIn(0);
                NovaToPasta()
            }
        }else{
            openLogin();
        }

        $(this).find("input").prop("checked", false);
    })

    $mdlFavoritarCriarNova.on('click', function(){
        PastaToNova() 
    })
 
    if (getUrlParameter('pasta') == 1) {
        $mdlFavoritar.parent().fadeIn(0);
        NovaToPasta();
        var url = window.location.href;
        url = url.split('?')[0];
        window.history.replaceState("home", "home", url);
    }
    $btncancelar.on('click', function () {
        $($mdlTudo).hide();
    });

    //Modal submenu
    var $submenu = $(".js-modal-submenu");
    var $mdlsub = $(".sub");
    $scroll = $(window).scrollTop();
    var $clicksm = 0;
    $submenu.on('click', function () {
        if($clicksm == 0){
            $mdlsub.fadeIn(0);
            $clicksm ++;
        }else{
            $mdlsub.hide();
            $clicksm = 0;
        }
    });    

    $hmen = $(".container-menu").outerHeight(true) ;
    $hnavbar = $(".container-menu").outerHeight(true) + $(".container-banner").outerHeight(true);
    $navbar = $(".wrap-navbar");
    $mtop = 0;
    if(!$($navbar).hasClass("fixed")){
        $mdlsub.css("top", ($hnavbar-50) + "px");
        $mdlsub.removeClass("fixed");
        if( $(window).width() <= 600){
            $mdlsub.css("top", ($hmen-10) + "px");
        }
    }
    
    $(window).scroll(function () {
        $hmen = $(".container-menu").outerHeight(true) ;
        var hnavbar = $(".container-menu").outerHeight(true) + $(".container-banner").outerHeight(true);
        $navbar = $(".wrap-navbar");
        var scroll = $(window).scrollTop();
        if(scroll < hnavbar){
            var $clicksm = 0;
            $submenu.on('click', function () {
                $mdlsub.css("top", (hnavbar-50) + "px");
                $mdlsub.removeClass("fixed");
                if( $(window).width() <= 600){
                    $mdlsub.css("top", ($hmen-10) + "px");
                }
            });
        }else{
            var $clicksm = 0;
            $(".icon-menu-mobile-abre").on('click', function(){
                
                if ($(".mdl-tudo").is(":visible")){
                    $clicksm = 0;
                    $(".mdl-tudo").hide();
                }
            });
            $(".btn-fechar").on('click', function(){
                $clicksm = 0;
            })
            $(".menu-fixo-fundo").on('click', function(){
                $clicksm = 0;
            });
            $submenu.on('click', function () {
                if($clicksm == 0){
                    if($($navbar).hasClass("fixed")){
                        $mdlsub.fadeIn(0);
                        $clicksm ++;
                        $mdlsub.addClass("fixed");
                        $mdlsub.css("top",50+"px");
                        if( $(window).width() <= 600){
                            $mdlsub.css("top", 46 + "px");
                        }
                    }
                }else{
                    $mdlsub.hide();
                    $clicksm = 0;
                }
            }); 
        }
    });

});

$(document).ready(function () {

    if(broker == 'false'){
        $('.btn-favoritar').hide();
    }
    
    openLoginPR();

    $(".opTodos").click();
   
    $('#cbxs').val(this.checked);

      //abrir o submenu após alteração nas matérias
      $link = window.location.href;
      url = $link.split('?')[1];
      url2 = $link.split('?')[0];
      
      if (url !== undefined && url === 'fav=1') {
          $(".sub").css("display", "block");
          history.pushState('submenu','submenuRemove',url2);
      }

    //interação entre as barras de busca
    $('.busca-barra-menu').click(function () {
        $x = $("#s1").val();
        if ($(".pesquisa-navbar").val() !== "") {
            $("#s").val($x);
            $('#searchform').submit();
        }
    });

    $('#busca-m').click(function () {
        $x = $("#s1").val();
        if ($(".pesquisa-navbar").val() !== "") {
            $(".pesquisa-navbar").val($x);
            $('#searchform_middle').submit();
        }
    });
    scrollFunctions();
    // abre modal busca
    $(".wrap-busca-barra .btn-busca").click(function () {
        if ($(window).width() <= 900) {
            $(".wrap-busca-barra  .content-busca").show();
            $(".wrap-busca-barra  .content-header input ").focus();
        }
    });

    //função para fechar o menu mobile quando clica fora dele
    $(document).on("click", function () {
        if ($(".b-black").is(":visible")) {
            $(".menu-fixo-fundo").on("click", function () {
                $(".icon-menu-mobile-abre").prop("checked", false);
            });

        }
    });

        //função para fechar o modal midia kit fora dele
        $(document).on("click", function (e) {   
            var d = document.querySelector(".js-anuncie-modal");
                if ($('.wrap-modal').is(":visible")) {
                    if (e.target === d) {
                        $(".js-anuncie-modal").hide();
                       
                    }
                }
        });

        //função para fechar o modal de contato fora dele
        $(document).on("click", function (e) {   
            var d = document.querySelector(".js-modal-contato");
                if ($('.wrap-modal').is(":visible")) {
                    if (e.target === d) {
                        $(".js-modal-contato").hide();
                       
                    }
                }
        });

    //função para fechar o combobox do footer ao clicar fora dele
    let contads = 0;
    $(document).on("click", function (e) {
        var d = document.querySelector(".combo-footer-abre");
        contads++;
        if (contads > 1) {
            if ($('.combo-footer-abre').prop("checked")) {
                if (e.target !== d) {
                    $(".combo-footer-abre").prop("checked", false);
                    contads = 0;
                }
            } else {
                contads = 0;
            }
        }
    });

    //função para fechar o select ao clicar fora dele
    var abreContentSelect = document.querySelector(".content-select");
    let cont = 0;
    $(document).on("click", function (e) {
        let fora = !abreContentSelect.contains(e.target);
        cont++;
        if (cont > 1) {
            if ($('.select.select-emp-top input[type=checkbox]:checked').length > 0) {
                if (fora) {
                    $(".select.select-emp-top input[type=checkbox]").prop("checked", false);
                    cont = 0;
                }
            } else {
                cont = 0;
            }
        }
    });

    // fecha modal busca
    $(".wrap-busca-barra .voltar").click(function () {
        $(".wrap-busca-barra  .content-busca").hide();
    });

    // customiza o header
    customHeader();
    // chama modal baixar midiakit
    $(".baixar-midiakit").click(function () {
        $(".js-anuncie-modal").show();
    });
    $(".js-anuncie-modal .fechar-modal").click(function () {
        $(".js-anuncie-modal").hide();
    });
    //chamada modal de contato
    $(".contato--js").click(function () {
        $(".js-modal-contato").show();
    });
    $(".js-modal-contato .fechar-modal").click(function () {
        $(".js-modal-contato").hide();
    });

    //verifica se o navegador suporta cookies
    if (localStorage.getItem("cookiesAccepted") != "true") {
        localStorage.setItem("cookiesAccepted", false);
        $(".adblock-conteudo").hide();
        $(".cookies-conteudo").show();
    }
    //após clicar no botão 
    $('.btn-ok').click(function (e) {
        e.preventDefault();
        localStorage.setItem("cookiesAccepted", true);
        $(this).closest('.cookies-conteudo').animate({
            bottom: '-100%'
        }, {
                duration: 1500,
                complete: function () {
                    setTimeout(() => {
                        $('.adblock-conteudo').animate({
                            bottom: '0'
                        }, 1500);
                    }, 2000);
                }
            })
    });

    //filtros da pagina de resultados de pesquisa/busca (relevancia - data)
    if (!(localStorage.getItem('filtrobusca'))) {
        $('.fltrdata').addClass('ativo');
        document.cookie = 'filtrobusca=fltrdata';
    } else {
        $('.' + localStorage.getItem('filtrobusca') + '').addClass('ativo');
        document.cookie = localStorage.getItem('filtrobusca');
    }
    $('.filtro').click(function () {
        $this = $(this);
        $('.filtro').removeClass('ativo');
        $this.addClass('ativo');
        if ($('.fltrdata').hasClass('ativo')) {
            localStorage.setItem('filtrobusca', 'fltrdata');
            document.cookie = 'filtrobusca=fltrdata';
        } else {
            localStorage.setItem('filtrobusca', 'fltrrelev');
            document.cookie = 'filtrobusca=fltrrelev';
        }
        location.reload();
    });

    // verifica se o e-mail é válido para inscricao na newsletter
    $('.form-news .input-submit').click(function (e) {
        $mail = $('#lista-integracao-email');
        $error = '<div class="error after"><p class="msg-news">Informe o e-mail</p><i class="icon icon-28"></i></div>';
        $sucess = '<div class="sucess after"><i class="icon icon-27"></i></div>';
        if ($mail.val().indexOf("@") != -1 && $mail.val().indexOf(".") != -1) {
            $(".after").remove();
            $mail.after($sucess);
        } else {
            $(".after").remove();
            $mail.removeAttr('placeholder');
            $mail.after($error);
            e.preventDefault();
        }
    });

    //grava o id da noticia lida no localstorage
    let idNews = ($("#controle-id").attr("value"));
    if (idNews != undefined) {
        // verifica se temos no localstorage o elemento noticiaVisualizada
        let tmpNoticiasTeste = localStorage.getItem("noticiasVisualizadas");
        // cria um array vazio de noticias visualizadas
        let noticiasVisualizadas = [];
        // caso ja tenhamos alguma noticia visualizada, atualizamos nosso array vazio com as noticias do localstorage
        if (tmpNoticiasTeste !== null) {
            noticiasVisualizadas = JSON.parse(tmpNoticiasTeste);
        }
        // verifica se a noticia ja se encontra no localstorage, caso contrario armazena a mesma
        if (!noticiasVisualizadas.includes(parseInt(idNews))) {
            noticiasVisualizadas.push(parseInt(idNews));
        }
        // salva o array de noticias visualizadas no localstorage
        localStorage.setItem("noticiasVisualizadas", JSON.stringify(noticiasVisualizadas));
    }


    let noticias = $(".controle-lidas");
    let l = noticias.length;
    for (let i = 0; i < l; i++) {
        idNewsLidas = (noticias[i].getAttribute('id'));
        //lê o localstorage para setar se uma noticia já foi lida
        // carrega o localstorage de noticias visualizadas
        let tmpNoticiasVisualizadas = localStorage.getItem("noticiasVisualizadas");

        // verifica se o localstorage ja foi criado, pode ser que usuario nunca tenha acessado uma noticia
        if (tmpNoticiasVisualizadas === null) {
            return false;
        }

        // localstorage ja existe, converte em array
        let noticiasVisualizadas = JSON.parse(tmpNoticiasVisualizadas);

        // verifica se a noticia ja se encontra no localstorage
        if (noticiasVisualizadas.includes(parseInt(idNewsLidas))) {
            // ja esta no localstorage
            $("[id=" + idNewsLidas + "]").addClass("noticiaVisualizada");
        }
    }

    if ($(window).width() > 961) {
        $('#dfp-single-middle').remove();
    }


    // fim recolhe navbar
    if ($(window).width() <= 1199) {
        $(".bloco-compartilhar .icon-compartilhamento").click(function () {
            $this = $(this);
            $closest = $this.closest(".bloco-compartilhar");
            $modal = $closest.find(".modal-compartilhamento");
            $modal.addClass("ativo");
        });
        //fecha modal compartilhamento
        $(".modal-compartilhamento .icon-fechar-modal").click(function () {
            $this = $(this);
            $closest = $this.closest(".modal-compartilhamento");
            $closest.removeClass("ativo");
        });
        $('.compartilhar > .nome').text(window.location.href);

        $('.compartilhar').click(function (e) { /* Copia para o Ctrl + c, Tem que gerar um input para dar certo, depois que copia ele */
            $tooltip = $('.nome');
            $tooltip.html("Copiado");
            $temp = $("<input>");
            $("body").append($temp);
            $temp.val(window.location.href).select();
            document.execCommand("copy");
            $temp.remove();
        });

        $('.compartilhar2').click(function (e) { /* Copia para o Ctrl + c, Tem que gerar um input para dar certo, depois que copia ele */
            $tooltip = $('.nome');
            $tooltip.html("Copiado");
            $temp = $("<input>");
            $("body").append($temp);
            $temp.val(window.location.href).select();
            document.execCommand("copy");
            $temp.remove();
        });
    }

    $('.compartilhamento-link').mouseover(function () {
        if ($(this).hasClass('compartilhamento-bottom-js')) {
            $('.compartilhamento-bottom-js > .tooltip').addClass('tooltip-ativo-cima');
            $('.compartilhamento-bottom-js > span.tooltip.tooltip-ativo-cima').css({ position: 'absolute', bottom: '33px' });
        } else if ($(this).hasClass('compartilhamento-middle-js')) {
            $('.compartilhamento-middle-js > .tooltip').addClass('tooltip-ativo-cima');
            $('.compartilhamento-middle-js > span.tooltip.tooltip-ativo-cima').css({ position: 'absolute', bottom: '33px' });
        } else if ($(this).hasClass('compartilhamento-fixo')) {
            $('.compartilhamento-fixo > .tooltip').addClass('tooltip-ativo-baixo');
        }
    });

    $('.compartilhamento-link').mouseout(function () {
        $tooltip = $('.tooltip');
        $tooltip.removeClass("tooltip-ativo-baixo");
        $tooltip.removeClass("tooltip-ativo-cima");
    });

    $('.compartilhamento-link > .link').text(window.location.href);
    $('.compartilhamento-link').click(function () { /* Copia para o Ctrl + c, tem que gerar um input para dar certo, depois que copia ele */
        $tooltip = $('.tooltip');
        $tooltip.html("Copiado");
        $temp = $("<input>");
        $("body").append($temp);
        $temp.val(window.location.href).select();
        document.execCommand("copy");
        $temp.remove();
    });
});

$('.link-hover-saiba').mouseover(function () {
    let $tooltip = $(".tooltip-saiba");
    $tooltip.addClass('tooltip-ativo-baixo');
});

$('.link-hover-saiba').mouseout(function () {
    let $tooltip = $(".tooltip-saiba");
    $tooltip.removeClass('tooltip-ativo-baixo');
});

//Favoritar
$s = "";
function alteracao($as){
    if($as === 1){
        $s = 'pronto';
    }else if($as === 2){
        return $s;
    }
}

$(".-no-select").on("click", function(){
    if(alteracao(2) === 'pronto'){
        history.replaceState("submenu", "submenu", "?fav=1");
        window.location.reload();
    }
    
});

$(".btn-favoritar").on("click", function(){
    $idMateria = $(this).closest("a").attr("id"); 
    $linkMateria = $(this).closest("a").attr("href");
    $o = $(this);
    $sigla = "";        
    if(($linkMateria).indexOf("pcw") > -1){
        $sigla = "pcw";
    }else if(($linkMateria).indexOf("cwwp")  > -1 || ($linkMateria).indexOf("cw")  > -1 || ($linkMateria).indexOf("computerworld")  > -1){
        $sigla = "cwwp";
    }else if(($linkMateria).indexOf("cio") > -1){
        $sigla = "cio";
    }
    else if(($linkMateria).indexOf("itmidia")  > -1){
        $sigla = "itm";
    }
    else if(($linkMateria).indexOf("itforum")  > -1){
        $sigla = "itf"; 
    }

    if(!$(this).find('input').prop('checked')){
            $.ajax({
                type: 'POST',
                url: url_admin+"admin-ajax.php",
                dataType: 'json',
                data: {  
                    'action' : 'deleteUserFavorite', 
                    'post_id' : $idMateria,
                    'site' : $sigla
                },
                success: function(data){
                    alteracao(1);
                    if($o.closest(".todos-conteudo").is(":visible")){
                        $o.closest(".controlador-linha").hide();
                    }
                    if($o.closest(".-line-fav").is(":visible")){
                        if(!$o.closest(".premimum-fav").is(":visible")){
                            $o.closest(".-line-fav").hide();
                        }
                        
                    }
                   
                },
                error: function(jsonAux){
                    console.log(jsonAux);
                    console.log("ERRO");
                }
            })   
    }else{
        $(".sub").hide();
    }
    
});

$(".img-pasta").on("click", function(){

    $idPasta = $(this).parent().attr("id");       

    if($(this).closest(".conteudo-favorito").is(":visible")){
        history.replaceState("pasta", "pasta", "?" + $idPasta);
        window.location.reload();
    }else{
  
    $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'insertUserFavorite', 
                'user_id' : user_id,
                'site' : $sigla,
                'url' : $linkMateria,
                'post_id' : $idMateria,
                'folder_id' : $idPasta
            },
            success: function(data){
                alteracao(1);
                $(".mdl-tudo").hide(); 
                $checkBox = $o.closest("a").find("input") ;
                if($checkBox.checked == true){
                    $checkBox.prop("checked", false);
                    $checkBox.prop("checked", true);
                }else{
                    $checkBox.prop("checked", true);
                }
            },
            error: function(jsonAux){
                console.log(jsonAux);
                console.log("ERRO");
            }
        })                        
    }
});

$aux=0;
$(".i-pastas").on("click", function(e){        
    if($aux < 1){
        $(this).siblings(".texto").find(".pasta-nome").css("visibility", "hidden");
        $(this).siblings(".texto").find(".tituloPasta").css("visibility", "visible");
        $(this).css("visibility", "visible");
        $a = $(this);
        $aux++; 
    }else{
        $novoNome = $(this).siblings(".texto").find(".tituloPasta").val();
        $idPasta = $(this).closest(".item-fav").attr("id")
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'alterUserFavoriteFolderName', 
                'folder_id' : $idPasta, 
                'name' :  $novoNome
            },
            success: function(data){
                alteracao(1);
                $a.siblings(".texto").find(".tituloPasta").css("visibility", "hidden");
                $a.siblings(".texto").find(".pasta-nome").text($novoNome).css("visibility", "visible");
                $a.removeAttr("style");
            },
            error: function(jsonAux){
                console.log("ERRO");
            }
        })
        $aux=0;
    }
});

    $(".fechar").on("click", function(){    
        $idPasta = $(this).closest(".item-fav").attr("id");
        var a = $(this);
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'deleteUserFavoriteFolder', 
                'folder_id' : $idPasta
            },
            success: function(data){
                a.parent().remove();
            },
            error: function(jsonAux){
                console.log("ERRO");
            }
        })
        $aux=0;
    });
var x = 0;
function selecionarOpcao(opcao){
    if(opcao === 'Todos'){
        x++;
        $link = window.location.href;
        url = $link.split('?')[1];
        if(url !== undefined && x === 2){
            window.location.href = $link.split('?')[0];
        }    
        $(".pastas").css( "background-color", "#c4c4c4");
        $(".todos").css( "background-color", "#a31e22");
        $(".pastas-conteudo").css("display","none");
        $(".todos-conteudo").css("display","block");
        $(".exibindoPastas").hide();
        $(".exibindoMaterias").show();
    }else if(opcao === 'Pastas'){
        $(".todos").css( "background-color", "#c4c4c4");
        $(".pastas").css( "background-color", "#a31e22");
        $(".todos-conteudo").css("display","none");
        $(".pastas-conteudo").css("display","table");
        $(".exibindoPastas").show();
        $(".exibindoMaterias").hide();
    }
}

$(".criar").on("click", function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'insertUserFavoriteFolder', 
                'user_id' : user_id, 
                'name' :  $("#titulo").val()
            },
            success: function(data){
                history.replaceState("pasta", "pasta", "?pasta=1");
                window.location.reload();
            },
            error: function(jsonAux){
                console.log(jsonAux);
                console.log("ERRO");
            }
        })
    });

    $('form#login').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'login', //calls wp_ajax_nopriv_ajaxlogin
                'username' : $('form#login #inputUsername').val(), 
                'password' : $('form#login #inputPassword').val()
            },
            success: function(data){
                if(data){
                    let objUser={};
                    objUser.first_name = data[0].first_name;
                    objUser.login = data[0].login;
                    // Cria um json a partir do objeto "data"
                    var jsonAux = JSON.stringify(objUser);
                    // "Grava" este json no localStorage
                    localStorage.setItem("previousUser", jsonAux);
                    window.location.reload();
                }else{
                    $('.login-fail').show();
                }
            },
            error: function(jsonAux){
                $('.login-fail').show();
            }
        })
    });

    $('form#voltou').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'login', //calls wp_ajax_nopriv_ajaxlogin
                'username' : $('form#voltou #inputUsernameVoltou').val(), 
                'password' : $('form#voltou #inputPasswordVoltou').val()
            },
            success: function(data){
                if(data){
                    let objUser={};
                    objUser.first_name = data[0].first_name;
                    objUser.login = data[0].login;
                    // Cria um json a partir do objeto "data"
                    var jsonAux = JSON.stringify(objUser);
                    // "Grava" este json no localStorage
                    localStorage.setItem("previousUser", jsonAux);
                    window.location.reload();
                }else{
                    $('.login-fail').show();
                }
            },
            error: function(jsonAux){
                $('.login-fail').show();
            }
        })
    });

    $('form#esqueci').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'set_reset_password_user',
                'login' : $('form#esqueci #inputUsername2').val()
            },
            success: function(data){
                let email =  $('form#esqueci #inputUsername2').val();
                alert("Um email foi enviado para: "+email);
            },
            error: function(data){
                console.log("error");
            }
        })
    });

    $('form#login-pr').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'login', //calls wp_ajax_nopriv_ajaxlogin
                'username' : $('form#login-pr #inputUsername').val(), 
                'password' : $('form#login-pr #inputPassword').val()
            },
            success: function(data){
                if(data){
                    let objUser={};
                    objUser.first_name = data[0].first_name;
                    objUser.login = data[0].login;
                    // Cria um json a partir do objeto "data"
                    var jsonAux = JSON.stringify(objUser);
                    // "Grava" este json no localStorage
                    localStorage.setItem("previousUser", jsonAux);
                    window.location.reload();
                }else{
                    $('.login-fail').show();
                }
            },
            error: function(jsonAux){
                $('.login-pr-fail').show();
            }
        })
    });
    $('form#voltou-pr').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'login', //calls wp_ajax_nopriv_ajaxlogin
                'username' : $('form#voltou-pr #inputUsernameVoltou-pr').val(), 
                'password' : $('form#voltou-pr #inputPasswordVoltou-pr').val()
            },
            success: function(data){
                if(data){
                    let objUser={};
                    objUser.first_name = data[0].first_name;
                    objUser.login = data[0].login;
                    // Cria um json a partir do objeto "data"
                    var jsonAux = JSON.stringify(objUser);
                    // "Grava" este json no localStorage
                    localStorage.setItem("previousUser", jsonAux);
                    window.location.reload();
                }else{
                    $('.login-fail').show();
                }
            },
            error: function(jsonAux){
                $('.login-fail').show();
            }
        })
    });

    $('form#esqueci-pr').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: url_admin+"admin-ajax.php",
            dataType: 'json',
            data: { 
                'action' : 'set_reset_password_user',
                'login' : $('form#esqueci-pr #inputUsername2').val()
            },
            success: function(data){
                let email =  $('form#esqueci-pr #inputUsername2').val();
                alert("Um email foi enviado para: "+email);
            },
            error: function(data){
                console.log("error");
            }
        })
    });
    
    function logout(){
        history.replaceState("logout", "logout", "?logout=1");
        $.ajax({
            type: "POST",
            url: url_admin+"admin-ajax.php",
            data: "action=logout",
            success: function(retorno){
                url = window.location.href.split('?')[0];
                window.location.href= url;
            },
            error: function(jqXHR, statusTexto, erro){
                console.log(statusTexto.erro);
            }
        });
    }

var $openVideo = $('.js-open-video');
var $backdrop = $(".modal-video");

$openVideo.on('click', function(e){
    e.preventDefault();
    console.log($backdrop);
    var vidId = $(this).data('video');
    $('<iframe id="player-iframe" src="https://www.youtube.com/embed/' + vidId +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" enablejsapi="1" allowfullscreen></iframe>').appendTo($backdrop);
    $backdrop.css("display", "block");
    });
    
    // fecha video
    $backdrop.on('click', function(){
        $('#player-iframe').remove();
        $backdrop.hide();
    });

    //fechar com o esc
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) { 
      $('iframe').remove();
      $backdrop.hide();
    }
};
