$(document).ready(function () {
    $('.sliderContainer').slick({
        centerMode: true,
        slidesToShow: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 1500
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 1
                }
            }]
    });
});

$(document).ready(function () {
    $('.events').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        arrows: false
    });
});

function myFunction () {
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}