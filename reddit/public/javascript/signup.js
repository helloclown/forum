$('#submit').click(function(){
    let info = {
        name     : encodeEntities($('#name').val()),
        username : encodeEntities($('#username').val()),
        password : encodeEntities($('#password').val())
    };
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if(!JSON.parse(this.responseText).success) {
          alert("You are failed to signup");
        }
        else{
          window.location.href = '/';
        }
      }
    });
    xhr.open("POST", "https://vincent-helloclown.c9users.io:8080/signup");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(info));

});