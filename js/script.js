"use: strict";

const homepage = function () {
  // DOM Variables

  const pageContainer = document.querySelector(".page-container");

  const tabs = document.querySelectorAll(".search__option-tab");
  const searchOptions = document.querySelector(".search__options");
  const propertySearchWidget = document.querySelector(
    ".search__widget__property"
  );
  const agentSearchWidget = document.querySelector(".search__widget__agent");
  const navContainer = document.querySelector(".nav-container");
  const homepageHeader = document.querySelector(".homepage-header");

  const mobileNavButton = document.querySelector(".nav__menu__button--mobile");
  const mobileNavDrawer = document.querySelector(".mobile-nav");

  const allSections = document.querySelectorAll("section");
  const highlightsSection = document.querySelector(".highlights-section");

  const propertySlider = document.querySelector(".property-slider");
  const propertySliderLeftBtn = document.querySelector(
    ".property-slider__btn--left"
  );
  const propertySliderRightBtn = document.querySelector(
    ".property-slider__btn--right"
  );
  const propertySliderCards = document.querySelectorAll(".property-card");
  const propertySliderContainer = document.querySelector(
    ".property-slider__container"
  );
  const propertySliderBTNContainer = document.querySelector(
    ".property-slider__btn-container"
  );

  const allTestimonials = document.querySelectorAll(
    ".testimonials-slider__content"
  );
  const testimonialsDotContainer = document.querySelector(
    ".testimonials-slider__dots"
  );

  // Init Function

  const init = function () {
    resizingNav();
    homepageSlider();
    propertySliderMovement();
    testimonialsSlider();
    manageTabs("1");
    hideSections();
    hideTestimonials();

    tabs[0].classList.add("search__option-tab--active");
    searchOptions.addEventListener("click", switchTabs);
  };

  // Resize Nav on Scroll

  const resizingNav = function () {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset >= 40) {
        navContainer.classList.add("nav-container--scrolled");
      } else {
        navContainer.classList.remove("nav-container--scrolled");
      }
    });
  };

  // Reveal & Remove Mobile Nav

  const handleMobileNav = function (e) {
    const clickedElement = e.target;
    const isClickInside = mobileNavDrawer.contains(clickedElement);

    if (clickedElement === mobileNavButton) {
      mobileNavDrawer.classList.add("mobile-nav--active");
    } else if (!isClickInside) {
      mobileNavDrawer.classList.remove("mobile-nav--active");
    }
  };

  mobileNavButton.addEventListener("click", handleMobileNav);
  pageContainer.addEventListener("click", handleMobileNav);

  // Section Reveal on Scroll

  const hideSections = function () {
    if (window.pageYOffset > 40) {
      return;
    } else {
      allSections.forEach((section) =>
        section.classList.add("transparent", "move-down")
      );
    }
  };

  const revealSection = function (entries) {
    const [entry] = entries;

    if (entry.isIntersecting) {
      const intersectingSection = entry.target;
      intersectingSection.classList.remove("transparent", "move-down");
      sectionObserver.unobserve(intersectingSection);
    }
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach((section) => sectionObserver.observe(section));

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

  // Property Card Slider

  const propertySliderMovement = function () {
    let index = 0;
    let sliderWidth = propertySlider.offsetWidth;
    let sliderWidthPerCard = sliderWidth / propertySliderCards.length;

    // Returns how many groups of property cards there should be visible (Doesn't work)
    let maxIndex = sliderWidthPerCard / 20.49 - 2;

    // Could the intersectionObserver API be used to count how many cards are visible
    // then determine the maxIndex through propertySliderCards.length / number of visible cards?

    window.addEventListener("resize", () => {
      sliderWidth = propertySlider.offsetWidth;
    });

    const goToSlide = function (slide, direction) {
      if (direction === "next") {
        propertySliderContainer.style.transform = `translateX(-${
          index * sliderWidth
        }px)`;
      } else if (direction === "prev") {
        propertySliderContainer.style.transform = `translateX(-${
          index * sliderWidth
        }px)`;
      }
    };

    const nextSlide = function () {
      if (index >= maxIndex) {
        return;
      } else {
        index++;
      }
      goToSlide(index, "next");
      console.log(`Index: ${index}`);
    };

    const prevSlide = function () {
      if (index === 0) {
        return;
      } else {
        index--;
      }
      goToSlide(index, "prev");
      console.log(`Index: ${index}`);
    };

    const slideHandler = function (direction) {
      const buttonPressed = direction.target;
      if (buttonPressed === propertySliderBTNContainer) {
        return;
      } else if (buttonPressed === propertySliderLeftBtn) {
        prevSlide();
      } else if (buttonPressed === propertySliderRightBtn) {
        nextSlide();
      }
    };

    propertySliderBTNContainer.addEventListener("click", slideHandler, {
      passive: true,
    });
    propertySliderBTNContainer.addEventListener("touchstart", slideHandler, {
      passive: true,
    });
  };

  // Hide Testimonials on Load (Except First)

  const hideTestimonials = function () {
    allTestimonials.forEach((testimonial) =>
      testimonial.classList.add("testimonials-slider__content--hidden")
    );

    allTestimonials[0].classList.remove("testimonials-slider__content--hidden");
  };

  // Testimonials Slider

  const testimonialsSlider = function () {
    const dotHTML = `<div class="testimonials-slider__single-dot"></div>`;
    let allDots;

    const createDots = function () {
      allTestimonials.forEach(function () {
        testimonialsDotContainer.insertAdjacentHTML("beforeend", dotHTML);
        allDots = document.querySelectorAll(".testimonials-slider__single-dot");
      });

      allDots[0].classList.add("testimonials-slider__single-dot--active");
    };

    createDots();

    const dotSelector = function (e) {
      const allDotsArr = [...allDots];
      const clickedDot = e.target;
      const dotNumber = allDotsArr.indexOf(clickedDot);

      if (clickedDot === testimonialsDotContainer) return;

      switchTestimonials(dotNumber);
      switchDots(dotNumber);
    };

    const switchTestimonials = function (dotNumber) {
      allTestimonials.forEach((testimonial) =>
        testimonial.classList.add("testimonials-slider__content--hidden")
      );
      allTestimonials[dotNumber].classList.remove(
        "testimonials-slider__content--hidden"
      );
    };

    const switchDots = function (dotNumber) {
      allDots.forEach((dot) =>
        dot.classList.remove("testimonials-slider__single-dot--active")
      );

      allDots[dotNumber].classList.add(
        "testimonials-slider__single-dot--active"
      );
    };

    testimonialsDotContainer.addEventListener("click", dotSelector);
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

  init();
};

homepage();
