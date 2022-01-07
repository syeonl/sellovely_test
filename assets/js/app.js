//deviceid Check
if ((/\;deviceid=/ig).test(gloUserAgent) || (/\&deviceid=/ig).test(gloUserAgent)) {
    var s1, s2;
    if ((/\;deviceid=/ig).test(gloUserAgent)) {
        s1 = gloUserAgent.split('\;deviceid=');
        if (s1[1] == undefined) s1 = gloUserAgent.split('\;deviceId=');
        s2 = s1[1].split('\;');
    } else {
        s1 = gloUserAgent.split('\&deviceid=');
        if (s1[1] == undefined) s1 = gloUserAgent.split('\&deviceId=');
        s2 = s1[1].split('\&');
    }
    gloDeviceID = s2[0];

    //디바이스아이디 저장
    setCookie(CM_LCS_DEVICE_ID, gloDeviceID, 30);
    localStorage.setItem(CM_LCS_DEVICE_ID, gloDeviceID);
    setCookie('dvid', gloDeviceID, 30);		//사용처 확인 후 CM_LCS_DEVICE_ID 값으로 수정
    localStorage.setItem('dvid', gloDeviceID);		//사용처 확인 후 CM_LCS_DEVICE_ID 값으로 수정
}

//App Check
if ((/device=app/ig).test(navigator.userAgent)) {
    gloChkApp = 'iPhone';
} else if ((/NINTH/ig).test(navigator.userAgent)) {
    gloChkApp = 'Android';
} else {
    gloChkApp = 'MobileWeb';
}

//2019-11-12 khs : 아이폰 앱체크 안되는 버그 수정
if (gloChkApp == 'MobileWeb' && localStorage.getItem(CM_LCS_DEVICE_ID) != null && (/iphone|ipad|ipod/ig).test(navigator.userAgent)) {
    gloChkApp = 'iPhone';
}

//2020-06-05 khs : 앱체크 방식 변경
if (gloChkApp == 'MobileWeb' && (localStorage.getItem(CM_LCS_DEVICE_ID) == null || localStorage.getItem(CM_LCS_DEVICE_ID) == "")) {
    if (typeof webkit == "object") {
        if (typeof webkit.messageHandlers == "object") {
            if (typeof webkit.messageHandlers.ios == "object") {
                callWebAction("ACT1013", {}, "fn_chk_App");
            }
        }
    }
}
function fn_chk_App(obj) {
    // 아이폰 호환용
    if (typeof obj == "string") obj = JSON.parse(obj);
    if (obj["deviceId"] != "") {
        gloDeviceID = obj["deviceId"];
        setCookie(CM_LCS_DEVICE_ID, gloDeviceID, 30);
        localStorage.setItem(CM_LCS_DEVICE_ID, gloDeviceID);
        setCookie('dvid', gloDeviceID, 30);
        localStorage.setItem('dvid', gloDeviceID);
        if (gloChkApp == 'MobileWeb' && localStorage.getItem(CM_LCS_DEVICE_ID) != null && (/iphone|ipad/ig).test(navigator.userAgent)) {
            gloChkApp = 'iPhone';
        }
    }
}

function fnTel(telnum) {
    if (gloChkApp == 'Android') {
        callWebAction("ACT1022", [{ "tel": telnum }], "");
    } else {
        location.href = 'tel:' + telnum;
    }
}