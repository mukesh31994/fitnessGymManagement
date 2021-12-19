

function isNumberKey(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}

var isFunctionCall = false;
var lcreateId = '';
var tabCount = 0;
var dashboardMenuClick = false;
function detectHotKeys() {
    var isAltKey = false;
    $(window).keydown(function (e) {

        if (e.which === 18)
            isAltKey = true;
        if (e.which === 112) {      //  function key - F1
            e.preventDefault();
            window.location.assign('index.html#ui/common/forms/AddCustomer.html');
            return false;
        }
        if (e.which === 114) {          //  function key - F3
            e.preventDefault();
            window.location.assign('index.html#ui/common/list/CustomerListMerchant.html');
            return false;
        }
        if (e.which === 113) {          //  function key - F2 
            e.preventDefault();
            window.location.assign('index.html#ui/common/forms/EarnBurn.html');
            return false;
        }
        if (e.which === 115) {          //  function key - F4
            e.preventDefault();
            window.location.assign('index.html#ui/common/list/TransactionHistoryMerchant.html');
            return false;
        }

        if ($("#MsgBoxBack").hasClass('fadeIn')) {
            var lbtnId = '';
            var lbtnValue = [];
            var getBtnElem = $(".MessageBoxButtonSection").find("button");

            $(":input").focus(function () {
                id = this.id;
            });

            for (i = 0; i < getBtnElem.length; i++) {
                lbtnValue[i] = $(getBtnElem[i]).text();

//   
                if (e.which === 13) {       // for enter key
                    e.preventDefault();
                    if (lbtnValue[i] === ' Register' || lbtnValue[i] === ' OK') {
                        lbtnId = $(getBtnElem[i]).attr('id');
                        lcreateId = '#' + lbtnId;
                        $(lcreateId).click();
                    }
                } else if (e.which === 27) {   // for ESC key
                    e.preventDefault();
                    if (lbtnValue[i] === ' Cancel' || getBtnElem.length === 1) {
                        lbtnId = $(getBtnElem[i]).attr('id');
                        lcreateId = '#' + lbtnId;
                        $(lcreateId).click();
                    }
                }
                ;
            }
        }
    });
}

