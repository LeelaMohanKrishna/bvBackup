$(document).ready(function () {
    $('.sliderContainer').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }]
    });

    $('.events').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: false,
        fade: true,
    });

    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        const cross = document.getElementById("cross");
        const menu = document.getElementById("icon");
        const x = document.getElementById("myLinks");
        const nav = document.getElementById("nav");

        if (scroll) {
            $("#sticky-header").addClass("bg-scroll");
            $("#sticky-content").addClass("bg-content-scroll")
        } else if (window.innerWidth > 1023) {
            $("#sticky-header").removeClass("bg-scroll");
            $("#sticky-content").removeClass("bg-content-scroll")
            x.style.display = "none";
            cross.style.display = "none";
            menu.style.display = "block";
            nav.style.height = "auto"
        } else if (!scroll && x.style.display === 'none') {
            $("#sticky-header").removeClass("bg-scroll");
            $("#sticky-content").removeClass("bg-content-scroll")
        }
    });
});

function myFunction () {
    let scroll = $(window).scrollTop();
    const x = document.getElementById("myLinks");
    const cross = document.getElementById("cross");
    const menu = document.getElementById("icon");
    const nav = document.getElementById("nav");
    if (x.style.display === "block") {
        nav.style.height = "auto"
        x.style.display = "none";
        cross.style.display = "none";
        menu.style.display = "block";
        if (!scroll) {
            $("#sticky-header").removeClass("bg-scroll");
            $("#sticky-content").removeClass("bg-content-scroll")
        }
    } else {
        x.style.display = "block";
        cross.style.display = "block";
        menu.style.display = "none";
        nav.style.height = "100vh"
        $("#sticky-header").addClass("bg-scroll");
    }
}



