
$('#post').click(function(){
    var comment=encodeEntities($("#comment").val());
    var xhr = new XMLHttpRequest();
    var cuser = getCookie('cuser');
    var cpass = getCookie('cpass');
    var cname = getCookie('cname');
    var author = $('#author').text();
    var topic = $('#topic').text();
    
    if(!cuser || !cpass || !cname){
        alert('please login');
    }
    else{
        	if(!comment){
            alert('please input content.');
        }
        else{
            var info = {
                author: author,
                topic: topic,
                cname  : cname,
                comment : comment,
            };
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(JSON.parse(this.responseText).success){
                        window.location.reload();
                        
                    }
                }
            });
            xhr.open("POST", "https://vincent-helloclown.c9users.io:8080/comment");
    	    xhr.setRequestHeader("content-type", "application/json");
    	    xhr.send(JSON.stringify(info));
        }
    }
});

var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    // Match everything outside of normal chars and " (quote character)
    NON_ALPHANUMERIC_REGEXP = /([^\#-~| |!])/g;

function encodeEntities(value) {
  return value.
    replace(/&/g, '&amp;').
    replace(SURROGATE_PAIR_REGEXP, function(value) {
      var hi = value.charCodeAt(0);
      var low = value.charCodeAt(1);
      return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).
    replace(NON_ALPHANUMERIC_REGEXP, function(value) {
      return '&#' + value.charCodeAt(0) + ';';
    }).
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;');
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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

