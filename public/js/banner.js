
const slidesContainer = document.getElementById("mySlides");
const slide = document.querySelector(".sliderImagen");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
 
nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
 setTimeout(() => nextButton.click(), 3000);

});
 
prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth*5;
 setTimeout(() => prevButton.click(), 15000);

});

 setTimeout(() => nextButton.click(), 3000);
 setTimeout(() => prevButton.click(), 15000);


