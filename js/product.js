function changepricesetting(v) {
    var SalePrice = parseInt(stripComma(v.value));
    var MarketPrice = parseInt($('#MarketPrice').val());
    var OriginalPrice = parseInt($('#OriginalPrice').val());

    if (SalePrice > MarketPrice) {
        alert_dim('시중가보다 높은 가격을 설정하실 수 없습니다.');
        return false;
    }

    if (OriginalPrice > SalePrice) {
        alert_dim('공급가보다 낮은 가격을 설정하실 수 없습니다.');
        return false;
    }
    
    var SalePricePer = 100 - ((SalePrice / MarketPrice) * 100);
    var SponPrice = SalePrice - OriginalPrice;

    $('.sale-price').html(formatComma(SalePrice));
    $('.spon-price').html(formatComma(SponPrice));
    $('.sale-price-per').html(formatComma(Math.round(SalePricePer)) + '%');
    $('#SalePrice').val(formatComma(SalePrice));
}

function fnMove(seq) {
    var offsetId = "#tab" + seq;
    var offset = $(offsetId).offset();
    $('html, body', document).animate({ scrollTop: offset.top }, 0);
}

$(".detail_tab li a").each(function (index) {
    $(this).click(function () {
        $(".detail_tab li a").removeClass("on sitecolor1 siteborder1");
        $(".detail_tabcont").removeClass("on");

        var aaa = '.detail_tabcont#tab' + (index + 1);
        $(aaa).addClass("on");
        $(this).addClass("on sitecolor1 siteborder1");
    });
});

//상품문의 쓰기 open
function showInquiryWrite() {
    $(".tabcont_link").hide();
    $(".prd_inquiry_box").hide();
    $(".inquiry_write").show();
}
//상품문의 쓰기 close
function closeInquiryWrite() {
    $(".tabcont_link").show();
    $(".prd_inquiry_box").show();
    $(".inquiry_write").hide();
}

function GetClipboard(data) {

    var clipboardSub = new Clipboard('.clipboardSub');
    $(".invitation").html('<input type="text" name="" Value="" id="URLcopyIDCopy" readOnly style="" class="text ChangeText" >');
    $("#URLcopyIDCopy").val(data);
    $(".ChangeText").show();

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        copyToClipboard('.ChangeText', data);
    } else {
        clipboardSub.on('success', function () {       // 복사에 성공했을 때
            $('.invitation').html("복사완료");
            setTimeout(function () {
                $(".invitation").html('<input type="text" name="" Value="" id="URLcopyIDCopy" readOnly style="" class="text ChangeText" >');
                $("#URLcopyIDCopy").val(data);
                $(".ChangeText").show();
            }, 1500);
        });
    }

}

function copyToClipboard(el, data) {

    // resolve the element
    el = (typeof el === 'string') ? document.querySelector(el) : el;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {

        // save current contentEditable/readOnly status
        var editable = el.contentEditable;
        var readOnly = el.readOnly;

        // convert to editable with readonly to stop iOS keyboard opening
        el.contentEditable = true;
        el.readOnly = true;

        // create a selectable range
        var range = document.createRange();
        range.selectNodeContents(el);

        // select the range
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        el.setSelectionRange(0, 999999);

        // restore contentEditable/readOnly to original state
        el.contentEditable = editable;
        el.readOnly = readOnly;
    }
    else {
        el.select();
    }

    // execute copy command
    document.execCommand('copy');
    $('.invitation').html("복사완료");
    setTimeout(function () {
        $(".invitation").html('<input type="text" name="" Value="" id="URLcopyIDCopy" readOnly style="" class="text ChangeText" >');
        $("#URLcopyIDCopy").val(data);
        $(".ChangeText").show();
    }, 1500);
}

//좋아요 추천
function favorite() {

    var list = $("#guid").val();

    $.ajax({
        type: "POST",
        dataType: "text",
        async: false,
        data: { mode: "favorite", chklist: list },
        url: "/product/ajaxGoodsFavorite.asp",
        success: function (data) {
            //190131|wjy 상태값과 스크립트(애드저스트)가 같이 넘어옴
            if (data.indexOf("%^&*") != -1) {
                var data_tmp = data.split('%^&*');
                var data = data_tmp[0];
                var script_tmp = data_tmp[1];
                if (script_tmp.length > 1) {
                    $('body').append(script_tmp)
                }
            }

            if (data.trim() == "ok") {
                $('button.favorite').addClass('on');
            } else if (data.trim() == "already") {
                $('button.favorite').removeClass('on');
            } else if (data.trim() == "login") {
                location.href = '/m/mobile_login.asp?redirect=@(LinkUri)';
            }
        }
    });
}

function new_open_pop() {
    $('.search_pop').addClass('fix');
    $('.search_pop').fadeIn();
    get_sword();
}

function close_pop() {
    $('.search_pop').removeClass('fix');
    $('.search_pop').fadeOut();
}

function go_top() {
    $('html,body', document).stop().animate({
        scrollTop: 0
    }, 500);
}
function sword_del() {
    localStorage.removeItem('sword');
    get_sword();
}

function get_sword() {
    var data = localStorage.getItem('sword');
    $.ajax({
        type: 'post',
        url: '/common/ajax/exec_RecentWord.asp?sword=' + data,
        success: function (data, text, xhr) {
            $(".search_history").html(data);
        }
    })
}

function go_btm() {
    $('html, body', document).stop().animate({
        scrollTop: (document.body.scrollHeight)
    });
};

function noti_pop_hide() {
    $(".notify_pop_wrap").fadeOut();
};

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}
function iosCopyToClipboard(el) {
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();
    var ver = iOSversion();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    if (typeof ver == 'object') {
        if (ver[0] >= 10) {
            document.execCommand('copy');
            alert('복사되었습니다.');
        }
    }
}

