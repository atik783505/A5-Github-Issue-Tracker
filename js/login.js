


document.getElementById("login-btn").addEventListener('click', function(){
    const userInput = document.getElementById('user-name').value;
    const passwordInput = document.getElementById('password').value;
    if(userInput==="admin"&&passwordInput==="admin123"){
        alert("login Seccess")
        window.location.assign('home.html')
    }else{
        alert("Login Failed")
        return;
    }
    

})