$(function() {
    //Changing the favicon color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span", function() {
        $("link[rel = icon]").attr("href", `favicon/favicon-${$(this).data("color")}.png`);
    });

    //Changing the favicon color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $("link[rel = icon]").attr("href", `favicon/favicon-${localStorage.getItem("site-theme-color-name")}.png`);
    }
});