const slidesContainer = document.getElementById("mySlides");
const slide = document.querySelector(".bannerImagen");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  if (slidesContainer.scrollLeft >= (slideWidth * 4)) {
    slidesContainer.scrollTo({
      top:0, 
      left: -(slideWidth * 5),
      behavior:"instant"
    })
  }else{

    slidesContainer.scrollLeft += slideWidth;
  }
  setTimeout(() => nextButton.click(), 3000);

});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  // slidesContainer.scrollLeft -= slideWidth * 5;
  slidesContainer.scrollTo({
    top:0, 
    left: -(slideWidth * 5),
    behavior:"instant"
  })
  console.log("-", slideWidth * 5);
  setTimeout(() => prevButton.click(), 15000);
});

setTimeout(() => nextButton.click(), 3000);
