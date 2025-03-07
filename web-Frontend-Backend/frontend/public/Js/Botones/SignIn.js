function SignIn(event) {

    FlagSignIn = !FlagSignIn;
    SignInButtonImage = document.getElementById('SignInButtonImage');
    // Cambio la imagen del boton
    let img = ShowSignInButtonImageOnOff(FlagSignIn).imageUrl
    console.log(img)
    SignInButtonImage.src = img;


    console.log("Sign In")    
}




function ShowSignInButtonImageOnOff(FlagSignIn) {
    return FlagSignIn ? 
        { imageUrl: "Img/Icons/account_circle_w.svg", buttonText:  " Log in " } :
        { imageUrl: "Img/Icons/person_w.svg", buttonText: "  Log out " };
}
