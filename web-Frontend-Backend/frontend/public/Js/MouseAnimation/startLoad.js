function startLoad() {
    MouseAnimation = document.getElementById('MouseAnimation');

    MouseAnimation.style.display = "block"
    //MouseAnimation.classList.add("show");
    document.addEventListener('mousemove', (event) => {
      // Obtén la posición del mouse relativa a la ventana
      const x = event.clientX;
      const y = event.clientY;
  
      // Obtén el desplazamiento de la página
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
  
      
      // Calcula la posición absoluta del mouse
      const absoluteX = x + scrollX + MouseAnimation.clientWidth/4;
      const absoluteY = y + scrollY + MouseAnimation.clientHeight/4;
  
      MouseAnimation.style.left = absoluteX + 'px';
      MouseAnimation.style.top = absoluteY + 'px';
     
    });

  
}