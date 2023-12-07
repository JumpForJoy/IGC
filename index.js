const sliderYears = document.getElementById("trigger-slider-years");

sliderYears.addEventListener("input", ({ target }) => {
  console.log(target.value);
});
