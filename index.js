// Sliders logic
const slider = document.getElementById("slider");
const scrollbar = document.getElementById("slider-scroll");
const scrollbarWrapper = document.querySelector(".timeline_follow_wrapper");
const sliderTrigger = document.getElementById("slider-trigger");

const sliderWidth = slider.offsetWidth;
const scrollbarWidth = scrollbar.offsetWidth;
const yearWidth = document.querySelector(".timeline_bar span").offsetWidth;

const yearWidthPercentage = (yearWidth * 100) / scrollbarWidth;
const maxOffset = 100 - yearWidthPercentage;

let doDragScrollbar = false;
let doDragSlider = false;

let offsetInitial = 0;
let cssOffset = 0;

let move = 0;

window.addEventListener("load", () => {
  slider.style.marginLeft = `calc(50% - ${
    document.querySelector(".timeline_slider .timeline_slide:first-child")
      .offsetWidth / 2
  }px)`;
});

const startMove = (event) => {
  doDragScrollbar = true;
  offsetInitial = event.clientX || event.touches[0].clientX;
};
const startMoveSlider = (event) => {
  doDragSlider = true;
  offsetInitial = event.clientX || event.touches[0].clientX;
};
const doMove = (event) => {
  if (doDragScrollbar) {
    const offset =
      cssOffset +
      (((event.clientX || event.touches[0].clientX) - offsetInitial) * 100) /
        scrollbarWidth;

    move = offset > maxOffset ? maxOffset : offset < 0 ? 0 : offset;
    slider.style.transform = `translateX(${-move}%)`;
    scrollbarWrapper.style.transform = `translateX(${move}%)`;
  } else if (doDragSlider) {
    const offset =
      -cssOffset +
      (((event.clientX || event.touches[0].clientX) - offsetInitial) * 100) /
        sliderWidth;

    move = offset < -maxOffset ? -maxOffset : offset > 0 ? 0 : offset;

    slider.classList.add("no-click");
    slider.style.transform = `translateX(${move}%)`;
    scrollbarWrapper.style.transform = `translateX(${-move}%)`;
  }
};
const endMove = () => {
  if (doDragScrollbar || doDragSlider) {
    cssOffset = Math.abs(move);
    doDragScrollbar = false;
    doDragSlider = false;

    setTimeout(() => {
      slider.classList.remove("no-click");
    }, 300);
  }
};

sliderTrigger.addEventListener("mousedown", startMove);
sliderTrigger.addEventListener("touchstart", startMove);

slider.addEventListener("mousedown", startMoveSlider);
slider.addEventListener("touchstart", startMoveSlider);

window.addEventListener("mousemove", doMove);
sliderTrigger.addEventListener("touchmove", doMove);
slider.addEventListener("touchmove", doMove);

window.addEventListener("mouseup", endMove);
sliderTrigger.addEventListener("touchend", endMove);
slider.addEventListener("touchend", endMove);

// Popup logic
const popupTriggers = document.querySelectorAll("[data-popup]");
popupTriggers.forEach((popupTrigger) => {
  const data = popupTrigger.dataset.popup;

  popupTrigger.addEventListener("click", () => {
    if (!slider.classList.contains("no-click")) {
      const popup = document.getElementById(data);

      popup.classList.add("visible");
    }
  });
});

const popupClose = document.querySelector(".popup_close");
popupClose.addEventListener("click", () => {
  document.querySelector(".popup.visible").classList.remove("visible");
});
