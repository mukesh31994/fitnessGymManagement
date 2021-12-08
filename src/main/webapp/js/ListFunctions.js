
function orderIdRenderer(value, meta, record) {
    var lHTML = "<a href='#ui/common/forms/order.html' onclick='setLinkData(\"" + value + "\" ,\"view\")'>" + value + "</a>";
    return lHTML;
}

function customerDetailRenderer(value, meta, record) {
    var value1 = record.Id;
    var lHTML = "<a href='#ui/common/forms/UpdateCustomer.html' onclick='setLinkData(\"" + value1 + "\" ,\"view\")'>" + value + "</a>";
    return lHTML;
}

function configurePlanRenderer(value, meta, record) {
    var value1 = record.ConfigID;
    var lHTML = "<a href='#ui/common/forms/UpdateConfigurePlan.html' onclick='setLinkData(\"" + value1 + "\" ,\"view\")'>" + value + "</a>";
    return lHTML;
}

function shopRenderer(value, meta, record) {
    var value1 = record.StoreId;
    var lHTML = "<a href='#ui/common/forms/UpdateShopDetails.html' onclick='setLinkData(\"" + value1 + "\" ,\"view\")'>" + value + "</a>";
    return lHTML;
}

function customerRendererTop(value, meta, record) {

    var value1 = record.Id;
    var lMobileNO = record.MobileNo;
    var lHTML = "<a href='#' onclick='createModal(\"" + lMobileNO + "\" ,\"view\")' data-toggle='modal' data-target='#modal'>" + value + "</a>";
    return lHTML;
}

function setLinkData(pValue, pAction) {
    dataParam.setData('id', pValue);
    dataParam.setData('action', pAction);
}

function setStyle(value, meta, record)
{

    var result = record.EVENT;

    if (result.match(/Belated.*/))
    {
        return record.EVENT.fontcolor("red");

    }
    if (result.match(/Happy.*/))
    {
        return record.EVENT.fontcolor("green");

    }
    if (record.EVENT === "Upcoming")
    {
        return record.EVENT.fontcolor("orange");

    }




}

function createModal(pValue, pAction) {

    var lLoyaltyURL = localStorage.getItem('url') + "webresources/LoyaltyWebservices/";
    var lurl = lLoyaltyURL + 'getCustomerByMobile?data=';
    var lStore = JSON.parse(localStorage.getItem('storeDetails'));
    var storeId = lStore.StroreId;
    var tbl = '';

    $("#custTransTable").remove();
    var lData = {"StoreId": storeId, "MobileNo": pValue};
    var json = JSON.stringify(lData);
    lurl = lurl + json;
    console.log(lurl);

    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        if (res.customerDetails.custId > 0) {
            custId = res.customerDetails.custId;

            balancePoints = Number(res.customerBalance);
            burnCriteria = res.customerNoOfTran;
            $("#custName").text(res.customerDetails.firstName + ' ' + res.customerDetails.lastName);
            $("#email").text(res.customerDetails.email);
            $("#birthday").text(res.customerDetails.birthDate);
            $("#anniversaryDay").text(res.customerDetails.anvirsaryDate);

            tbl = $('<table class="table table-bordered"></table>').attr({id: "custTransTable", class: ["table", "table-bordered"].join(' ')});
            var thead = $("<thead id='tableHead'><tr><th>Transaction Date</th><th>Transaction Type</th><th>Invoice Amount</th><th>Points Issued</th><th>Points Redeemed</th></tr></thead>").attr({}).appendTo(tbl);
            var row = '';
            var i;
            for (i = 0; i < res.transDetails.length; i++) {

                var plDate = new Date(res.transDetails[i].MAKERDATE);
                var pDate = new Date(plDate);
                var day = pDate.getDate().toString();
                var month = (pDate.getMonth() + 1).toString();
                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                var lDate = pDate.getFullYear().toString() + "-" + month + "-" + day;
                var lfomatdate = new Date(lDate);
                var ldate1234 = lfomatdate.format('dd-mmmm-yyyy');


                row = $('<tr></tr>').appendTo(thead);
                $('<td class="modalCol"></td>').text(ldate1234).appendTo(row);
                $('<td class="modalCol"></td>').text(res.transDetails[i].transactionType).appendTo(row);
                $('<td class="modalCol"></td>').text(res.transDetails[i].purchaseAmount).appendTo(row);
                $('<td class="modalCol"></td>').text(res.transDetails[i].pointsUsed).appendTo(row);
                $('<td class="modalCol"></td>').text(res.transDetails[i].pointsDeducted).appendTo(row);

            }
            tbl.appendTo($("#headerTransHistory"));
            $(".modalCol").css({"background-color":"white"});
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function campaignList(value, meta, record) {
    var value = record.CID;
    if (record.SMS_TYPE === ("Survey Template") || record.SMS_TYPE === ("Survey Template with customer benifit")) {
        var lHTML = "<a href='#ui/common/forms/CampaignReport.html' onclick='setLinkData(\"" + value + "\" ,\"view\")'>" + value + "</a>";
    } else {
        var lHTML = "<div>" + value + "</div>";
    }
    return lHTML;
}

function updateCoupon(value, meta, record) {
    var lHTML = "<div class='row' style='padding-top:2%; padding-left:5%'><section class='col-sm-3' style='padding-left:10%'><a href='#ui/common/forms/UpdateCoupon.html'>" +
            " <span class='fa fa fa-edit fa-lg' style='padding: 7px 10px;background-color:#3276b1;border-radius: 5px; display: inline-block; cursor: pointer; font-weight: bold; color: #fff;' " +
            "onclick='setLinkData(\"" + record.CID + "\" ,\"view\")'></span></a></section> " +
            " <div>";
    return lHTML;
}
function displayLogo(value, meta, record) { 
     var lHTML = "";
    if (record.COUPON_IMAGE === "" || record.COUPON_IMAGE === null || record.COUPON_IMAGE === " "|| record.COUPON_IMAGE === undefined)
    {
        var lHTML = "<div style='background-image: url(\"img/couponimage.png\"); background-size: 100% 100%; width: 100%; height: 70px;'><div>";
    } else
    {
        var lHTML = "<div style='width: 100%;padding-left:10px'><img src=DisplayImage?path=/home/Loyalty/Images" + record.COUPON_IMAGE + " height=70 width=70 class ='product-thumbnail-small' alt='Image'></img></div>";
//        var lHTML = "<div style='width: 100%;padding-left:10px'><img src=DisplayImage?path=/Users/Dhamani/NetBeansProjects/PreparedSolutions/prepaid/prepaid/Images/" + record.IMG_PATH + " height=70 width=70 class ='product-thumbnail-small' alt='Image'></img></div>";
    }
    return lHTML;
}
