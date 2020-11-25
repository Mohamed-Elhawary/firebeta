$(document).ready(function() {
    /*Start Customize the Navbar*/
    //Make the active link of the navbar has the theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span" ,function() {
        $(".navbar .navbar-nav > li.active").find("a").css("color", $(this).css("background-color"));  
    });

    //Check the active link of the navbar & make it has the theme color (when reloading the page or opening the website for the first time) 
    $(window).on("load", function() {
        var pathName             = window.location.pathname,
            pageNameWithHtml     = pathName.split("/").pop(),
            pageNameWithoutHtml  = pageNameWithHtml.slice(0, -5);
        
        //console.log(pageNameWithoutHtml);
        //Detecting the active link in the navbar by detecting the opened url page after reloading
        if(pageNameWithoutHtml == "index" || pageNameWithoutHtml == "domains" || pageNameWithoutHtml == "prices" || pageNameWithoutHtml == "about") {
            $(`li[data-link= ${pageNameWithoutHtml}]`).addClass("active");
        } else if(pageNameWithoutHtml == "") {
            $("li[data-link= 'index'").addClass("active");
        }

        //Change the color of the active link with the theme color if (site-theme-color) item is existed in local storage
        if(localStorage.getItem("site-theme-color")) { 
            $(".navbar .navbar-nav > li.active").find("a").css("color", localStorage.getItem("site-theme-color"));            
        
        //Change the color of the active link with the default theme color if (site-theme-color) item isn't existed in local storage    
        } else { 
            $(".navbar .navbar-nav > li.active").find("a").css("color", "#ff8b38");
        }
    });

    //Remove and add class theme-color from the link of the dorpdown list in case of this list has class (open) or not
    $("body").on("click", ".navbar .navbar-nav > li.dropdown", function() {
        if($(this).hasClass("open")) {
            $(this).find("a.dropdown-toggle").removeClass("theme-color");
        } else {
            $(this).find("a.dropdown-toggle").addClass("theme-color");
            $(this).siblings().find("a.dropdown-toggle").removeClass("theme-color");
        }
    });

    //Remove class theme-color from the link of the opened dropdown list in case of clicking on any where in the body 
    $("body").on("click", function() {
        $(".navbar .navbar-nav > li.dropdown.open").find("a.dropdown-toggle").removeClass("theme-color");
    });

    //Remove class theme-color-hvr from the link of the dropdown list in case of mobile screen mode
    $(window).on("load", function() {
        if (screen.width < 768 && window.innerHeight > window.innerWidth) {
            $(".navbar .navbar-nav > li.dropdown").find("a.dropdown-toggle").removeClass("theme-color-hvr");
        }
    });
    /*End Customize the Navbar*/
});