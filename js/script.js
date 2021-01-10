"use: strict";

// Global DOM Variables

const tabs = document.querySelectorAll(".search__option-tab");
const searchOptions = document.querySelector(".search__options");
const propertySearchWidget = document.querySelector(
  ".search__widget__property"
);
const agentSearchWidget = document.querySelector(".search__widget__agent");

// Init

const init = function () {
  // Functions on Page Load
  homepageSlider();
  manageTabs("1");

  // Set Elements on Page Load
  tabs[0].classList.add("search__option-tab--active");
};

// Homepage Hero Image Slider

const homepageSlider = function () {
  const homepageHeroSlides = document.querySelectorAll(
    ".homepage-header__slide"
  );

  let currentSlide = 0;
  const maxSlide = homepageHeroSlides.length;

  const goToSlide = function (slide) {
    homepageHeroSlides.forEach(function (s, i) {
      s.style.transform = `translateX(-${100 * slide}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };

  const slideTimer = setInterval(nextSlide, 6000);
};

// Homepage Header Tabs

const switchTabs = function (e) {
  const activeTab = e.target;

  if (activeTab === searchOptions) return;

  tabs.forEach((el) => el.classList.remove("search__option-tab--active"));
  activeTab.classList.add("search__option-tab--active");
  manageTabs(activeTab.dataset.tabs);
};

const manageTabs = function (tabNum) {
  if (tabNum === "1") {
    propertySearchWidget.style.display = "flex";
    agentSearchWidget.style.display = "none";
  } else if (tabNum === "2") {
    propertySearchWidget.style.display = "none";
    agentSearchWidget.style.display = "flex";
  }
};

// Event Listeners

searchOptions.addEventListener("click", switchTabs);

// Initialisation

init();
