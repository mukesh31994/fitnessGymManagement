var lStoreData = localStorage.getItem('storeDetails');
var lStore = JSON.parse(lStoreData);
var couponParam = [];
var couponList = [];
var gCustomerType = "Selective";
var gCustomerList = 0;
var gGridParam = "";
var gBaseQuery = "SELECT * FROM vw_totalCustomer_invoiceDetail";
var gCustomerList1 = [];
getCategory("category");
getCouponParam();
var txnF = false;
var custTx = 0;
$("#btnIssue").attr('disabled', true);
var date = new Date().toISOString().slice(0, 10);
var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
$("#earnExpiry").attr('min', tomorrow);
$("#earnExpiry").val(tomorrow);
document.getElementById("searchList").classList.toggle("show");
$('#btnIssue').on('click', function () {
//    debugger;
    $("#custD").show();
    var Trans = sessionStorage.getItem('IssueCoupon');
    if (Trans !== null) {
        if (Trans === "true") {
            txnF = true;
            custTx = sessionStorage.getItem('custIssue');
            $("#custD").hide();
            $("#cDiv").hide();
            earnFunction();
            $("#redeemBtn").attr('disabled', false);
        }
    }
    var inputElements;
    var count = 0;
    var couponCond = document.querySelector('input[name="ctype"]:checked').value;
    if (couponCond === "groupCoupon") {
        inputElements = document.getElementsByName('groupC');
    } else {
        inputElements = document.getElementsByName('couponV');
    }
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            count++;
        }
    }
    if (count > 0) {
        $("#issueModal").modal("show");
    } else {
        $("#issueModal").modal("hide");
    }
    getMsg();
});
$('#issueModal').on('hidden.bs.modal', function (e) {
    $('#issueCoupon1')[0].reset();
    customerType();
    $('#anniversaryD').hide();
    $('#birthdateD').hide();
//    $("#cDiv").hide();
    earnFunction();
    $("#redeemBtn").attr('disabled', true);
});
function cTypeChange() {
//    debugger;
    $("#btnIssue").attr('disabled', true);
    var couponCond = document.querySelector('input[name="ctype"]:checked').value;
    if (couponCond === "All") {
        $("#csDiv").show();
        $("#couponList").empty();
//        getCoupons(couponCond, "-");
    } else {
        $("#csDiv").hide();
        getCoupons(couponCond, "");
    }
}

