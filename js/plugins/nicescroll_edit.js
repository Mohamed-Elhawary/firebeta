$(function() {
    //Trigger the Nice Scroll
    $('body').niceScroll({
        cursorcolor: "#ff8b38", //default theme color
        cursorwidth: '14px',        
        zindex: 999,
        horizrailenabled:false
    });

    //Changing the nice scroll background color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span", function() {
        $("html").find(".nicescroll-rails").children("div").css("background-color", $(this).css("background-color"));
    });

    //Changing the nice scroll background color depending on the current theme color (reloading the page) 
    if(localStorage.getItem("site-theme-color")) {
        $("html").find(".nicescroll-rails").children("div").css("background-color", localStorage.getItem("site-theme-color"));
    }
});