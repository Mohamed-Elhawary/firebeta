$(function() {
    //Changing the logo color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $("h1 img").attr("src", `../../loader/loader-${localStorage.getItem("site-theme-color-name")}.png`);
    } else {
        $("h1 img").attr("src", `../../loader/loader-orange.png`);
    }
});