function get_opinionList(guid, sort) {
    $("#review_list").load("/m/goods/ajaxOpinionList.asp?guid=" + guid + "&listsort=" + sort);
}

function mainDetailSwp() {
    $('.detail_img .swiper-container').find('.swiper-slide').removeClass('hide');
    var swiper2 = new Swiper('.detail_img .swiper-container', {
        autoHeight: true,
        pagination: '.detail_img .detailimg_page',
        paginationType: 'fraction'
    });
}

var detail_img_wow = new WOW({
    callback: mainDetailSwp
})

$(function () {
    detail_img_wow.init();

    $('.search_pop').hide();
    //속도향상 처리 , 이미지를 이제 처리, jings3, 2018-07-11 //(S)
    $(".cls_imgfast").each(function (i, v) {
        var thisImg = $(this).data("imgsrc");
        if (thisImg !== undefined && thisImg !== '') {
            $(this).find("img").attr("src", $(this).data("imgsrc"));
        }
    });

    // 네이버페이 조회(S)
    defineAjax();
    ajax.execute("GET", "/naverpay/fn/ajaxUser_GetChangedProductOrderList.asp", "", "");

    $(".groom").removeClass("hide");

    $(document).on("click", ".groom", function () {
        if (confirm("G-ROOM에 담으시겠습니까?")) {
            $.ajax({
                url: "/my/wishlistOk.asp",
                type: "post",
                data: { mode: "ADD", guid: $("#guid").val(), cate: $("#cate").val() },
                success: function (r) {
                    //$('body').append(r);
                    if (r.indexOf("pop_wishlist_confirm.asp") > -1) {
                        alert("G-ROOM에 정상적으로 담았습니다.");
                    } else if (r.indexOf("login.asp") > -1) {
                        $('body').append(r);
                    }
                }
            })
        }
    })

    // 20190509 kyh, 스토리 좋아요
    $(document).on('click', '.likeData', function () {
        //$(this).toggleClass('on');
        var storyUid = $(this).data("storyuid");
        var _this = $(this);
        var likeCnt = Number($(this).text());
        var linkurl = location.href;
        $.ajax({
            type: "POST",
            async: false,
            data: { "goodsUid": storyUid },
            url: "/m/common/exec_instaGoods_Like.asp",
            success: function (data) {
                var res = $.parseJSON(data);
                if (res.returnCode == '200OKOK') {
                    if (res.msg == 'like') {
                        _this.addClass("on");
                        _this.text(likeCnt + 1)
                    } else {
                        _this.removeClass("on");
                        _this.text(likeCnt - 1)
                    }
                } else if (res.returnCode == '402FAIL') {
                    location.href = '/m/mobile_login.asp?redirect=' + linkurl;
                    return false;
                } else {
                    alert("처리중 에러 발생\n다시 시도해 주세요");
                    return false;
                }
            }
        });
    })


    // 20190509 kyh, 스토리 좋아요
    $(document).on('click', '.tv_likeData', function () {
        //$(this).toggleClass('on');
        var storyUid = $(this).data("storyuid");
        var _this = $(this);
        var likeCnt = Number($(this).text());
        var linkurl = location.href;
        $.ajax({
            type: "POST",
            async: false,
            data: { "mode": "LIVE", "goodsUid": storyUid },
            url: "/m/common/exec_instaGoods_Like.asp",
            success: function (data) {
                var res = $.parseJSON(data);
                if (res.returnCode == '200OKOK') {
                    if (res.msg == 'like') {
                        _this.addClass("on");
                        _this.text(likeCnt + 1)
                    } else {
                        _this.removeClass("on");
                        _this.text(likeCnt - 1)
                    }
                } else if (res.returnCode == '402FAIL') {
                    location.href = '/m/mobile_login.asp?redirect=' + linkurl;
                    return false;
                } else {
                    alert("처리중 에러 발생\n다시 시도해 주세요");
                    return false;
                }
            }
        });
    })

    jQuery("#btnNotify").click(function () {
        jQuery("#notifyFrm #url").val(jQuery(location).attr('href'));
        jQuery("#notifyFrm").submit();
    });

    $(".notify_pop_wrap").hide();

    var clipboard = new Clipboard('.clipboard');
    
    $(".shareLayerClose").click(function () {
        $(".shareLayer").removeClass("on")
    })

    /* 20170522 kyh 워터마크 (S) ( 하단에 스크립트 wmark.init ) */
    $('#tbContent img').each(function () {
        if ($(this).attr("src").indexOf("http://") == -1) {
            //$(this).attr('width', '');
            $(this).attr('max-width', '100%');
            $(this).attr('class', 'watermark');
        }
    });

    // goods_wrap 스타일변경
    var wrapping = $('.wrapping');
    var buy = $('.buy');
    

    var _lastScroll = 0;
    var parcel_wrap = $('.parcel_wrap').offset().top;
    var wrap = $('#tab1').offset().top;

    // 구매하기
    $('.buy .add_wrap .add').on('click', function (e) {
        e.preventDefault();

        $('.buy .buy_inner').toggleClass('open');

    });

    //장바구니 수량
    $.ajax({
        type: "post",
        url: "/common/ajax/exec_getCartCnt.asp",
        success: function (data, state, xhr) {
            $(".cartCnt").html(data);
        }
    });

    // 20201103 mempil 이미지 1장 뜨고 페이지 로딩 완료 후 스와이프 돌게 수정
    $('.detail_img img').eq(0).on("load error", mainDetailSwp);	//2019-09-03 khs : 인터넷 속도 느릴때 스와이퍼 로딩 안되는 경우를 위해 추가
    mainDetailSwp();
});