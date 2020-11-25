$(document).ready(function() {
    /*Start Load Features, Navbar and Footer DOM HTML Code*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer DOM HTML Code*/

    /*Start CMS Part*/
    //Changing the images color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span", function() {
        $(".cms img").each((i, img) => {
            i;
            img.setAttribute("src", `../../images/cms/${img.dataset.cms}-${$(this).data("color")}.png`);
        });  
    });

    //Changing the images color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $(".cms img").each((i, img) => {
            i;
            img.setAttribute("src", `../../images/cms/${img.dataset.cms}-${localStorage.getItem("site-theme-color-name")}.png`);
        }); 
    }
    /*End CMS Part*/
});