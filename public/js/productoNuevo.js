
window.addEventListener('load', function(){

    let image = document.getElementById("imagenes")
    this.alert("hola", image)
   

    image.addEventListener("change", checkFile);
    
    function checkFile (){
        this.alert("in function", image)

    }


})