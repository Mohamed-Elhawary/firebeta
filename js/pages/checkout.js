$(document).ready(function() {
    /*Start Load Features, Navbar and Footer DOM HTML Code*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer DOM HTML Code*/

    /*Start Steps Part*/
    //Show the purchase-order container when clicking on one of the credit options 
    $(".purchase-method .credit input").on("click", function () {
        if($(".purchase-method .credit input").is(":checked")) {
            $(".purchase-order").slideDown(800);
        }
    });

    //Show the coupon-form when clicking on the coupon anchor 
    $(".purchase-order .purchase-details a.coupon").on("click", function (e) {
        e.preventDefault();
        $(".coupon-form").slideToggle(500);
    });
    /*End Steps Part*/
});