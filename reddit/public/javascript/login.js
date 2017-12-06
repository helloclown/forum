$('#login').click(function(){
    let info = {
        username : encodeEntities($('#username').val()),
        password : encodeEntities($('#password').val())
    };
    if(encodeEntities($('#username').val()) != '' && encodeEntities($('#password').val()) != 0){
    var xhr = new XMLHttpRequest();
   
    xhr.addEventListener("readystatechange", function () {

      if (this.readyState === 4) {
        if(JSON.parse(this.responseText).success) {
              window.location.href="home";
          }
          else 
            alert("You are failed to login");
            
      }
    });
    xhr.open("POST", "https://vincent-helloclown.c9users.io:8080/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(info));
  }
  else{
    alert("please input username/password");
  }
});
