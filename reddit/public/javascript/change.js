$('#change').click(function(){

    if(encodeEntities($('#username').val()) != '' && encodeEntities($('#newpassword').val()) != 0){

       let info = {
        username : encodeEntities($('#username').val()),
        newpassword : encodeEntities($('#newpassword').val())
        };
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          if(JSON.parse(this.responseText).success) {

               window.location.href = '/';
          }
          else 
            alert("You failed to change password");
            
          }
      });
      xhr.open("POST", "https://vincent-helloclown.c9users.io:8080/change");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(info));
    }
    else alert('please input username/password!');

});