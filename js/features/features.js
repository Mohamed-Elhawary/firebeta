$(document).ready(function () {
    /*Start Chat-us Box*/
    $(".features").on("click",".chat-icon", function() {
        if($(this).children().hasClass("fa-comment")) {
            $(this).parent().children(".message-form").fadeIn(400);
        } else {
            $(this).parent().children(".message-form").fadeOut(400);            
        }
        $(this).children().toggleClass("fa-comment fa-times");
    });
    /*End Chat-us Box*/
    
    /*Start To Top Button*/
    //To top button while scrolling
    $(window).scroll(function() {
        if($(window).scrollTop() >= 1000) {
            if($(".features").find(".top-button").is(":hidden")) {
                $(".features").find(".top-button").fadeIn(500);
            }
        } else {
            $(".features").find(".top-button").fadeOut(500);
        }
    });

    //To top button when clicking 
    $(".features").on("click", ".top-button", function(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0}, 600);
    });
    /*End TO Top Button*/
    
    /*Start Tools Bar*/
    //Open tools bar mechanism 
    $(".features").on("click", ".tools-bar .gear", function() {
        var menuBar = $(this).parent(".tools-bar");
        menuBar.toggleClass("expand");
        if(menuBar.hasClass("expand")) {
            menuBar.animate({
                left: 0,
            }, 400);

        } else {
            menuBar.animate({
                left: -(menuBar.outerWidth())
            }, 400);
        }
    });

    //Change theme color mechanism
    $(".features").on("click", ".tools-bar .themes span", function() {
        $("link[href *= -theme]").attr("href", $(this).attr("data-theme"));
        //save the theme choice to the local storage
        localStorage.setItem("site-theme", $(this).attr("data-theme"));
        var color = $(this).css("background-color");
        localStorage.setItem("site-theme-color", color); 
        var colorName = $(this).data("color");
        localStorage.setItem("site-theme-color-name", colorName);         
    });

    //Change theme mode mechanism >> Dark Mode
    $(".features").on("click", ".tools-bar .modes .night i", function() {
        if($("link[href *= -mode]").length == 0) {
            let mode = `<link href="css/themes/dark-mode.css" rel="stylesheet">`;
            $("link[href *= -theme]").after(mode);
            $(".box-for-dark").addClass("dark-box");
            $(".text-for-dark").addClass("dark-color");
            //save dark mode to the local storage
            localStorage.setItem("site-mode", "css/themes/dark-mode.css");
        }
    });

    //Change theme mode mechanism >> Day Mode
    $(".features").on("click", ".tools-bar .modes .day i", function() {
        $("html").find("link[href *= -mode]").remove();
        //remove dark mode from the local storage
        localStorage.removeItem("site-mode");
        $(".box-for-dark").removeClass("dark-box");
        $(".text-for-dark").removeClass("dark-color");
    });

    //Control local storage by getting Theme Color from the local storage if (site-theme) item is existed already in it (when page is reloading).
    if(localStorage.getItem("site-theme")) {
        $("link[href *= -theme]").attr("href", localStorage.getItem("site-theme"));
    }

    //Control local storage by getting Theme Mode from the local storage if (site-mode) item is existed already in it (when page is reloading).
    if(localStorage.getItem("site-mode")) {
        var mode = `<link href="${localStorage.getItem("site-mode")}" rel= "stylesheet">`;
        $("link[href *= -theme]").after(mode);
        $(".box-for-dark").addClass("dark-box");
        $(".text-for-dark").addClass("dark-color");
    } 
    /*End Tools Bar*/   
});