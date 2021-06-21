$(document).ready(function () {
  let html = "";
  $.when(
    $.ajax({
      url: "https://computerworld.com.br/feed-materiais-gratuitos/?page_number=1&page_total=4",
      type: 'GET',
      dataType: "xml",
      success: function (data) {
        let x = $(data).find('item');
        for (i = 0; i < x.length; i++) {
          let empresa = "";
          if (x[i].getElementsByTagName("empresa")[0] !== undefined) {
            empresa = x[i].getElementsByTagName("empresa")[0].childNodes[0] !== undefined ? '<span class="nome-empresa">' + x[i].getElementsByTagName("empresa")[0].childNodes[0].nodeValue + '</span>' : '';
          }
          html += '<div class="mat-title">' +
            '<a href="' + x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue + '" class="bloco-propaganda" target="_blank">' +
            '<h3 class="titulo">' + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue + '</h3>' +
            empresa +
            '</a>' +
            '</div>'
        }
      }
    })
  ).then(function () {
    $(".controlador-linha .webinars  .conteudo").append(html);
    html = "";
  });
});