// NOTA IMPORTANTE: esse arquivo est? no s3, se for alterado ? preciso subir ele manualmente

this.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest ||
    function(selector) {
        var el = this;
        while (el.matches && !el.matches(selector)) el = el.parentNode;
        return el.matches ? el : null;
    }
}(Element.prototype);

var _form;
var _boxSuccessMsg;
var _btn;
var _timer;
var _doc = this;
var counterId=0;
var xmlHttp;

document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
      var _phoneField = document.getElementById("lista-integracao-telefone");
      if (_phoneField) {
          _phoneField.onkeypress = phoneKeypress;
      }
  }
}

function phoneKeypress (e) {
    var tecla = e.which;
    if (e.target.value.length >= 11) return false;
    if((tecla>47 && tecla<58)) return true;
    else{
        if (tecla==8 || tecla==0) return true;
        else  return false;
    }
}

//AJAX
postRequest = function postRequest(formData, uniqueId, btn, boxSuccessMsg){
    if(!btn) btn=_btn;
    if(!boxSuccessMsg) boxSuccessMsg = _boxSuccessMsg;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', '//optin-emkt.akna.com.br/emkt/listas/index.php', true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(formData);

    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4){
            var msg = JSON.parse(xmlHttp.responseText).message;
            var isError = xmlHttp.status!=200;

            if(!isError){
                var formsIntegracao = document.getElementsByClassName("lista-integracao-form");
                for (var i = 0; i < formsIntegracao.length; i++) {
                    formsIntegracao[i].reset();
                }
            }

            if (msg != null && msg.length > 0){
                requestResponse(isError ? 'status-error' : 'status-success', msg, boxSuccessMsg);
                return;
            }

            requestResponse('status-error','Erro. Tente mais tarde')
        }

        btn.disabled=false;

        clearTimer(uniqueId, boxSuccessMsg);
    }
};

function requestResponse(classAlert,textMessage, boxSuccessMsg, form){
    if(!boxSuccessMsg) boxSuccessMsg = _boxSuccessMsg;
    if(!form) form = _form;

    if(boxSuccessMsg.getAttribute('color')!=null){
        boxSuccessMsg.setAttribute('color', classAlert=='status-error' ? 'red' : 'green');
    }
    else{
        boxSuccessMsg.className = classAlert;

        boxSuccessMsg.style.width = form.getElementsByTagName('button')[0].offsetLeft+form.getElementsByTagName('button')[0].offsetWidth+1;
    }

    boxSuccessMsg.innerHTML = textMessage;
};

function clearTimer(uniqueId, boxSuccessMsg){
    if(uniqueId){
        clearTimeout(_doc["timer"+uniqueId]);
        _doc["timer"+uniqueId] = setInterval(function(){
            requestResponse('', '', boxSuccessMsg);
            clearTimeout(_doc["timer"+uniqueId]);
        }, 7000);
    }else{
        clearTimeout(_timer);
        _timer = setInterval(function(){
            requestResponse('', '');
            clearTimeout(_timer);
        }, 7000);
    }
}

function encontraForm(elem) {
    if (elem.id === 'lista-integracao-form' || elem.tagName.toLowerCase() === 'form') {
        return elem;
    }

    return encontraForm(elem.parentNode);
}

function onSubmitClick(element){
    var canSubmit = true;

    _btn = element;
    _form = encontraForm(_btn);

    if(!_form.uniqueId){
        counterId++;
        _form.uniqueId = counterId;
    }

    clearTimeout(_doc["timer"+_form.uniqueId]);

    var _boxSuccessMsg = _form.querySelector("div[id='lista-integracao-sucessmsg']");
    var _nameField = _form.querySelector("input[id='lista-integracao-nome']");
    var _phoneField = _form.querySelector("input[id='lista-integracao-telefone']");
    var _emailField = _form.querySelector("input[id='lista-integracao-email']");
    var hash = _form.getAttribute("hash");

    _boxSuccessMsg.innerHTML = 'Enviando...';
    if(_boxSuccessMsg.getAttribute('color')!=null)
        _boxSuccessMsg.setAttribute('color', '');

    _boxSuccessMsg.className = '';

    if(_nameField && _nameField.value.trim()=='' && _nameField.hasAttribute('required')){
        requestResponse("status-error", "O campo 'Nome' é obrigatório.", _boxSuccessMsg, _form);

        clearTimer(_form ? _form.uniqueId : null, _boxSuccessMsg);
        canSubmit = false;
    }

    if(_phoneField){
        if(_phoneField.value.trim()=='' && _phoneField.hasAttribute('required')){
            requestResponse("status-error", "O campo 'Celular' é obrigatório.", _boxSuccessMsg, _form);

            clearTimer(_form ? _form.uniqueId : null, _boxSuccessMsg);
            canSubmit = false;
        }

        if(_phoneField.value.trim() !=='' && _phoneField.value.length < 10){
            requestResponse("status-error", "O campo 'Celular' deve ser preenchido com o DDD.", _boxSuccessMsg, _form);

            clearTimer(_form ? _form.uniqueId : null, _boxSuccessMsg);
            canSubmit = false;
        }
    }

    if(_emailField.value.trim()==''){
        requestResponse("status-error", "O campo 'E-mail' é obrigatório.", _boxSuccessMsg, _form);
        clearTimer(_form ? _form.uniqueId : null, _boxSuccessMsg);
        canSubmit = false;
    }

    if (canSubmit) {
        _btn.disabled=true;

        var _formData = "hash="+hash+"&email="+_emailField.value;
        if (_phoneField && _phoneField.value != "") {
            _formData += "&celular="+_phoneField.value;
        }
        if (_nameField && _nameField.value != "") {
            _formData += "&nome="+_nameField.value;
        }
        postRequest(_formData, _form ? _form.uniqueId : null, _btn, _boxSuccessMsg);
    }
}
