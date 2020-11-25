$(document).ready(function() {
    /*Start Load Features, Navbar and Footer (DOM HTML Code)*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer (DOM HTML Code)*/

    /*Start the Prices Part*/
    //Mechanism while Scrolling
    var productsWidth = $(".products").width();
    $(window).scroll(function() {
        if($(window).scrollTop() >= 770 && $(window).scrollTop() <= 1300) {
            $(".table-header").css({
                position: "fixed",
                top: 60,
                width: productsWidth - 20,
                zIndex: "5"
            });
        } else {
            $(".table-header").css({
                position: "static",
                width: "initial",
                zIndex: "initial"
            });
        }
    });

    //Control the mechanism when clicking on anchors in the procuts-cells box*/
    $(".products-cells a").on("click", function() {
        $(".products-cells a").removeClass("active");
        $(this).addClass("active");
        $(".prices .product").fadeOut();
        $(`.prices #${$(this).data("product")}`).fadeIn();
    });
    
    //Control the mechanism when clicking on chevron right & left in Mobile and Tablets screens
    $(".controls i.fa-chevron-right").on("click", function() {
        $(this).parents(".plan-name").parent().fadeOut(10).next().fadeIn().removeClass("visible-md visible-lg");
        $(`.prices #${$(this).parents(".plan-name").data("product")} .${$(this).parents(".plan-name").data("plan")}`).parent().fadeOut(10).next().fadeIn().removeClass("visible-md visible-lg");
    });

    $(".controls i.fa-chevron-left").on("click", function() {
        $(this).parents(".plan-name").parent().fadeOut(10).prev().fadeIn();
        $(`.prices #${$(this).parents(".plan-name").data("product")} .${$(this).parents(".plan-name").data("plan")}`).parent().fadeOut(10).prev().fadeIn();
    });
    /*End Prices Part*/

    /*Start Additional Information Part*/
    //Changing the images color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span" ,function() {
        $(".add-information .img img").attr("src", `../../images/prices/cloud-${$(this).data("color")}.png`);  
    });

    //Changing the images color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $(".add-information .img img").attr("src", `../../images/prices/cloud-${localStorage.getItem("site-theme-color-name")}.png`);
    }
    /*End Additional Information*/
});