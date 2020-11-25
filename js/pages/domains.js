$(document).ready(function() {
    /*Start Load Features, Navbar and Footer DOM HTML Code*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer DOM HTML Code*/

    // Scroll to specific section smoothly when clicking on a navbar link {Helper Function}
    function scrollTo(element) {
        window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
        });
    }

    /*Start Tabs and Contents Part*/
    $(".tabs .tab:first-child").addClass("active theme-bg white-color").removeClass("theme-color");
    $(".tabs .tab").on("click", function() {
        $(this).addClass("active theme-bg white-color").removeClass("theme-color").siblings().removeClass("active theme-bg white-color").addClass("theme-color");
        $(".contents > div").hide();
        $("." + $(this).data("content")).fadeIn(600);
    });
    /*End Tabs and Contents Part*/

    /*Start Domain AD1, AD2, AD3 & AD4 Parts*/
    //Changing the images color depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span" ,function() {
        $(".domain-ad1 .img img").attr("src", `../../images/domains/domain-ad1-${$(this).data("color")}.png`);  
        $(".domain-ad2 .img img").attr("src", `../../images/domains/domain-ad2-${$(this).data("color")}.png`);  
        $(".domain-ad3 .img img").attr("src", `../../images/domains/domain-ad3-${$(this).data("color")}.png`);  
        $(".domain-ad4 .img img").attr("src", `../../images/domains/domain-ad4-${$(this).data("color")}.png`);  
    });

    //Changing the images color depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $(".domain-ad1 .img img").attr("src", `../../images/domains/domain-ad1-${localStorage.getItem("site-theme-color-name")}.png`);
        $(".domain-ad2 .img img").attr("src", `../../images/domains/domain-ad2-${localStorage.getItem("site-theme-color-name")}.png`);
        $(".domain-ad3 .img img").attr("src", `../../images/domains/domain-ad3-${localStorage.getItem("site-theme-color-name")}.png`);
        $(".domain-ad4 .img img").attr("src", `../../images/domains/domain-ad4-${localStorage.getItem("site-theme-color-name")}.png`);
    }
    
    //When clicking on the anchor in the domain-ad3 part
    $(".domain-ad3 a").on("click", function(e) {
        e.preventDefault();
        scrollTo(document.getElementById("transfer"));
    });
    /*End Domain AD1, AD2, AD3 & AD4 Parts*/

    /*Start Domain-Transfer Part*/
    //When clicking on the anchor in the domain-transfer part
    $(".domain-transfer a").on("click", function(e) {
        e.preventDefault();
        scrollTo(document.getElementById("checker"));
    });
    /*End Domain-Transfer Part*/
});