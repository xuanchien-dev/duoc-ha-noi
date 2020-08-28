// header
// var inputSearch = $('#input-main');
// inputSearch.keyup(function () {
//     var iconCloseSearch = $('#close-icon');
//     var suggest = $('.lch-search-suggestion');
//     if ($(this).val() == "") {
//         iconCloseSearch.hide();
//         suggest.hide();
//     } else {
//         iconCloseSearch.show();
//         suggest.show();
//         iconCloseSearch.click(function () {
//             $(this).hide();
//             suggest.hide();
//             inputSearch.val('').focus();
//         });
//     }
// });


$('body').on('click', function () {
    $('.lc-form-search-suggest').removeClass('show');
});


//search input dropdown
function checkForInput(element) {
    const $span = $(element).next();
    var iconTime = $span.children('.fa-times');
    // for next parent element
    var boxList = $(element).parent().next();
    var iconX = '<i class="fas fa-times"></i>';
    var iconS = '<i class="fas fa-search"></i>';
    let value = true;
    if ($(element).val().length > 0) {
        $span.attr("data-show", value);
        $span.html(iconX);
        $span.click(function (e) {
            e.preventDefault();
            $(element).val('');
            $span.attr("data-show", !value);
            $span.html(iconS);
            boxList.removeClass('show');
        });

    } else {
        $span.html(iconS);
        $span.attr("data-show", !value);
    }
}
function checkValueInput(element) {
    const $span = $(element).next();
    var boxList = $(element).parent().next();
    if ($span.attr('data-show') == 'true') {
        boxList.addClass('show');
    } else
        boxList.removeClass('show');
}
$('.lc-form-search-input input').each(function () {
    checkForInput(this);
    checkValueInput(this);
});

$('.lc-form-search-input input').keyup(function () {
    checkForInput(this);
    checkValueInput(this);
});

// dropdown select
function myFunction(id) {
    document.getElementById(id).classList.toggle("show-expand");
}
var buttons = document.getElementsByClassName('dropdown-btn');
var contents = document.getElementsByClassName('dropdown-content');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
        event.stopPropagation();
        var id = this.value;
        for (var i = 0; i < contents.length; i++) {
            contents[i].classList.remove("show-expand");
        }
        myFunction(id);
    });
}
window.addEventListener("click", function () {
    if (!event.target.matches('.dropdown-btn')) {
        for (var i = 0; i < contents.length; i++) {
            contents[i].classList.remove("show-expand");
        }
    }
});

// dropdown select tag
$('select.cs-select-js').each(function () {
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('cs-select-hidden');
    $this.wrap('<div class="cs-select"></div>');
    $this.after('<div class="cs-select-styled"></div>');

    var $styledSelect = $this.next('div.cs-select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'cs-select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.cs-select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.cs-select-options').hide();
        });
        $(this).toggleClass('active').next('ul.cs-select-options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

// button +/- 

// set disable when type number by hand
$('#number').on('input', function () {
    var value = parseInt($(this).val());
    if (value == 1) {
        $('#decrease').addClass('disable');
        $('#increase').removeClass('disable');
    } else if (value == 999) {
        $('#increase').addClass('disable');
        $('#decrease').removeClass('disable');
    } else {
        $('#decrease').removeClass('disable');
        $('#increase').removeClass('disable');
    }

});

// set disable for per click
$('#decrease').click(function () {
    decreaseValue();
    var value = $('#number').val();
    if (value >= 999) {
        $('#increase').addClass('disable');
    } else {
        $('#increase').removeClass('disable');
    }
    if (value == 1) {
        $('#decrease').addClass('disable');
    }
});
$('#increase').click(function () {
    increaseValue();
    var value = $('#number').val();
    if (value <= 1) {
        $('#decrease').addClass('disable');
    } else {
        $('#decrease').removeClass('disable');
    }
    if (value == 999) {
        $('#increase').addClass('disable');
    }
});


function checkWhenClick() {
    var input_value = parseInt(document.getElementById('number').value);
    var inc = document.getElementById('increase');
    var dec = document.getElementById('decrease');
    if (input_value > 1) {
        dec.classList.remove('disable');
    } else if (input_value == 1) {
        dec.classList.add('disable');
    }
    if (input_value == 999)
        inc.classList.add('disable');
}

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}
// start set disable
$('#number').each(function () {
    var value = parseInt($(this).val());
    if (value == 1) {
        $('#decrease').addClass('disable');
    }
    if (value == 999) {
        $('#increase').addClass('disable');
    }
});
// set max length for input number
var inputQuantity = [];
$("#number").each(function (i) {
    inputQuantity[i] = this.defaultValue;
    $(this).data("idx", i); // save this field's index to access later
});
$("#number").on("keyup", function (e) {
    var $field = $(this),
        val = this.value,
        $thisIndex = parseInt($field.data("idx"), 10); // retrieve the index
    //        window.console && console.log($field.is(":invalid"));
    //  $field.is(":invalid") is for Safari, it must be the last to not error in IE8
    if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid")) {
        this.value = inputQuantity[$thisIndex];
        return;
    }
    if (val.length > Number($field.attr("maxlength"))) {
        val = val.slice(0, 3);
        $field.val(val);
    }
    inputQuantity[$thisIndex] = val;
});


