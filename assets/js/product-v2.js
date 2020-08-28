// begin comment
var product_id = $('.commentWapper').data('product-id'), url = '/comment/loadComment' + '?page=1&product_id=' + product_id, $form_fn = null;
var array_keycode = [0, 32, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122,65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,193, 225, 160, 192, 224, 133, 7842, 7843, 195, 227, 7840, 7841, 258, 259, 7854, 7855, 7856, 7857, 7860, 7861, 7858, 7859, 7862, 7863, 194, 120, 131, 226, 506, 507, 7846, 7847, 7848, 7849, 7850, 7851, 7852, 7853, 201, 130, 233, 200, 138, 232, 7866, 7867, 7868, 7869, 7864, 7865, 202, 136, 234, 7870, 7871, 7872, 7873, 7874, 7875, 7876, 7877, 7878, 7879, 205, 161, 237, 204, 141, 236, 7880, 7881, 296, 297, 7882, 7883, 211, 162, 243, 210, 242, 7886, 7887, 213, 245, 7884, 7885, 212, 147, 244, 7888, 7889, 7890, 7891, 7892, 7893, 7894, 7895, 7896, 7897, 416, 417, 7898, 7899, 7900, 7901, 7902, 7903, 7904, 7905, 7906, 7907, 218, 163, 250, 217, 151, 249, 7910, 7911, 360, 361, 7908, 7909, 431, 432, 7912, 7913, 7914, 7915, 7916, 7917, 7918, 7919, 7920, 7921, 208, 273, 221, 253, 7922, 7923, 7926, 7927, 7928, 7929, 7924, 7925];
var array_special = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126];
(function ($) {
  $.each(['show', 'hide'], function (i, ev) {
    var el = $.fn[ev];
    $.fn[ev] = function () {
      this.trigger(ev);
      return el.apply(this, arguments);
  };
});
})(jQuery);

$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.commentWapper').load(url);

    // pagination
    waitForEl(".lc-cmt nav ul li a", function() {
        $(document).on('click','.lc-cmt nav ul li a', function (e) {
            e.preventDefault();

            var link = $(this).attr('href');
            $.get(link, function(data){
                $('.commentWapper').html(data);
            });

            $('html, body').animate({
                scrollTop: $(".lc-cmt-title").focus().offset().top - 100
            }, 1000);
        });
    });

    waitForEl(".btn-rep", function() {
        $('.btn-rep').css({"pointer-events": "none", "opacity": "0.5"});
    });

    waitForEl("#send-box-btn", function() {
        $('#send-box-btn').css({"pointer-events": "none", "opacity": "0.5"});
    });

    // username input
    waitForEl("#username", function() {
        $(document).on('keypress', '#username', function(event){
            var inputValue = event.which;

            // allow letters and whitespaces only.
            if( $.inArray(inputValue ,array_special) !== -1 ) { 
                event.preventDefault(); 
            }
        });
    });

    waitForEl('#phone', function() {
        $(document).on('keydown', '#phone', function(e){
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                 // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
                 // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                     // let it happen, don't do anything
                     return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

    });

    waitForEl('.view-more', function(){
        $(document).on('click', '.view-more',function(e){
            e.preventDefault();
            load_more_comments('.view-more', '#allComment', product_id);
        });
    });
    // end pagination

    // validate form-reply
    waitForEl('.form-reply', function(){
        $(document).on('keyup', '.form-reply', function () {
            $('.error').html('');

            if ($(this).val().length < 6) {
                // $(this).next().html('Hãy nhập trên 6 ký tự');
                $(this).nextAll().slice(1, 2).children('.btn-rep').css({"pointer-events": "none", "opacity": "0.5"});
            } else{
                $(this).nextAll().slice(1, 2).children('.btn-rep').css({"pointer-events": "auto", "opacity": "1"});
                $('.btn-rep').click(function () {
                    $(".lc-finish-box").show(500);
                });
            }
        });
    });

    waitForEl('#box-close', function(){
        $(document).on('click', '#box-close', function (e) {
            e.preventDefault();
            $(".lc-finish-box").hide(500);
        });
    });

    waitForEl('.comment-review label', function(){
        $(document).on('click', '.comment-review label',function () {
            var dataInput = $(this).attr('data-input'), id = $(this).data('id');
            $('.comment-box-reply-' + id).show();
            var idInput = $("#" + dataInput);
            idInput.focus();
        });
    });

    check_form_valid();

    //click btnReplyComment open modal
    waitForEl('.btnReplyComment', function(){
        $(document).on('click', '.btnReplyComment', function(e){
            $(".lc-finish-box").show(500);
            setTimeout(function(){
                $('#username').focus();
            }, 200);

            var id = $(this).data('id');
            if(id){
                $('#id').val(id);
                $('#content').val($('#in-' + id).val());
            }else{
                $('#id').val('');
                $('#content').val($('.box-answer').val());
            }

            setTimeout(function(){
                $('#username').focus();
            },200);
        });
    });

    // check box send question
    waitForEl('.box-answer', function(){
        $(document).on('keyup', '.box-answer',function () {
            if ($(this).val().length >= 6) {
                $('#send-box-btn').css({"pointer-events": "auto", "opacity": "1"});
            }
            else {
                $('#send-box-btn').css({"pointer-events": "none", "opacity": "0.5"});
            }
        });
    });

    // submit
    waitForEl('.btnSendCommentSubmit', function(){ 
        $(document).off('click', '.btnSendCommentSubmit').on('click', '.btnSendCommentSubmit', function(e){
            $(this).prop('disabled', true);
            e.preventDefault();
            $form_fn.valid();
            onSubmit($(this));
        });
    });
 
    $(document).on("cut copy paste", 'textarea',function(e) {
       e.preventDefault();
    });
});
// end comment