$(window).ready(function () {
    $("#content").keydown(function (e) {
        if (e.altKey) {
            e.preventDefault();
            if (e.which === 101 || e.which === 69) {
                if (isSearchComplete)
                    $("#btnEarn").click();
            }
            if (e.which === 98 || e.which === 66) {
                if (isSearchComplete)
                    $("#btnBurn").click();
            }
            if (e.which === 99 || e.which === 67) {
                if (isSearchComplete)
                    $("#btnEarnBurnVoid").click();
            }
            if (e.which === 114 || e.which === 82) {
                if (isSearchComplete)
                    $("#reqCode").click();
            }
        }
    });
    //For HTML 5 date Format
    $("input[type='date']").on("change", function () {
        this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                .format(this.getAttribute("data-date-format"))
                );
    }).trigger("change");
});
function getCurrDate() {
    var d = new Date();
    d.setDate(d.getDate());
    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = '' + d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var lCurrdate = year + '-' + month + '-' + day;

    var lCurrMeridian = '';
    var lCurrHour = '';
    if (d.getHours() < 12) {
        lCurrHour = d.getHours();
        lCurrMeridian = 'AM';
    } else {
        lCurrHour = d.getHours() - 12;
        lCurrMeridian = 'PM';
    }
    var lCurrTime = lCurrHour + ':' + d.getMinutes() + ':' + d.getSeconds();
    //var arr1 = [lCurrdate, lCurrTime, lCurrMeridian];
    var arr1 = lCurrdate;
    currDate = lCurrdate// arr1.join(' ');
}
//    getUserDetails();
function getUserDetails()
{
    var url1 = "http://localhost:8080/getUserDetail";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData({"emailAddress":"devdh@gmail.com"})
    lAjax1.addEventListener('success', function (response) {
        var json = JSON.parse(response);
        var data = JSON.parse(json.data);
        sessionStorage.setItem("USER", json.user);
        var lUser = JSON.parse(json.user);
        var menuDom = document.getElementById("menu");
//            if (menuDom.id == 'menu') {
        var menu = new Menu();
        menu.setDom(menuDom);
        menu.setData(data);
        menu.render();
        initApp.leftNav();
//            }
        document.getElementById("UserName").innerHTML = lUser.emailAddress;

//        _callback();
     /*   getStoreListByUserId();*/

    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
//        }
}

/*    service call for store list       */

/*function getStoreListByUserId() {

    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getStoreListByUserId?data=";
    var lUserData = {};

    var getData = sessionStorage.getItem("USER");
    lUserData = JSON.parse(getData);
    var lData = {userId: lUserData.userId};
    var json = JSON.stringify(lData);
    url = url + json;

    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setType('get');
    lAjax.setSync(true);
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);

        var lStoreSpan = $("#storeName");
        var cList = $('ul#storeListDropDown');
        var lSelectedStoreID = localStorage.getItem("storeId");
        $.each(res.stores, function (i)
        {
            var li = $('<li/>')
                    .addClass('storeListItem')
                    //                    
                    .appendTo(cList);
            var lStore = res.stores[i];
            var lHref = $('<a/>').text(lStore.LegalName);
            lHref.attr("id", lStore.StroreId);
            var lStoreId = lStore.StroreId;
            if (lSelectedStoreID === null || lSelectedStoreID == "") {
                localStorage.setItem("storeId", lStoreId);

                localStorage.setItem("storeDetails", JSON.stringify(lStore));
                window['selectedStore'] = lStore;
                lStoreSpan.text(lStore.LegalName);
            } else {
                if (lSelectedStoreID == lStoreId) {
                    window['selectedStore'] = lStore;
                    localStorage.setItem("storeDetails", lStore);
                    localStorage.setItem("storeDetails", JSON.stringify(lStore));
                    lStoreSpan.text(lStore.LegalName);
                }
            }
            lHref.on('click', function () {
                var lClickStore = lStore;
                var lStoreId = lClickStore.StroreId;
                localStorage.setItem("storeId", lStoreId);
                localStorage.setItem("storeDetails", JSON.stringify(lStore));
                window['selectedStore'] = lStore;
                lStoreSpan.text(lStore.LegalName);
            });
            li.append(lHref);
            getMyBalance();
        });

//            _callback();
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();


}*/

function getMyBalance() {
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getMyBalance?data=";
    var lUserData = {};
    var lUserId;
    var getData = sessionStorage.getItem("USER");
    lUserData = JSON.parse(getData);
    if (lUserData.userType === 'MANAGER')
    {
        lUserId = lUserData.addedBy;
    } else
    {
        lUserId = lUserData.userId;
    }

    var lData = {UserId: lUserId};
    var json = JSON.stringify(lData);
    url = url + json;
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setType('get');
    lAjax.setSync(true);
    lAjax.addEventListener('success', function (response) {
        var lStoreData = localStorage.getItem("storeDetails");
        var lStore = JSON.parse(lStoreData);
        var lSmsBalanceDetails = JSON.parse(response);
        var lNewStoreData = $.extend(lStore, {daysCount: lSmsBalanceDetails.daysCount});
        localStorage.setItem("NoOfCustomerRemaiming", lSmsBalanceDetails.NoOfCustomerRemaining);
        localStorage.setItem("storeDetails", JSON.stringify(lNewStoreData));
        localStorage.setItem("CashBackBalance", JSON.stringify(lSmsBalanceDetails.cashbackBalcnce));
        var lSmsRemain = Number(lStore.smsRemain);
        var lDailyCustomerCount = Number(lStore.currentCustomerCount);
        var lRepeateCustomerCount = Number(lStore.repeateCustomerCount);
        var lSmsUsed = Number(lSmsBalanceDetails.SmsAllowed) - Number(lSmsRemain);
        lSmsRemain1 = Number(lStore.smsRemain);
        lSmsUsed1 = Number(lSmsBalanceDetails.SmsAllowed) - Number(lSmsRemain);
        $('#paidAmount').text((Number(lStore.cardOrCash)).toLocaleString('hi-IN'));
        $('#totalBusiness').text((Number(lStore.totalBusiness)).toLocaleString('hi-IN'));
        $('#repeatCustomer').text(lRepeateCustomerCount);
        $('#earnedCounter').text((Number(lStore.earnedPoints)).toLocaleString('hi-IN'));
        $('#burnedCounter').text((Number(lStore.burnedPoints)).toLocaleString('hi-IN'));
        $('#totalCustomer').text(lDailyCustomerCount);
        $('#balanceSMS').text(lSmsRemain);
        $('#usedSMS').text(lSmsUsed);
//        createLoyaltyChart();
        window.location.href = 'index.html#ui/common/dashboard/dashboard.html';

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}


window.onload = getUserDetails;
