function Paste(event){
    if(FlagCopy){

        rectFramework = frameworkBox.getBoundingClientRect();
        var mouseX = event.clientX - rectFramework.left;
        var mouseY = event.clientY - rectFramework.top;
        console.log("mouseX", mouseX)
        console.log("mouseY", mouseY)
    }



}