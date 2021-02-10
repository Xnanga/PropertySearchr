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

  const propertySlider = document.querySelector(".property-slider");
  const propertySliderLeftBtn = document.querySelector(
    ".property-slider__btn--left"
  );
  const propertySliderRightBtn = document.querySelector(
    ".property-slider__btn--right"
  );

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

  // Property Objects

  function Property(
    status,
    address,
    jpegImage,
    webpImage,
    bathrooms,
    bedrooms,
    price,
    type
  ) {
    (this.status = status),
      (this.address = address),
      (this.jpegImage = jpegImage),
      (this.webpImage = webpImage),
      (this.bathrooms = bathrooms),
      (this.bedrooms = bedrooms),
      (this.price = price),
      (this.type = type);
  }

  const propertyOne = new Property(
    "For Sale",
    "Brunswick St, Glasgow",
    "images/homepage/property-slide-1.jpg",
    "webp/property-slide-1.webp",
    1,
    2,
    "£120,000 Offers Over",
    "Apartment"
  );

  const propertyTwo = new Property(
    "For Let",
    "Loch Gardens, Livingston",
    "images/homepage/property-slide-2.jpg",
    "webp/property-slide-2.webp",
    2,
    1,
    "£900 PCM",
    "Semi-Detached"
  );

  const propertyThree = new Property(
    "For Sale",
    "Newton Terrace, Edinburgh",
    "images/homepage/property-slide-3.jpg",
    "webp/property-slide-3.webp",
    2,
    3,
    "£330,000 Offers Over",
    "Bungalow"
  );

  const propertyFour = new Property(
    "For Sale",
    "Foresthill Acre, Gretna",
    "images/homepage/property-slide-4.jpg",
    "webp/property-slide-4.webp",
    1,
    3,
    "£130,000 Offers Over",
    "Apartment"
  );

  const propertyFive = new Property(
    "For Let",
    "Cooper Street, Aberdeen",
    "images/homepage/property-slide-5.jpg",
    "webp/property-slide-5.webp",
    2,
    4,
    "£1500 PCM",
    "Apartment"
  );

  const propertySix = new Property(
    "For Let",
    "Yeardley Place, Glasgow",
    "images/homepage/property-slide-6.jpg",
    "webp/property-slide-6.webp",
    2,
    3,
    "£2200 PCM",
    "Penthouse"
  );

  // Init Function

  const init = function () {
    removeNoJS();
    resizingHomepageHeader();
    resizingNav();
    homepageSlider();
    propertySliderPopulate();
    propertySliderMovement();
    testimonialsSlider();
    manageTabs("1");
    hideSections();
    hideTestimonials();

    tabs[0].classList.add("search__option-tab--active");
    searchOptions.addEventListener("click", switchTabs);
  };

  // Remove no-js Class

  const removeNoJS = function () {
    const allElements = document.querySelectorAll(".no-js");

    for (i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove("no-js");
    }
  };

  // Test if Device is Mobile

  const testMobile = function () {
    let isMobile;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    return isMobile;
  };

  const isMobile = testMobile();

  // Generate Random Numbers Between Ranges

  const generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

  // Resize Homepage Header on Mobile to Work with Screen Keyboards

  const resizingHomepageHeader = function () {
    if (isMobile === true) {
      homepageHeader.style.height = `${homepageHeader.height}px`;
    }
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

  // Property Card Slider (Limit of 18 Items)

  const propertySliderPopulate = function () {
    const allProperties = [
      propertyOne,
      propertyTwo,
      propertyThree,
      propertyFour,
      propertyFive,
      propertySix,
    ];

    for (i = 1; i <= 18; i++) {
      let propertyNum = generateRandomNumber(0, 5);
      propertySliderContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="property-card">
      <div class="property-card__img-container">
  
        <picture class="property-card__img">
          <source srcset="${allProperties[propertyNum].webpImage}" type="image/webp">
          <source srcset="${allProperties[propertyNum].jpegImage}" type="image/jpeg"> 
          <img src="${allProperties[propertyNum].jpegImage}" class="property-card__img" alt="Property Card Image ${propertyNum}" height="200" width="310" loading="lazy">
        </picture>
  
  
        <div class="property-card__rooms-container">
          <img class="property-card__icon" src="SVG/bed.svg" alt="Bed Icon" />
          <img class="property-card__icon" src="SVG/bath.svg" alt="Bath Icon" />
          <span class="property-card__number">${allProperties[propertyNum].bedrooms}</span>
          <span class="property-card__number">${allProperties[propertyNum].bathrooms}</span>
        </div>
      </div>
      <div class="property-card__info">
        <span class="span-text">${allProperties[propertyNum].bedrooms} Bed ${allProperties[propertyNum].type}</span>
        <span class="property-status-text">${allProperties[propertyNum].status}</span>
        <span class="span-text"
          ><strong>${allProperties[propertyNum].address}</strong></span
        >
        <span class="span-text">${allProperties[propertyNum].price}</span>
      </div>
      <div class="property-card__action-bar">
        <div class="property-card__action-bar__icon">
          <img class="property-card__icon" src="SVG/heart.svg" alt="Heart Icon" />
        </div>
        <div class="property-card__action-bar__more-details">
          MORE DETAILS >
        </div>
      </div>
    </div>`
      );
    }
  };

  const propertySliderMovement = function () {
    let index = 0;
    let sliderWidth = propertySlider.offsetWidth;

    const computeMaxIndex = function (visibleSlides) {
      if (visibleSlides === 1) return 17;
      if (visibleSlides === 2) return 8;
      if (visibleSlides === 3) return 5;
      if (visibleSlides === 4) return 4;
      if (visibleSlides === 6) return 2;
    };

    let maxIndex = computeMaxIndex(determineMaxSlide());

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
    };

    const prevSlide = function () {
      if (index === 0) {
        return;
      } else {
        index--;
      }
      goToSlide(index, "prev");
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

    window.addEventListener("resize", function () {
      maxIndex = computeMaxIndex(determineMaxSlide());
      index = 0;
      propertySliderContainer.style.transform = `translateX(0)`;
    });
  };

  // Determine Max Slide Index for Property Slider

  const determineMaxSlide = function () {
    const viewportBreakpoints = [500, 650, 800, 1000, 1100, 1400, 1800];
    const currentWindowWidth = window.innerWidth;

    if (currentWindowWidth <= viewportBreakpoints[2]) return 1;
    if (currentWindowWidth <= viewportBreakpoints[3]) return 2;
    if (currentWindowWidth <= viewportBreakpoints[5]) return 3;
    if (currentWindowWidth <= viewportBreakpoints[6]) return 4;
    if (currentWindowWidth >= viewportBreakpoints[6]) return 6;
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
