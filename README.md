# Property Searchr

## Overview

PropertySearchr is a website homepage I created for a fictional domestic property company to demonstrate my ability working with front-end code. The entire project was built with:

- HTML5
- CSS3 / SASS
- Vanilla JavaScript

I wanted to create a clean and modern-looking website homepage that achieved the following goals:

- It makes use of some common key elements used on many modern-day websites.
  - _Such as sliders, transitions, and modal interstitials_.
- It displays correctly across all modern devices, from large 4K desktops to the smallest smartphone screens.
- It follows best practice for performance, scoring above 75 on [Google's PageSpeed Insights test](https://developers.google.com/speed/pagespeed/insights/).

I am currently still working on this project and documenting the main points of interest as development is underway. This is also an opportunity for me to begin writing up ReadMe files in Markdown as previously I haven't done so.

---

## Floating Navigation Menu

### Desktop Version

_A Final Image Will Go Here_

The structure for this nav has been created, however, the current issue I'm facing is achieving the following:

- Having the nav sit near the top of the Homepage Header with adequate margin around it to make it look snug.
- Then, once the user has scrolled, getting the nav to expand its width to encompass the margin and having the nav move up to the top of the viewport.

I've tried a mix of absolute, fixed, and sticky positioning so far to no avail. But I do have some ideas of new things to try and get this to behave the way I want without relying on JavaScript.

### Mobile Version

_A Final Image Will Go Here_

This is still a work in progress.

## Header

_A Final Image Will Go Here_

### Hero Slider

This is a relatively simple image slider comprising of:

- A flex container which does not allow its elements to overflow.
- Multiple images which sit next to each other, with only one out of all the images being visible due to the container's hidden overflow.

JavaScript is used to determine the number of images available to use as slides before cycling through each every 6 seconds. Each image is moved by manipulating its transform property - a translateX percentage value is determined by multiplying the index of the image in the nodelist by 100.

```javascript
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
```

A CSS transition ensures that the images move smoothly over a set period, giving the desired slider effect.

## Sections

With the exception of the header and footer, I opted to structure the page using section blocks which would fit on top of each other and would contain the elements I wanted to show.

The most interesting aspect to note about these generally is that I have used the JavaScript Intersection Observer API to create effects when the user scrolls.

### Opacity Transition

On page load, JavaScript iterates through all sections on the page and sets their opacity to 0. It is done this way so that the sections won't be transparent if the visitor does not have JavaScript enabled.

Once the visitor's viewport intersects 15-20% of the way into the section, the opacity is set to 1 on that section with a transition which makes it visible.

## TranslateY Transition

On page load, each section is moved further down the page by 100px using JavaScript.

Once the visitor's viewport intersects the section by 15-20%, the section is moved back up to its default position again. This gives the visual effect of it moving into the view of the user.

## Highlights Section

_A Final Image Will Go Here_

This section is a simple H2 Header, a tagline, and 4 cards made up of SVGs and span elements.

This is currently made up using FlexBox, however, it was found that these would not line up correctly in 2x2 quadrants when the viewport was decreased. With that in mind, I am going to re-implement this using CSS Grid, then I'll use a media query to switch the grid structure as follows:

- Large Screens : 1 x 4 Grid
- Small Screens : 2 x 2 Grid
- Very Small Screens : 4 x 1 Grid

I also want to write some JavaScript to have the numbers quickly increment up to their default values as they enter the viewport.

## People Section

_A Final Image Will Go Here_

This is a simple section which has an image placed further back in the z-index, with a H2 Header, an unordered list, a span tag, a Postcode input field, and a "Find Agent" button.

The plan is to cycle through a range of different images in the background every so many seconds. The images will likely be not be displayed on very small screens.

## About Section

_A Final Image Will Go Here_

Another simple section with a H2 Header, a tagline, a paragraph, and a button.

This serves as a way to break up the page with a call-to-action.

## Recent Properties Section

_A Final Image Will Go Here_

This was a challenging slider as it required a different approach to the hero slider used in the header. This was because it shows multiple property cards depending on the size of the viewport.

The property cards sit in a carousel container which spans out as far as it needs to host all the property cards. This sits inside another parent container which hides its overflow and resizes with the viewport.

The carousel container is moved 100% of its offsetWidth every time one of the arrow buttons is clicked. This means that if 5 property cards are shown, and the user clicks to go right, those 5 will move left to make room for 5 new property cards.

Looking closer at how this is achieved, the first main part is that the offsetWidth of the parent container is always updated when the viewport is resized. This means we can use this value later when determining how far the slider should move when a button is clicked.

```javascript
window.addEventListener("resize", () => {
  sliderWidth = propertySlider.offsetWidth;
});
```

An event listener is placed on the container hosting both the buttons. Event delegation is used here, so the first if statement is the guard statement.

The two else if statements take the event object's target and compare it with the already defined buttons to determine which button was clicked and therefore which function to call.

```javascript
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

propertySliderBTNContainer.addEventListener("click", slideHandler);
```

Below are the two functions called depending on the button which is clicked. This requires more work before it is finished as currently I need to work out the logic to determine when to stop allowing movement in a particular direction.

An index value which begins at 0 is used to determine if movement in a particular direction is allowed or not. If the move is acceptable, the index value is incremented or decremented to keep track of what the slider is currently showing.

Lastly, a function is called to move the slider and it is passed an argument depending on which direction it needs to go.

```javascript
const nextSlide = function () {
  if (false /*index*/) {
    return;
  } else {
    index++;
  }
  goToSlide(index, "next");
};

const prevSlide = function () {
  if (false /*index === 0*/) {
    return;
  } else {
    index--;
  }
  goToSlide(index, "prev");
};
```

This final function takes the direction it has been given and manipulates the transform value of the property slider carousel container. The translateX value is given in pixels as it purely depends on how wide the carousel container is at any given point.

The index is used here to determine how many times the carousel container should move its own length in a particular direction. For example, if we want to show the third section of the carousel container, this will be the third index, so the carousel container should move its own length multiplied by 3 to reach the third section.

```javascript
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
```

This code will likely be tweaked and refactored as the project reaches its final stages.

## Join Us Section

_A Final Image Will Go Here_

A box with multiple overlapping elements was created for this section using CSS Grid and use of the z-index property. The elements included spans, images, and buttons.

The image was filtered to look grayscale and was placed at the back of the z-index. It took up most of the grid space to act as a background image.

The span and button elements were arranged in different places to the left and bottom of the box - with some parts overlapping the image itself.

The end result is a clean and modern box widget which could be placed anywhere on other pages to act as a call-to-action.

Some of the span elements on the left side may need to be hidden at very small screen sizes - but this will require further investigation later on.

## Testimonials Section

_A Final Image Will Go Here_

This section features another slider design which will allow the user to click-through different testimonial cards by interacting with dot buttons at the bottom of the slider. These dots will also act as a way to communicate how many testimonials there are and which testimonial the user is currently viewing out of the multiple choices.

Below will cover the JavaScript used for this, which will likely re-use a lot of the functionality of the header hero slider but with some additions:

```javascript
// JS code will go here
```

The background is a simple grayscale image which has been set to cover the entire section container.

## Footer

The footer is still a work in progress.

# Conclusion

I'll write a full conclusion which summarises the project as a whole once it is completely finished. This will cover the main strengths, what didn't work, how these obstacles were overcome, and what I would do differently next time.

I also want to stress that the reasons this ReadMe is so long and verbose are because:

- I'm using this as a way to reinforce the skills I've gained and used building this project, especially so I can revisit this later.
- I want to use this as a way to demonstrate my knowledge of the HTML, CSS/SASS, and JavaScript as a portfolio project.
- I want to get comfortable writing in Markdown (This is my first proper ReadMe).

I hope you find this breakdown of the PropertySearchr project useful. I'll keep it updated as the project reaches its final stages.
