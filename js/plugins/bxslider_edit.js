$(function() {
    //Trigger the Bx Slider
    $('.bx-slider').bxSlider({
        minSlides: 1,
        mode: 'horizontal',
        controls: false, //remove the arrows controls of the bxslider, you can show them as you want by set true instead of false.                             
        pager: false, // remove the bullets at the bottom of the bxslider, you can show it as you want by set true instead of false.
        auto:  true,  //allow to start the silder automatically
        breaks: [{screen:0, slides: 1},{screen: 1100, slides:2}]
    });
});