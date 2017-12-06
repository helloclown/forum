$("#div_name").html(`<h1>Welcome ${getCookie('cname')}</h1>`); 

$('#post').click(function(){

    var topic=encodeEntities($("#topic").val());
    var xhr = new XMLHttpRequest();
    var cuser = getCookie('cuser');
    var cpass = getCookie('cpass');
    var cname = getCookie('cname');
    
    var d = new Date();
 
    if(!cuser || !cpass || !cname){
        alert('please login');
    }
    else{
        	if(!topic){
            alert('please input content.');
        }
        else{
            var info = {
                cname  : cname,
                topic : topic,
                date  : d
            };
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(JSON.parse(this.responseText).success){
                        window.location.reload();
                        
                    }
                }
            });
            xhr.open("POST", "https://vincent-helloclown.c9users.io:8080/home");
    	    xhr.setRequestHeader("content-type", "application/json");
    	    xhr.send(JSON.stringify(info));
        }
    }
});

$('#logout').click(function(){
    deleteCookie('cname');
    deleteCookie('cuser');
    deleteCookie('cpass');
    window.location.href = '/';
});

$('.delete').click(function(){
    if($(this).parent().parent().children('td').eq(0).text() == getCookie('cname')){
    fetch('home', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'topic': $(this).parent().parent().children('td').eq(1).text()
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data => {
    window.location.reload();
  });
}
else alert("You cannot delete other's topic");
});

$('.go').click(function(){
    var xhr = new XMLHttpRequest();
    var author = $(this).parent().parent().children('td').eq(0).text();
    var topic = $(this).text();
    $(".go").attr("href","go/"+author+"/"+topic);
  
    xhr.open("get", "https://vincent-helloclown.c9users.io:8080/go/"+author+"/"+topic);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
});

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

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}