$(function() {
    //Trigger the Slick Slider
    function slick(sliderName, slidesNums, scrollSlidesNums, speed, autoplay, arrows, infinite, swipe,tabletSlides, tabletScrolls, mobileSlides, mobileScrolls) {
        sliderName.slick({
            cssEase: 'linear',
            slidesToShow: slidesNums,
            slidesToScroll: scrollSlidesNums,
            speed: speed,
            autoplay: autoplay,
            arrows: arrows,
            autoplaySpeed: 0,
            infinite: infinite,
            swipeToSlide: swipe,
            dots: false,
            pauseOnHover: false,
            centerMode: false,
            focusOnSelect: true,
            prevArrow: $('.controls i.fa-chevron-left'),
            nextArrow: $('.controls i.fa-chevron-right'),
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: tabletSlides,
                    slidesToScroll: tabletScrolls
                }
            }, {
            breakpoint: 520,
                settings: {
                    slidesToShow: mobileSlides,
                    slidesToScroll: mobileScrolls
                }
            }]
        });
    
    }
    
    slick($(".logo-carousel.slider"), 6, 1, 3000, true, false, true, false, 4, 1, 2, 1);
    slick($(".domains-carousel.slider"), 5, 1, 3000, true, false, true, false, 4, 1, 3, 1);
    slick($(".tips-carousel.slider"), 3, 3, 0, false, true, true, false, 1, 1, 1, 1);
});