function getCouponParam() {

    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCouponParamList";
    var lData = {"type": "allthree"};

    var json = JSON.stringify(lData);
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        if (res.flag === true)
        {
            couponParam = JSON.parse(res.data)[0].array1;

        } else
        {
            console.log("Coupon param not found.");
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
    cTypeChange();
}
function searchFunction(strValue) {

    $("#searchList").empty();
    if (strValue !== "") {
        for (var i = 0; i < couponParam.length; i++) {
            if (couponParam[i].toLowerCase().includes(strValue.toLowerCase())) {
                $("#searchList").append($('<a onclick="getCoupons(\'param\',\'' + couponParam[i] + '\')">' + couponParam[i] + '</a>'));
            }
        }
        $("#searchlist").show();
    } else {
        $("#couponList").empty();
//      document.getElementById("searchList").classList.toggle("show");
    }
}
function getCategory(type) {
//    debugger;
    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCouponCategorySubCategory";
    var value = 0;
    if (type === "subcategory") {
        value = $("#category").val();
    }
    var lData = {"type": type, "value": value};
    var json = JSON.stringify(lData);
//        lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        if (res.flag === true)
        {
            var categoryList = JSON.parse(res.data);
            if (categoryList !== null) {
                if (type === "category") {
                    $("#category").attr("disabled", false);
                    $("#category").empty();
                    $("#category").append($('<option id="id_0" value="" selected disabled>Select Category</option>'));

                    for (i = 0; i < categoryList.length; i++)
                    {
                        $("#category").append($('<option id=id_' + categoryList[i].cgId + ' value="' + categoryList[i].categoryName + '">' + categoryList[i].categoryName + '</option>'));
                    }
                } else {
                    $("#subcategory").attr("disabled", false);
                    $("#subcategory").empty();
                    $("#subcategory").append($('<option id="id_0" value="" disabled>Select Sub-Category</option>'));

                    for (i = 0; i < categoryList.length; i++)
                    {
                        $("#subcategory").append($('<option id=id_' + categoryList[i].cgId + ' value="' + categoryList[i].categoryName + '">' + categoryList[i].categoryName + '</option>'));
                    }
                    getCoupons('subcategory', '');
                }
            }
        } else
        {
            if (res.message === "No records found!") {
                if (type === "category") {
                    $("#category").attr("disabled", true);
                    $("#category").empty();
                    $("#category").append($('<option id="id_0" value="">Category Not found!</option>'));
                } else {
                    $("#subcategory").attr("disabled", true);
                    $("#subcategory").empty();
                    $("#subcategory").append($('<option id="id_0" value="">SubCategory Not found!</option>'));
                    getCoupons('category', "");
                }
            } else {
                smallAlert("operation failed", function () {}, 2000);
            }
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}
function getCoupons(ptype, pvalue) {
//    debugger;
    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCouponList";
    var lData = {};
    if (ptype === "category") {
        pvalue = $("#category").val();
        lData = {category: pvalue, checkerid: lStore.UserId};
    } else if (ptype === "subcategory") {
        pvalue = $("#subcategory").val();
        lData = {subcategory: pvalue, checkerid: lStore.UserId};
    } else if (ptype === "param") {
        lData = {param: pvalue, checkerid: lStore.UserId};
        $("#searchList").empty();
        $("#searchList").hide();
    } else if (ptype === "preference") {
        lData = {preference: pvalue, checkerid: lStore.UserId};
    } else if (ptype === "localCoupon") {
        lData = {localCoupon: "YES", checkerid: lStore.UserId};
    } else if (ptype === "groupCoupon") {
        lData = {groupCoupon: "YES", checkerid: lStore.UserId};
    } else {
        lData = {All: pvalue, checkerid: lStore.UserId};
    }


    var json = JSON.stringify(lData);
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            if (ptype !== "groupCoupon") {
                var couponList = JSON.parse(res.data);
                $("#couponList").empty();
                if (couponList.length !== 0) {
                    var couponD = "";
                    for (var i = 0; i < couponList.length; i++) {
                        var offt = couponList[i].offerType;
                        var offDiv = "<center> <span style='font-size:20px;color: #fff'><b> " + couponList[i].offerValue + "</b></span></center></div>";
                        if (offt === "Price-Off" || offt === "Percentage-Off") {
                            offDiv = "<center> <span style='font-size:20px;color: #fff'><b> " + couponList[i].offerValue + "</b></span><b style='color:#fff;padding: 1%'> Off</b></center></div>";
                        }
                        var imgDiv = "<img src='" + couponList[i].couponImage + "' alt='image' style='width:100px;height:100px'>";
                        if (couponList[i].couponImage === "") {
                            imgDiv = "<img src='img/couponimage.png'  alt='image' style='width:100px;height:100px'>";
                        }
//                    var codeLinkDiv = "<button class='btn btn-primary buttonhover' onclick='showBtn(" + couponList[i].couponLmid + ")' style='border: none;border-radius: 4px;background: #16133b;width: inherit;'><span>Show Code</span></button>" +
//                            "</section>" +
                        var codeLinkDiv = "<section class='col-sm-6 col-xs-6' id='code" + couponList[i].couponLmid + "'>" +
                                "<input class='form-control' id='codeV' value='" + couponList[i].couponCode + "' disabled=''>" +
                                "</section><section class='col-sm-2 col-xs-2'></section>" +
                                "<section class='col-sm-4 col-xs-4' id='copy" + couponList[i].couponLmid + "' >" +
                                "<span style='position: absolute;display:none' id='copyText" + couponList[i].couponLmid + "'>copied!</span>" +
                                "<a onclick='copyBtn(\"#codeV\"," + couponList[i].couponLmid + ")' style='border: none;color: #2b2c5a;text-decoration: underline'><b>Copy Code</b></a>";
                        if (couponList[i].couponCode === "") {
                            codeLinkDiv = "<br><br>";
                        }
                        if (couponList[i].couponType === "Deal") {
                            codeLinkDiv = "";
                            if (couponList[i].couponLink !== "") {
//                        codeLinkDiv = "<button class='btn btn-primary buttonhover' onclick='showBtn(" + couponList[i].couponLmid + ")' style='border: none;border-radius: 4px;background: #16133b;width: inherit;'><span>Show Link</span></button>" +
//                                "</section>" +
                                codeLinkDiv = "<section class='col-sm-6 col-xs-6' id='code" + couponList[i].couponLmid + "' >" +
                                        "<input class='form-control' id='link' value='" + couponList[i].couponLink + "' disabled=''>" +
                                        "</section><section class='col-sm-2 col-xs-2'></section>" +
                                        "<section class='col-sm-4 col-xs-4' id='copy" + couponList[i].couponLmid + "' >" +
                                        "<span style='position: absolute;display:none' id='copyText" + couponList[i].couponLmid + "'>copied!</span>" +
                                        "<a onclick='copyBtn(\"#link\"," + couponList[i].couponLmid + ")' style='border: none;color: #2b2c5a;text-decoration: underline'><b>Copy Link</b></a>";
                            }
                        }
                        var shopA = "";
                        if (couponList[i].localCoupon !== null) {
                            if (couponList[i].localCoupon === "YES") {
                                if (couponList[i].storeAddress !== null) {
                                    if (couponList[i].storeAddress !== "") {
                                        if (couponList[i].storeAddress !== undefined) {
                                            shopA = "<section class='col-sm-12 col-xs-12'><center><b>To redeem visit:</b></center>" +
                                                    "<span><center>" + couponList[i].storeAddress + "</center></span></section>";
                                        }
                                    }
                                }
                            }
                        }
                        var desc = textExp(couponList[i].couponDescription, 40);
                        var offerT = textExp(couponList[i].offerText, 40);
                        if (desc === "" || desc === " ") {
                            desc = "<br>";
                        }
                        var htmlData = "<div class='col-sm-5' style='padding-left: 2%;margin:1%'>" +
//                            "<div class='semicircle1'></div>" +
//                            "<div class='semicircle2'></div>" +
                                "<div class='coupon' style='background: white'>" +
                                "<div style='background: #ce0a47;'>  <label class='checkbox-label'> <input type='checkbox' name='couponV' value='" + couponList[i].couponLmid + "' onclick='checkboxF()'><span class='checkbox-custom rectangular'></span></label>" +
                                offDiv +
                                "<div class='container' style='background-color:white'> " +
                                "<section class='col-sm-3 col-xs-3' style='padding-left: 1px'>" +
                                imgDiv +
                                "</section><section class='col-sm-2 col-xs-2'></section>" +
                                "<section class='col-sm-7 col-xs-7' style='padding:1%'>" +
                                "<center><h4><b><a href='" + couponList[i].urlLink + "'>" + couponList[i].couponWebsite + "</a></b></h4>" +
                                "<h4 style='font-size:15px'><b>" + couponList[i].couponTitle + "</b></h4></center>" +
                                "<center><b style='color:#2b2c5a;font-size: 11px'><u>Category</u>: </b><span>" + couponList[i].categoryStr + "</span></center>" +
                                "</section></div>" +
                                "<div class='container' style='background-color:white;padding-left: 3%;padding-right: 1%'>" +
                                "<center> <h4><b>" + offerT + "</b></h4></center>" +
                                "<span style='font-size: 10px'><center>" + desc + "</center></span>" +
                                "</div><div class='container' style='padding:4px;'>" +
//                            "<section class='col-sm-12 col-xs-12' id='showbtn" + couponList[i].couponLmid + "'>" +
                                codeLinkDiv +
                                "</section>" + shopA + "</div><div class='container'>" +
                                "<p class='expire' style='float: right'><b>Expires:</b> " + couponList[i].endDate + "</p></div></div></div>";
                        if (i % 2 !== 0) {
                            couponD = couponD+htmlData + "</div>";
                        } else {
                           couponD = couponD+"<div class='row'>" + htmlData;
                            if ((i + 1) === couponList.length) {
                                couponD = couponD+"</div>";
                            }
                        }
                    }
                    $("#couponList").append(couponD);
                } else {
                    var htmlData = "<div class='row'><center><i class='fa fa-meh-o' style='font-size:80px'><i><h2>OOPS!!Coupon Not found.</h2></center></div>";
                    $("#couponList").append(htmlData);
                }
            } else {
                var couponJson = JSON.parse(res.data);
                var groupNameL = Object.keys(couponJson[0]);
                $("#couponList").empty();
                var htmlData = "";
                var couponHtml = "";
                if (groupNameL.length !== 0) {
                    for (var i = 0; i < groupNameL.length; i++) {
                        couponHtml = "<div class='row'>";
                        var groupName = groupNameL[i];
                        var couponList = couponJson[0][groupName];
                        var totalC = couponList.length;
                        var cidArr = [];
                        for (var j = 0; j < couponList.length; j++) {
                            cidArr.push(couponList[j].couponLmid);
                            var offt = couponList[j].offerType;
                            var offDiv = "<center> <span style='font-size:20px;color: #fff'><b> " + couponList[j].offerValue + "</b></span></center></div>";
                            if (offt === "Price-Off" || offt === "Percentage-Off") {
                                offDiv = "<center> <span style='font-size:20px;color: #fff'><b> " + couponList[j].offerValue + "</b></span><b style='color:#fff;padding: 1%'> Off</b></center></div>";
                            }
                            var imgDiv = "<img src='" + couponList[j].couponImage + "' alt='image' style='width:50px;height:50px'>";
                            if (couponList[j].couponImage === "") {
                                imgDiv = "<img src='img/couponimage.png'  alt='image' style='width:50px;height:50px'>";
                            }
//                    var codeLinkDiv = "<button class='btn btn-primary buttonhover' onclick='showBtn(" + couponList[i].couponLmid + ")' style='border: none;border-radius: 4px;background: #16133b;width: inherit;'><span>Show Code</span></button>" +
//                            "</section>" +
                            var codeLinkDiv = "<section class='col-sm-6 col-xs-6' id='code" + couponList[j].couponLmid + "'>" +
                                    "<input class='form-control' id='codeV' value='" + couponList[j].couponCode + "' style='height:22px' disabled=''>" +
                                    "</section><section class='col-sm-2 col-xs-2'></section>" +
                                    "<section class='col-sm-4 col-xs-4' id='copy" + couponList[j].couponLmid + "' >" +
                                    "<span style='position: absolute;display:none' id='copyText" + couponList[j].couponLmid + "'>copied!</span>" +
                                    "<a onclick='copyBtn(\"#codeV\"," + couponList[j].couponLmid + ")' style='border: none;color: #2b2c5a;text-decoration: underline'><b style='font-size:10px'>Copy Code</b></a>";
                            if (couponList[j].couponCode === "") {
                                codeLinkDiv = "<br><br>";
                            }
                            if (couponList[j].couponType === "Deal") {
                                codeLinkDiv = "";
                                if (couponList[j].couponLink !== "") {
//                        codeLinkDiv = "<button class='btn btn-primary buttonhover' onclick='showBtn(" + couponList[i].couponLmid + ")' style='border: none;border-radius: 4px;background: #16133b;width: inherit;'><span>Show Link</span></button>" +
//                                "</section>" +
                                    codeLinkDiv = "<section class='col-sm-6 col-xs-6' id='code" + couponList[j].couponLmid + "' >" +
                                            "<input class='form-control' id='link' value='" + couponList[j].couponLink + "' style='height:22px' disabled=''>" +
                                            "</section><section class='col-sm-2 col-xs-2'></section>" +
                                            "<section class='col-sm-4 col-xs-4' id='copy" + couponList[j].couponLmid + "' >" +
                                            "<span style='position: absolute;display:none' id='copyText" + couponList[j].couponLmid + "'>copied!</span>" +
                                            "<a onclick='copyBtn(\"#link\"," + couponList[j].couponLmid + ")' style='border: none;color: #2b2c5a;text-decoration: underline'><b style='font-size:10px'>Copy Link</b></a>";
                                }
                            }
                            var shopA = "";
                            if (couponList[j].localCoupon !== null) {
                                if (couponList[j].localCoupon === "YES") {
                                    if (couponList[j].storeAddress !== null) {
                                        if (couponList[j].storeAddress !== "") {
                                            if (couponList[j].storeAddress !== undefined) {
                                                shopA = "<section class='col-sm-12 col-xs-12'><center><b>To redeem visit:</b></center>" +
                                                        "<span><center>" + couponList[j].storeAddress + "</center></span></section>";
                                            }
                                        }
                                    }
                                }
                            }
                            var desc = textExp(couponList[j].couponDescription, 30);
                            var offerT = textExp(couponList[j].offerText, 30);
                            if (desc === "" || desc === " ") {
                                desc = "<br>";
                            }
                            var htmlData1 = "<div class='col-sm-5' style='padding-left: 4%;margin:1%'>" +
//                            "<div class='semicircle1'></div>" +
//                            "<div class='semicircle2'></div>" +
                                    "<div class='coupon' style='background: white'>" +
                                    "<div style='background: #ce0a47;'>  " +
                                    offDiv +
                                    "<div class='container' style='background-color:white;padding:2px 5px'> " +
                                    "<section class='col-sm-3 col-xs-3' style='padding-left: 1px'>" +
                                    imgDiv +
                                    "</section><section class='col-sm-2 col-xs-2'></section>" +
                                    "<section class='col-sm-7 col-xs-7' style='padding:1%;float:right'>" +
                                    "<center><h4 style='font-size:12px'><b><a href='" + couponList[j].urlLink + "'>" + couponList[j].couponWebsite + "</a></b></h4>" +
                                    "<h4 style='font-size:12px'><b>" + couponList[j].couponTitle + "</b></h4></center>" +
                                    "<center><b style='color:#2b2c5a;font-size: 8px'><u>Category</u>: </b><span style='font-size:8px'>" + couponList[j].categoryStr + "</span></center>" +
                                    "</section></div>" +
                                    "<div class='container' style='background-color:white;padding-left: 1%;padding-right: 1%'>" +
                                    "<center> <h4 style='font-size:10px'><b>" + offerT + "</b></h4></center>" +
//                                    "<span style='font-size: 6px'><center>" + desc + "</center></span>" +
                                    "</div><div class='container' style='padding:4px;'>" +
//                            "<section class='col-sm-12 col-xs-12' id='showbtn" + couponList[i].couponLmid + "'>" +
                                    codeLinkDiv +
                                    "</section>" + shopA + "</div><div class='container' style='padding:2px 5px'>" +
                                    "<p class='expire' style='float: right'><b style='font-size:10px'>Expires:</b> " + couponList[j].endDate + "</p></div></div></div>";
                            couponHtml = couponHtml + htmlData1;
                            if (j % 2 !== 0) {
                                couponHtml = couponHtml + "</div><hr><div class='row'>";
                            }
                            if ((j + 1) === couponList.length) {
                                couponHtml = couponHtml + "</div>";
                            }
                        }
                        htmlData = htmlData + "<div class='col-sm-5' style = 'padding-left:0%;border:1px solid;margin:1%   '><div class='col-sm-12 inline-group'><label class='radio'><input type='radio' name='groupC' value='" + cidArr + "' onclick='checkboxF()'><i></i><b>" + groupName + "</b><span> ----->  Total coupons:" + totalC + "</span></label>" +
                                "<input type='text' value='" + cidArr + "' hidden><a id='scroll-down' onclick='showgroup(\"cpDiv_" + i + "\")' style='float:right'></a></div><div class='col-sm-12' style='border:1px solid black;display:none' id='cpDiv_" + i + "'>" + couponHtml + "</div></div>";

                    }
                    $("#couponList").append("<div style='padding-left:3%'>" + htmlData + "</div>");
                } else {
                    htmlData = "<div class='row'><center><i class='fa fa-meh-o' style='font-size:80px'><i><h2>OOPS!!Coupon Not found.</h2></center></div>";
                    $("#couponList").append(htmlData);
                }
            }
            $("#searchList").empty();
//            document.getElementById("searchList").classList.toggle("show");

        } else
        {
            $("#couponList").empty();
            smallAlert("Coupon data not found!", function () {}, 2000);
            var htmlData = "<div class='row'><center><i class='fa fa-meh-o' style='font-size:80px'><i><h2>OOPS!!Coupon Not found.</h2></center></div>";
            $("#couponList").append(htmlData);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();

}
function customerType() {
    var pCustomerType = document.querySelector('input[name="customerT"]:checked').value;
    if (pCustomerType === "All") {
        $("#allcustomer").show();
        $("#selectiveCustomerDiv").hide();
        $("#getListButton").hide();
        $("#multisect").show();
        gCustomerType = "All";
        $("#customerList").empty();
        getCustomerList();
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", false);
    } else if (pCustomerType === "Selective") {
        $("#selectiveCustomerDiv").show();
        $("#allcustomer").hide();
        $("#getListButton").show();
        $("#multisect").hide();
        gCustomerType = "Selective";
        $("#customerList").empty();
        $("#customerListDiv").hide();
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", 4);
    }
    getMsg();
}
$("#balanceCondition2").append("<option value='' data-bv-field='color' >------Select------</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");
$("#lastVisitCondition2").append("<option value='' data-bv-field='color'>-Select-</option>",
        "<option value='<' data-bv-field='color'>Before</option>",
        "<option value='between' data-bv-field='color'>Between</option>");
$("#totalBusinessCondition2").append("<option value='' data-bv-field='color'>------Select------</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");
$("#noOfVisitsCondition2").append("<option value='' data-bv-field='color'>-- Select --</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");
$('#condition1').on('change', function () {
    switch ($(this).val()) {
        case "CurrentPoint":
            $('#balanceDiv').show();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#noOfVisitsDiv').hide();
            $('#anniversaryD').hide();
            $('#birthdateD').hide();
            break;

        case "LastVisit":
            $('#lastVisitDiv').show();
            $('#balanceDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#noOfVisitsDiv').hide();
            $('#anniversaryD').hide();
            $('#birthdateD').hide();
            break;

        case "TotalInvoice":
            $('#totalBusinessDiv').show();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#noOfVisitsDiv').hide();
            $('#anniversaryD').hide();
            $('#birthdateD').hide();
            break;

        case "Visits":
            $('#noOfVisitsDiv').show();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#anniversaryD').hide();
            $('#birthdateD').hide();
            break;

        case "BirthDate":
            $('#anniversaryD').hide();
            $('#birthdateD').show();
            $('#noOfVisitsDiv').hide();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            break;

        case "AnvirsaryDate":
            $('#anniversaryD').show();
            $('#birthdateD').hide();
            $('#noOfVisitsDiv').hide();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            break;

        default:
            $('#noOfVisitsDiv').hide();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#anniversaryD').hide();
            $('#birthdateD').hide();

    }
});

$('#lastVisitCondition2').on('change', function () {
    switch ($(this).val()) {
        case "<":
            $('#sinceDiv').show();
            $('#betweenDiv').hide();
            break;

        case "between":
            $('#betweenDiv').show();
            $('#sinceDiv').hide();
            $("#getListButton").css("margin-right", "0%");
            break;
    }
});

function getCustomerList() {
//    debugger;
    var lGridParams = new Array();
    var lCondition = $("#condition1").val();

    if (lCondition === "CurrentPoint") {
        lGridParams.push(lCondition);
        lGridParams.push($("#balanceCondition2").val());
        lGridParams.push(parseInt($("#balanceAmount").val()));
    } else if (lCondition === "TotalInvoice") {
        lGridParams.push(lCondition);
        lGridParams.push($("#totalBusinessCondition2").val());
        lGridParams.push(parseInt($("#totalBusinessAmount").val()));
    } else if (lCondition === "Visits") {
        lGridParams.push(lCondition);
        lGridParams.push($("#noOfVisitsCondition2").val());
        lGridParams.push(parseInt($("#noOfVisitsCount").val()));
    } else if (lCondition === "LastVisit") {
        if ($("#lastVisitCondition2").val() === "<") {
            lGridParams.push(lCondition);
            lGridParams.push($("#lastVisitCondition2").val());
            lGridParams.push("'" + $("#lastVisitDate").val() + "'");
        } else if ($("#lastVisitCondition2").val() === "between") {
            lGridParams.push(lCondition);
            lGridParams.push($("#lastVisitCondition2").val());
            lGridParams.push("'" + $("#startLastVisitDate").val() + "' AND '" + $("#endLastVisitDate").val() + "'");
        }
    }
    var baFlag = false;
    gGridParam = lGridParams;
    var lUrl = localStorage.getItem("url") + '/QueryServlet';
    lUrl += "?baseQuery=" + gBaseQuery + " where StoreId = " + JSON.parse(localStorage.getItem("storeDetails")).StroreId;
    if (gCustomerType === "Selective") {
        lUrl += "&gridParams=" + JSON.stringify(lGridParams);
        lUrl += "&ruleNo=" + "RULE2";
        $("#customerListDiv").show();
        $("#customerList").attr("multiple", false);
        $("#customerList").attr("size", 4);

        if (lCondition === "BirthDate") {
            baFlag = true;
        } else if (lCondition === "AnvirsaryDate") {
            baFlag = true;
        }

    } else if (gCustomerType === "All") {
        lUrl += "&ruleNo=" + "-";
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", false);

    }
    if (!baFlag) {
        var lAjax = new Ajax();
        lAjax.setUrl(lUrl);
        lAjax.setSync(true);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
//        debugger;
            response = JSON.parse(response);
            gCustomerList = response;
            $("#customerNo").html(response.length);
            $("#customerList").empty();
            var dropdown = document.getElementById("customerList");
            $("#customerCount").show();
            $("#customerListDiv").show();
            if (response.length > 0) {
                $("#redeemBtn").attr('disabled', false);
                for (var i in response) {
                    var option = document.createElement("option");
                    option.text = response[i].CustomerName + "  -  " + response[i].MobileNo;
                    option.value = response[i].MobileNo + "_" + i;
                    dropdown.add(option);
                }
            } else {
                $("#redeemBtn").attr('disabled', true);
                var option = document.createElement("option");
                option.text = "No Customer Found";
                dropdown.add(option);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    } else {
        var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCustomerListbyCondition";
        var lData = {};
        lData.ruleNo = "RULE2";
        lData.StoreId = lStore.StroreId;
        if (lCondition === "BirthDate") {
            lData.params = [lCondition, $("#birthdateC").val(), "-"];
        } else {
            lData.params = [lCondition, $("#anniversaryC").val(), "-"];
        }
        var json = JSON.stringify(lData);
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setData(json);
        lAjax.setSync(true);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.flag === true)
            {
//                debugger;
                response = JSON.parse(response);
                response = JSON.parse(response.data);
                gCustomerList = response;
                $("#customerNo").html(response.length);
                $("#customerList").empty();
                var dropdown = document.getElementById("customerList");
                $("#customerCount").show();
                $("#customerListDiv").show();
                if (response.length > 0) {
                    $("#redeemBtn").attr('disabled', false);
                    for (var i in response) {
                        var option = document.createElement("option");
                        option.text = response[i].FirstName + "  -  " + response[i].MobileNo;
                        option.value = response[i].MobileNo + "_" + i;
                        dropdown.add(option);
                    }
                } else {
                    $("#redeemBtn").attr('disabled', true);
                    var option = document.createElement("option");
                    option.text = "No Customer Found";
                    dropdown.add(option);
                }
            } else
            {
                $("#redeemBtn").attr('disabled', true);
                var option = document.createElement("option");
                option.text = "No Customer Found";
                dropdown.add(option);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }
    getMsg();
}

function issueCoupon() {
    var valFlag = true;
    $("#earnerror").text("");
    var earnFlag = document.querySelector('input[name="earnFlag"]:checked').value;
    if (earnFlag === "Yes") {
        var earnp = $("#earnPoint").val();
        if (earnp <= 0) {
            valFlag = false;
        }
    }
    if (valFlag == true) {
        $("#btnSave").prop('disabled', true);
        var checkedValue = [];
        var couponCond = document.querySelector('input[name="ctype"]:checked').value;
        var inputElements;
        if (couponCond === "groupCoupon") {
            inputElements = document.getElementsByName('groupC');
            for (var i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkedValue.push(inputElements[i].value);
                }
            }
            checkedValue = checkedValue[0].split(",");
        } else {
            inputElements = document.getElementsByName('couponV');
            for (var i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkedValue.push(inputElements[i].value);
                }
            }
        }

        checkedValue[0].split(",");
        var custA = [];
        if (txnF === true) {
            custA.push(parseInt(custTx));
        } else {
            if ($("input[name='customerT']:checked").val() === "All") {
                if (gCustomerList1.length !== 0) {
                    gCustomerList = gCustomerList1;
                }
                for (var i in gCustomerList) {

                    custA.push(parseInt(gCustomerList[i].CustomerID));

                }
            } else {
                var lCondition = $("#condition1").val();
                var baFlag = false;
                if (lCondition === "BirthDate") {
                    baFlag = true;
                } else if (lCondition === "AnvirsaryDate") {
                    baFlag = true;
                }
                for (var i in gCustomerList) {
                    if (baFlag) {
                        custA.push(parseInt(gCustomerList[i].CustId));
                    } else {
                        custA.push(parseInt(gCustomerList[i].CustomerID));
                    }
                }
            }
        }
        var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/redeemCoupon";
        var lData = {};
        lData.couponLmid = checkedValue;
        lData.storeId = lStore.StroreId;
        lData.userId = lStore.UserId;
        lData.custId = custA;
        lData.storeName = lStore.DBAName;
        var pCustomerType = document.querySelector('input[name="customerT"]:checked').value;
        if (pCustomerType === "All") {
            lData.customerCond = "All";
        } else {
            lData.customerCond = $('#condition1').val();
        }
        lData.earnFlag = document.querySelector('input[name="earnFlag"]:checked').value;
        if (earnFlag === "Yes") {
            lData.earnPoint = $("#earnPoint").val();
            lData.earnExpiry = $("#earnExpiry").val();
        } else {
            lData.earnPoint = 0;
            lData.earnExpiry = "";
        }


        var json = JSON.stringify(lData);
//        lurl = lurl + json;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setData(json);
        lAjax.setSync(true);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.flag === true)
            {
                smallAlert("Coupon Issued successfully!", function () {
                }, 2000);
                $('#issueCoupon')[0].reset();
                $('#issueCoupon1')[0].reset();
                cTypeChange();
                window.location = 'index.html#ui/common/list/IssueCoupon.html';
                customerType();
                $("#issueModal").modal("hide");
                $("#redeemBtn").attr('disabled', true);
                sessionStorage.removeItem('IssueCoupon');
                sessionStorage.removeItem('custIssue');
            } else
            {
                smallAlert("Coupon operation failed", function () {}, 2000);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    } else {
        $("#earnerror").text("Enter earn point.");
    }

}
$("#earnPoint").on("keypress", function () {
    $("#earnerror").text("");
});

function earnFunction() {
    var earnFlag = document.querySelector('input[name="earnFlag"]:checked').value;
    if (earnFlag === "Yes") {
        $("#pDiv").show();
        $("#pdDiv").show();
        $("#earnExpiry").val(tomorrow);
    } else {
        $("#pDiv").hide();
        $("#pdDiv").hide();
    }
    getMsg();
}
function showBtn(cudid) {
    $("#showbtn" + cudid).fadeOut(500);
    $("#code" + cudid).fadeIn(3500);
    $("#copy" + cudid).fadeIn(3500);
}
function copyBtn(element, cudid) {

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copyText" + cudid).show().delay(2000).fadeOut();
    $("#copyText" + cudid).css("animation", "floatup 2s forwards");
}
$("#customerList").on("click", function () {
    gCustomerList1 = [];
    var selectedCust = [];
//    if ($("input[name='customerT']:checked").val() === "All") {

    var selectedOpt = $(this).val();
    for (i in selectedOpt) {
        var cont = selectedOpt[i].split('_')[1];
        if (!selectedCust.includes(cont)) {
            selectedCust.push(selectedOpt[i].split('_')[1]);
        }
    }
    var gCL = [];
    var c = 0; //gCustomerList;
    for (i in gCustomerList) {
        for (var j in selectedCust) {
            if (i === selectedCust[j]) {
                gCL[c] = gCustomerList[i];
                c++;
            }
        }
    }
    gCustomerList1 = gCL;
//    }
});

function checkboxF() {
    var inputElements;
    var count = 0;
    var couponCond = document.querySelector('input[name="ctype"]:checked').value;
    if (couponCond === "groupCoupon") {
        inputElements = document.getElementsByName('groupC');
    } else {
        inputElements = document.getElementsByName('couponV');
    }
    for (var i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            count++;
        }
    }
    if (count > 0) {
        $("#btnIssue").attr('disabled', false);
    } else {
        $("#btnIssue").attr('disabled', true);
    }
}

