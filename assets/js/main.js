(function() {
    //$('.iv').imageview();

    var winH = 0; // 창높이
    var scl = 0; // scrollTop



    $(function(){
        $('.eyes').on('click',function(){ $('.input.password').toggleClass('active');
            if( $('.input.password').hasClass('active') == true ){
                $(this).find('.fa-eye').attr('class',"fas fa-eye-slash").parents('.input').find('#password').attr('type',"text");
            } else {
                $(this).find('.fa-eye-slash').attr('class',"fas fa-eye").parents('.input').find('#password').attr('type','password');
            }
        });
    });

    $('.share_box .share_wrap .x_i').on('click', function() {
        $('.share_box').addClass('on');
        $('.dimm').fadeOut();
    });

    // 딤클릭시 메뉴 닫기
    $('.dimm').on('click', function() {
        $('.share_box').addClass('on');
        $('.dimm').fadeOut();
    });


   


    
    // goods_wrap 스타일변경
    var buy = $('.buy');

    $(window).scroll(function() {
       var sc = $(document).scrollTop();

       if (sc >= 2500) {
            buy.removeClass('on');
            $('.wrapping').removeClass('on');
            $('.float_btn_wrap').removeClass('on');
           
       }  else if(sc >= 700) {
            buy.addClass('on');
            $('.wrapping').addClass('on');
            $('.buy .menu_srcoll').hide();
            $('.float_btn_wrap').addClass('on');
       } else {
            buy.removeClass('on');
            $('.wrapping').removeClass('on');
            $('.buy .select').show();
            $('.buy .menu_srcoll').show();
            $('.float_btn_wrap').removeClass('on');
         
        }
    }).trigger('scroll');


    $('.btn_like').on('click', function() {

        $(this).toggleClass('on');

    });
        
    $('.buy .select>li h4').unbind("click").bind("click",function(e){
        e.preventDefault();
        $('.buy .select_menu').toggleClass('open');


        if( $('.buy .select_menu').hasClass('open')) {
            $('.buy .select').css('border-radius', '5px 5px 0 0');
        }else {
            $('.buy .select').css('border-radius', '5px');
        }

    });
    
    $('.buy .select_menu>li').on('click', function(e) {
        e.preventDefault();
        
        $('.buy .menu').addClass('open');
        $('.buy .select_menu').removeClass('open');
        $('.store_container .buy .menu>li').show();
        
        if($('.buy .menu').hasClass('open')) {
            $('.num_wrap').addClass('show');
            $('.buy .select').css('border-radius', '5px');
        };

    });

  

    $('.store_container .buy .menu>li').after().click(function () {
        $('.store_container .buy .menu>li').hide();
        $('.buy .menu').removeClass('open');
    });





    // 인플루언서 상품 => 내 스토어에 담기 메뉴 누르면 보이게만 설정함
    $('.buy .add_wrap .influ_cart').on('click', function() {
    
        $(this).toggleClass('click');
        $('.buy .add_wrap .influ_cart span').hide();
        $('.buy .add_wrap .heart').show();
        $('.influ_price').toggleClass('open');

        if($('.influ_price').hasClass('open')) {
            $('.num_wrap').addClass('show');
            $('.buy .add_wrap .influ_cart span').show();
            $('.buy .add_wrap .heart').hide();
        };

    });

    $('.heart').after().click(function () {
        $(this).toggleClass('on');
    });


    // 펼쳐보기
    $('.terms_wrap .agree').on('click', function() {
        $('.user_terms .terms_wrap .agree').toggleClass('active');
        $('.user_terms .terms').slideToggle();

    });


    // 판매자 입점 약관 동의 버튼
    $('.terms_wrap .btn_agree').on('click',function() {
        $('.btn_agree').toggleClass('on');
        $('.user_terms .terms .check').toggleClass('on');
    });


})();