(function ($) {
    "use strict";

    if ($.fn.owlCarousel) {

        $(".slide-top").owlCarousel({
            items: 1,
            loop: true,
            autoplay: false,
            smartSpeed: 800,
            speed: 3000,
            center: true,
            dots: true,
            navText: ["<img src='././images/prev-silde.png'>","<img src='././images/next-slide.png'>"],
            nav:true,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 1,
                },
                992: {
                    items: 1,
                },
            },
        });


         $(".slide-product-1").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            speed: 3000,
            center: true,
            margin:15,
            dots: true,
            responsive: {
                0: {
                    items: 1.5,
                },
                480: {
                    items: 3,
                },
                992: {
                    items: 5,
                },
                 
            },
        });

          $(".slide-product-2").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            speed: 3000,
            center: true,
            margin:15,
            dots: true,
            responsive: {
                0: {
                    items: 1.5,
                },
                480: {
                    items: 3,
                },
                992: {
                    items: 5,
                },
                 
            },
        });

           $(".slide-health").owlCarousel({
            items: 3,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            speed: 3000,
            center: true,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                992: {
                    items: 3,
                },
                 
            },
        });



    }

    // :: 2.0 Slick Active Code
    if ($.fn.slick) {
        $(".slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            arrows: false,
            fade: true,
            asNavFor: ".slider-nav",
        });
        $(".slider-nav").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            asNavFor: ".slider-for",
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            slide: "div",
            autoplay: true,
            centerMode: true,
            centerPadding: "30px",
            mobileFirst: true,
            prevArrow: '<i class="fa fa-angle-left"></i>',
            nextArrow: '<i class="fa fa-angle-right"></i>',
        });
    }

    // :: 3.0 Footer Reveal Active Code
    if ($.fn.footerReveal) {
        $("footer").footerReveal({
            shadow: true,
            shadowOpacity: 0.3,
            zIndex: -101,
        });
    }



    // :: 4.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<img src="./images/back-top.png" alt="" />',
        });
    }

    // :: 5.0 CounterUp Active Code
    if ($.fn.counterUp) {
        $(".counter").counterUp({
            delay: 10,
            time: 2000,
        });
    }

    // :: 6.0 onePageNav Active Code
    if ($.fn.onePageNav) {
        $(".scoll").onePageNav({
            currentClass: "active",
            scrollSpeed: 2000,
            easing: "easeOutQuad",
        });
    }

    
    /*Scroll to top when arrow up clicked BEGIN*/
    $(window).scroll(function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#back2Top').fadeIn();
        } else {
            $('#back2Top').fadeOut();
        }
    });
    $(document).ready(function() {
        $("#back2Top").click(function(event) {
            event.preventDefault();
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

    });
    /*Scroll to top when arrow up clicked END*/

    // :: 7.0 Magnific-popup Video Active Code
    if ($.fn.magnificPopup) {
        $(".video_btn").magnificPopup({
            disableOn: 0,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
        });
    }

    $('a[href="#"]').click(function ($) {
        $.preventDefault();
    });

    var $window = $(window);

    if ($window.width() > 767) {
        new WOW().init();
    }

    // // :: 8.0 Sticky Active Code
    $window.on("scroll", function () {
        if ($window.scrollTop() > 48) {
            $(".header_area").addClass("sticky slideInDown");
        } else {
            $(".header_area").removeClass("sticky slideInDown");
        }
    });

    // :: 9.0 Preloader Active code
    $window.on("load", function () {
        $("#preloader").fadeOut("slow", function () {
            $(this).remove();
        });
    });





})(jQuery);