function textExp(valp, length) {
    var dText = new String();
    var lVal = valp;
    var value = valp;
    var lCharLimit = length;
    var lShowMoreTxt = "Read More...";
    var lValue = "<span class='dataValue_" + i + "'>" + value + "</span>";
    if (lCharLimit < lVal.length) {
        var lShortText = "<span class='shortText_" + i + "'>" + lVal.substring(0, lCharLimit) + "</span>";
        var lLongText = "<span class='longText_" + i + "' style='display:none'>" + lVal.substring(lCharLimit) + "</span>";
        var lShowLessTxt = "";
        if (lCharLimit < 35) {
            lShowMoreTxt = "<span class='showMore_" + i + "' style='color:blue;font-size: 10px;'>... Read More</span>";
            lShowLessTxt = "<span class='showLess_" + i + "' style='display:none;color:blue;font-size: 10px;'>... Read Less</span>";
        } else {
            lShowMoreTxt = "<span class='showMore_" + i + "' style='color:blue;font-size: 12px;'>... Read More</span>";
            lShowLessTxt = "<span class='showLess_" + i + "' style='display:none;color:blue;font-size: 12px;'>... Read Less</span>";
        }

        var lFullText = lShortText + lLongText + lShowLessTxt + lShowMoreTxt;
        return dText = lFullText;
    } else {
        return dText = lValue + "<br><br>";
    }
}


$(document).on('click', "span[class^='showLess']", function () {
    $(this).prev().css('display', 'none');
    $(this).hide();
    $(this).next().css('display', 'inline');
    $('#data-table').DataTable().rows().deselect();
});
$(document).on('click', "span[class^='showMore']", function () {
    $(this).hide();
    $(this).prev().prev().css('display', 'inline');
    $(this).prev().css('display', 'inline');
//    $('#' + pTableName).DataTable().rows().deselect();
});

function showgroup(val) {
    var x = document.getElementById(val);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function getMsg() {
    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCouponSms";
    var lData = {};

    lData.earnFlag = document.querySelector('input[name="earnFlag"]:checked').value;

    var pCustomerType = document.querySelector('input[name="customerT"]:checked').value;
    if (pCustomerType === "All") {
        lData.customerCond = "All";
    } else {
        lData.customerCond = $('#condition1').val();
    }
    var json = JSON.stringify(lData);
    $('#summaryTemplateMessage').empty();
//        lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
//        debugger;
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            $('#summaryTemplateMessage').val(res.data);
        } else
        {
            smallAlert("Coupon operation failed", function () {}, 2000);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();

}
