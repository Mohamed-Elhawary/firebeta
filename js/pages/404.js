$(document).ready(function() {
    /*Start Load Features, Navbar and Footer (DOM HTML Code)*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer (DOM HTML Code)*/

    /*Start Error Part*/
    //Changing the images color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span", function() {
        $(".error .msg .msg-img img").attr("src", `../../loader/loader-${$(this).data("color")}.png`);
    });

    //Changing the Fire img color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $(".error .msg .msg-img img").attr("src", `../../loader/loader-${localStorage.getItem("site-theme-color-name")}.png`);
    }
    /*End Error Part*/
});