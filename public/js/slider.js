// let indexItem = 1;
// unSlider(indexItem);

// function siguiente(n) {
//   unSlider((indexItem += n));
// }

// function currentSlide(n) {
//   unSlider((indexItem = n));
// }
const slidesContainer = document.getElementById("mySlides");
const slide = document.querySelector(".sliderImagen");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
 
nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});
 
prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
 setTimeout(() => nextButton.click(), 5000);

// function unSlider(n) {
//   let i;
//   let x = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot"); //

//   if (n > x.length) {
//     indexItem = 1;
//   }

//   if (n < 1) {
//     indexItem = x.length;
//   }

//   for (i = 0; i < x.length; i++) {
//     x[i].classList.replace("fadein", "fadeout");
//     // x[i].style.display = "none";
//   }
//   //   x[indexItem - 1].style.display = "block";
// //   x[indexItem - 1].style.display = "block";
//   x[indexItem - 1].classList.add("fadein");

//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace("active", "");
//   }

//   dots[indexItem - 1].className += " active";
//   setTimeout(() => siguiente(1), 5000);
// }