//menu scroll

var lastId,
    topMenu = $("#nav-inside"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
var barMenu = $(".bar-collapse").find("a");

// set active for first item
menuItems.first().addClass('active');

$('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            if ($(window).innerWidth() <= 992) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 120
                }, 700);
            } else {
                $('html,body').animate({
                    scrollTop: target.offset().top - 10
                }, 700);
            }
            return false;
        }
    }
});


var docHeight = $(document).height();

$("body").append("<div class='overlay-bar'></div>");

$(".overlay-bar")
    .height(docHeight)
    .css({
        'display': 'none',
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'background-color': 'rgba(0, 0, 0, 0.15)',
        'width': '100%',
        'z-index': 1
    });

$('.overlay-bar').click(function () {
    $(".show-collapse").removeClass('show-collapse');
    $(this).removeClass('show-o');
    $('html').removeClass('disable-scroll');
});


// add event click icon

$(".bar-control").click(function () {
    $(".bar-collapse").toggleClass("show-collapse");
    $(".overlay-bar").toggleClass("show-o");
    $('html').toggleClass('disable-scroll');
});

$(".bar-collapse ul li a").click(function () {
    $(".bar-collapse").removeClass("show-collapse");
    $(".overlay-bar, .show-collapse").hide();
    $('html').removeClass('disable-scroll');
});





// drop in bai viet (nguon kham khao)
$('.drop-control').click(function () {
    $('.drop-collapse').slideToggle("slow");
});
$('.related-drugs .control').click(function () {
    $('.related-drugs #list-drugs').slideToggle("slow");
});

// thuoc goc
//set height before background thuoc goc
var widthScreen = $(window).width();
var heightScreen = $(".cs-thuoc-heading").outerHeight() + 16;
$('body').append('<style>.cs-thuoc-heading::before{width: ' + widthScreen + 'px; height: ' + heightScreen + 'px;}</style>');

// remove tag heading thuoc new
var main = $('.content-main');
var info = $('.thuoc-info-detail');
var heading = $('.head-detail');
$('.cs-up-thuoc').each(function () {
    if ($(window).width() <= 768) {
        heading.prependTo(info);
    }
});
// Thuốc detail
$(window).resize(function () {
    // if ($(window).width() <= 768) {
    //     // main.appendTo(a[0]);
    //     heading.prependTo(info);
    // }
    if ($(window).width() >= 1024) {
        heading.prependTo(main);
    } else {
        heading.prependTo(info);
    }
});

$(".list-inner").each(function () {
    var size_li = $(this).children().length;

    if ($(window).innerWidth() > 768) {
        var x = 12;
        if (size_li < 12) {
            $(this).next('.view').hide();
        }
        $(this).find('li:lt(' + x + ')').css('display', 'block');

        $(this).next('.view').click(function (e) {
            e.preventDefault();

            if (x < size_li) {
                x += 12;
                console.log(x);
            }
            if (x >= size_li) {
                $(this).hide();
            }
            $(this).prev().find('li:lt(' + x + ')').css('display', 'block');
        });
    } else {
        var x = 8;
        if (size_li < 8) {
            $(this).next('.view').hide();
        }
        $(this).find('li:lt(' + x + ')').css('display', 'block');

        $(this).next('.view').click(function (e) {
            e.preventDefault();

            if (x < size_li) {
                x += 8;
                console.log(x);
            }
            if (x >= size_li) {
                $(this).hide();
            }
            $(this).prev().find('li:lt(' + x + ')').css('display', 'block');
        });
    }
})


// thuoc tuong tac
$('.int-control .icon').click(function () {
    if ($(window).innerWidth() <= 768) {
        // $('.int-collapse').hide();
        $(this).toggleClass('active rotate-in-center');
        $(this).parent().next().toggleClass('current');
    } else {
        return false;
    }
});


// Post
// add wrapper div iframe
$(".cs-base-custom iframe").wrap("<div class='cs-video-wrapper'></div>");


//tpcn

function openModal() {
    document.getElementById("cs-lightbox").style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.getElementById("tawkchat-container").style.display = "none";
}

function closeModal() {
    document.getElementById("cs-lightbox").style.display = "none";
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.getElementById("tawkchat-container").style.display = "block";
}

$('.boxImg.ligthbox-cursor').click(function(e){
    e.stopPropagation();
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mainItem");
    var dots = document.getElementsByClassName("boxImg");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    // captionText.innerHTML = dots[slideIndex - 1].alt;
}






