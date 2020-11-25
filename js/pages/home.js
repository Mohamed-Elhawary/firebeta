$(document).ready(function () {
    /*Start Load Features, Navbar and Footer (DOM HTML Code)*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer (DOM HTML Code)*/

    // Scroll to specific section smoothly when clicking on a navbar link {Helper Function}
    function scrollTo(element) {
        window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
        });
    }

    /*Start Header*/
    //Make the header has a specific height of the window on resize  
    $(window).on("resize", function() { 
        $(".header").height((70 * $(window).height()) / 100);
    });

    //Changing the background img of the header depending on the current theme color (when clicking on the theme span in the tools bars)
    $(".features").on("click", ".tools-bar .themes span", function() {
        $("header.header").css("background", `url("../../svg/wave-${$(this).data("color")}.svg") no-repeat`);  
    });

    //Changing the background img of the header depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $("header.header").css("background", `url("../../svg/wave-${localStorage.getItem("site-theme-color-name")}.svg") no-repeat`);
    } else {
        $("header.header").css("background", `url("../../svg/wave-orange.svg") no-repeat`);
    }

    //When clicking on the plan-btn button
    $("header.header button.plan-btn").on("click", function(e) {
        e.preventDefault();
        scrollTo(document.querySelector(".plans"));
    });
    /*End Header*/

    /*Start Features Section*/
    //Changing the background img of the features section depending on the current theme color (when clicking on the theme span in the tools bars) 
    $(".features").on("click", ".tools-bar .themes span", function() {
        $(".features").css("background", `url("../../svg/blob-${$(this).data("color")}.svg") no-repeat`);  
    });

    //Changing the background img of the features section depending on the current theme color (when reloading the page)
    if(localStorage.getItem("site-theme-color-name")) {
        $(".features").css("background", `url("../../svg/blob-${localStorage.getItem("site-theme-color-name")}.svg") no-repeat`);
    } else {
        $(".features").css("background", `url("../../svg/blob-orange.svg") no-repeat`);
    }
    /*End Features Section*/

    /*Start Domains Section*/
    /*Start the Select Box Mechanism*/
    var x, i, j, l, ll, selElmnt, a, b, c;
    //Look for any elements with the class "custom-select"
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        //For each element, create a new DIV that will act as the selected item
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        //For each element, create a new DIV that will contain the option list
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        //For each option in the original select element, create a new DIV that will act as an option item
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            //When an item is clicked, update the original select box, and the selected item
            c.addEventListener("click", function() {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        //When the select box is clicked, close any other select boxes, and open/close the current select box
        a.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    $(".select-items div").addClass("theme-bg-hvr");
    //Function that will close all select boxes in the document, except the current select box
    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    //If the user clicks anywhere outside the select box, then close all select boxes
    document.addEventListener("click", closeAllSelect);
    /*End the Select Box Mechanism*/
    /*End Domains Section*/
    
    /*Start Offers Section*/
    /*Start the Offers Counter Mechanism*/
    var counted = 0;
    $(window).scroll(function() {
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (counted == 0 && $(window).scrollTop() > oTop) {
            $('.count').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({countNum: $this.text()}).animate(
                    {countNum: countTo},
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    }
                );
            });
            counted = 1;
        }
    });
    /*End the Offers Counter Mechanism*/
    /*End Offers Section*/
    
    /*Start Customer-Service Section*/
    /*Start the Customer Service Video*/  
    $(".customer-service .spinner").on("click", () => {
        $(".iframe-container").fadeIn(200);
        $("body").getNiceScroll().hide();        
    });

    $(".iframe-container").on("click", () => {
        $(".iframe-container").fadeOut(200);
        $("body").getNiceScroll().show(); 
        $("#ytPlayer")[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');           
    });
    /*End the Customer Service Video*/
    /*End Customer-Service Section*/

    /*Start Special Features for Home Page*/
    /*Start Trigger Loader Feature*/
    $(window).load(function() {
        //Changing the loader color depending on the current theme color (when reloading the page)
        if(localStorage.getItem("site-theme-color-name")) {
            $(".loader.overlay .loader-img img").attr("src", `../../loader/loader-${localStorage.getItem("site-theme-color-name")}.png`);
        }
        
        //FadeOut the loader after 2s from loading the page
        $(".loader.overlay .loader-img img").fadeOut(2000, function () {
            $(".loader.overlay, loader-img").fadeOut(500)
        });
    });
    /*End Trigger Loader Feature*/
    /*End Special Features for Home Page*/
});