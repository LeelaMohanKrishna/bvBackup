document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const dotsContainer = document.querySelector(".dots");
    let slideIndex = 0;
    let autoplayInterval;
    const autoplayDelay = 3000;

    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            slideIndex = index;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlider () {
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        dots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    function nextSlide () {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
    }

    function startAutoplay () {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay () {
        clearInterval(autoplayInterval);
    }

    prevBtn.addEventListener("click", function () {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlider();
        stopAutoplay();
    });

    nextBtn.addEventListener("click", function () {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
        stopAutoplay();
    });

    startAutoplay();
});


document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides-1');
    const prevBtn = document.querySelector('.prev-btn-1');
    const nextBtn = document.querySelector('.next-btn-1');
    const slideWidth = slides.clientWidth;
    const slidesToShow = 3;
    const slideCount = slides.children.length;
    const duplicatedSlidesCount = slidesToShow;
    const totalSlides = slideCount + duplicatedSlidesCount;
    let currentIndex = 0;

    for (let i = 0; i < duplicatedSlidesCount; i++) {
        const cloneSlide = slides.children[i].cloneNode(true);
        slides.appendChild(cloneSlide);
    }

    function goToSlide (index) {
        if (index < 0) {
            index = totalSlides - slidesToShow;
        } else if (index > totalSlides - slidesToShow) {
            index = 0;
        }

        const adjustedIndex = index % slideCount;

        slides.style.transform = `translateX(-${adjustedIndex * (slideWidth / slidesToShow)}px)`;
        currentIndex = index;

        const allSlides = document.querySelectorAll('.slide-1');
        allSlides.forEach(slide => slide.classList.remove('img-scale'));

        const currentSlide = allSlides[adjustedIndex + 1];
        currentSlide.classList.add('img-scale');
    }

    function prevSlide () {
        goToSlide(currentIndex - 1);
    }

    function nextSlide () {
        goToSlide(currentIndex + 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    goToSlide(currentIndex);
});