function check_form_valid(){
    waitForEl('#form-fn', function() {
        // validate
        $form_fn = $("#form-fn").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2,
                    maxlength: 30,
                },
                phone: {
                    minlength: 10,
                    maxlength: 10,
                    number: true
                },
            },
            messages: {
                username: {
                    required: "Vui lòng nhập tên của bạn",
                    minlength: "Tên của bạn tối thiếu có 2 ký tự",
                    maxlength: "Tên của bạn không quá 30 ký tự",
                },
                phone: {
                    number: "Số điện thoại không hợp lệ",
                    minlength: "Hãy nhập số điện thoại 10 số",
                    maxlength: "Hãy nhập số điện thoại 10 số",
                }
            },
            onkeyup: function(element) {$(element).valid()}
            // onfocusout: function(element) { $(element).valid(); }
        });

    });
}

function load_more_comments(element, elementWapper, id){
    $(element).prop('disabled', true).html('Đang tải ...');
    var page = $(element).data('next-page');
    $.get(page + '&mobile=1&product_id=' + id, function(data){
        $(elementWapper).append(data.comments);
        $(element).data('next-page', data.next_page);
        if(data.next_page == null){
            $(element).remove();
        }
        $(element).prop('disabled',false).html('Xem thêm').css("pointer-events", "auto");
    });
}

function waitForEl(selector, callback, time = 500, counter = 100) {
    counter--;
    if (jQuery(selector).length && counter > 0) {
        // thuc hien
        callback();
    } else if(!jQuery(selector).length && counter > 0) {
        // tiep tuc chờ
        setTimeout(function() {
            waitForEl(selector, callback, time, counter);
        }, time);

    } else{
        // het thoi gian
    }
};

function printErrorMsg(msg , tagerElm = '.print-error-msg'){
    $(tagerElm).find('ul').html('');
    $(tagerElm).css('display','block');
    const $ul = $(tagerElm).find('ul');

    $.each(msg, function(key, values) {
        $.each(values, function(index, value){
            $ul.append('<li>'+value+'</li>');
        });
        // add class has-error
        $('#' +key).parents('.form-group').addClass('has-error');
    });

    // $('html, body').animate({
    //     scrollTop: ($(tagerElm).offset().top - 50)
    // },500);

    setTimeout(function(){
        $(tagerElm).slideUp('slow');
    }, 7000);
}


function onSubmit(that){
    that.prop('disabled', true);
    var id = $('#id').val(), phone_length =$('#phone').val().length, username_length = $('#username').val().length;

    if(id){
        content_length = $('#in-' + id).val().length;
    }else{
        content_length = $('.box-answer').val().length;
    }

    if($form_fn.valid() && (content_length >= 6 && content_length <= 500) && (username_length >= 2 && username_length <= 30)){
        var data = $('#form-fn').serialize(), url = '/comment/storeComment';
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            beforeSend: function(){

            },
            error: function(jqXHR, exception) {
                if(jqXHR.status == "422"){
                    printErrorMsg(jqXHR.responseJSON.errors);
                }
                setTimeout(function(){
                    that.prop('disabled', false);
                },2000);
            },
            done: function(data) {
                setTimeout(function(){
                    that.prop('disabled', false);
                },2000);
            },
            statusCode: {
                200: function(res) {
                    $('.btnReplyComment').css({"pointer-events": "none", "opacity": "0.5"});
                    $(".lc-finish-box").hide(500);

                    if(res.mode == 'comment'){
                        $('#allComment').prepend(res.data);
                        setTimeout(function(){
                            $('.comment-wrap input').val('');
                            $('.lc-promo textarea').val('');
                        },100);
                    }

                    if( res.mode ==  'child'){
                        $('.archor-' + id).before(res.data);
                        setTimeout(function(){
                            $('.comment-wrap-' + id).css({"display": "block"});
                            $('#in-' +id).val('');
                        },100);
                    }
                    $(".lc-finish-box").hide(500);

                    setTimeout(function(){
                        that.prop('disabled', false);
                    },2000);
                },
                429: function(request, status, error) {
                    console.log("429");
                    console.log(error);
                    $('.print-error-msg').show().html('Vui lòng không bình luận quá nhanh');
                    setTimeout(function(){
                        $('.print-error-msg').hide();
                    },7000);
                },
                422: function(request, status, error) {
                    console.log("422 - Not Found");
                    console.log(error);
                },
                503: function(request, status, error) {
                    console.log("503 - Server Problem");
                    console.log(error);
                }
            }
        });

        return;
    }
}