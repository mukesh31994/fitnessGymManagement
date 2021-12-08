/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var currentdate = new Date();
var datetime = currentdate.getDate() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getFullYear() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
document.getElementById("lastLogin").innerHTML = "Last Login on " + datetime;

function customizeAjaxCall(storeId)
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetStoreNameByStoreId", STOREID: storeId});
    lAjax1.addEventListener('success', function (response) {
        var obj = JSON.parse(response);
        console.log(obj);
        form.getFieldById("DBA_NAME").setValue(obj.DBA_NAME);
        form.getFieldById("LEGAL_NAME").setValue(obj.LEGAL_NAME);
        document.getElementById("ADDRESS").innerHTML = obj.ADDRESS_1 + ', ' + obj.ADDRESS_2 + ", " + obj.ADDRESS_3 + ", " + obj.CITY_ID + ", " + obj.STATE_ID + ", " + obj.PINCODE;
        form.getFieldById("CONTACT_PERSON_NAME").setValue(obj.CONTACT_PERSON_NAME);
        form.getFieldById("CONTACTPERSONDETAILS").setValue(obj.CONTACT_PERSON_NUMBER + " (" + obj.EMAIL_ID + ") ")

        var MERCHANT_ID = form.getFieldById("MERCHANT_ID").getValue();
        customizeAjaxCall2(MERCHANT_ID);
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

function customizeAjaxCall2(merchantId, callback)
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetMerchantNameByMerchantId", MERCHANT_ID: merchantId});
    lAjax1.addEventListener('success', function (response) {
        var obj = JSON.parse(response);
        form.getFieldById("MERCHANTNAME").setValue(obj.NAME);
        form.getFieldById("MERCHANTNUMBER").setValue(obj.MOBILE_NO);
        form.getFieldById("MERCHANTEMAILID").setValue(obj.EMAIL_ID);
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

function customizeAjaxCallUpdate()
{
    var merchantId = form.getFieldById("MERCHANT_ID").getValue();
    var status = form.getFieldById("BANKSTATUS").getValue();
    var beanname = form.getFieldById("BEANNAME").getValue();
    var type = "";
    var PKID = "";

    if (beanname === "merchantRequestManager")
    {

    }
    if (beanname === "addChangeManager")
    {
        status = "Your request for address change is updated with remark '" + status + "'. ";
        type = "Address Change";
        PKID = document.getElementById("ACID").value;
    }
    if (beanname === "fircManager")
    {
        status = "Your request  for FIRC is updated with remark '" + status + "'. ";
        type = "FIRC";
        PKID = document.getElementById("FIRCID").value;
    }
    if (beanname === "monthlyStatementManager")
    {
        status = "Your request for Monthly Statement is updated with remark '" + status + "'. ";
        type = "Monthly Statement";
        PKID = document.getElementById("MSID").value;
    }
    if (beanname === "paymentAdviceManager")
    {
        status = "Your request for Payment Advice is updated with remark '" + status + "'. ";
        type = "Payment Advice";
        PKID = document.getElementById("PAYID").value;
    }
    if (beanname === "paymentIssueManager")
    {
        status = "Your request  for Payment Issue is updated with remark '" + status + "'. ";
        type = "Payment Issue";
        PKID = document.getElementById("PIID").value;
    }

    console.log("Notification : " + status);
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "SendNotOtp", MERCHANT_ID: merchantId, Status: status, Type: type, PKID: PKID});
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}

function currentDate()
{
    var now = new Date();
    var datet = dateFormat(now, "dd-mmm-yyyy h:MM:ss TT");
    return datet;
}

function saveData() {
    var feildBankid = document.getElementById("BANKID1");
    var bankid = feildBankid.options[feildBankid.selectedIndex].value;
    form.getFieldById("BANKID").setValue(bankid);

    var bankname = feildBankid.options[feildBankid.selectedIndex].text;
    form.getFieldById("BANKNAME").setValue(bankname);

    var feildRole = document.getElementById("ROLE1");
    var role = feildRole.options[feildRole.selectedIndex].value;
    form.getFieldById("ROLENAME").setValue(role);

    form.save();

}

function getCBOdata(source, target)
{
    var status = document.getElementById(source);
    var str = status.options[status.selectedIndex].value;
    document.getElementById(target).value = str;
}

function setCBOdata(source, target)
{
    var str = document.getElementById(source).value;
    var tar = document.getElementById(target);
    for (var i = 0, j = tar.options.length; i < j; ++i) {
        if (tar.options[i].innerHTML === str) {
            tar.selectedIndex = i;
            break;
        }
    }
}


function getDropdownOptions(control, querycode, callback)
{
    var url = localStorage.getItem("url") + "QueryHelperServlet";
    var lAjax = new FormAjax();
    var obj;
    lAjax.setUrl(url);
    lAjax.setData({QueryCode: querycode});
    lAjax.addEventListener('success', function (response) {
        console.log(response);
        var obj = JSON.parse(response);
        var select = document.getElementById(control);
        for (var i = 0; i < obj.length; i++)
        {
            var option = document.createElement('option');
            option.text = obj[i].text;
            option.value = obj[i].value;
            select.add(option, 0);
        }
        callback();
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
        viewDataById();
    });
    lAjax.execute();
    return obj;
}

function getAllManagers()
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetManagerList"});
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
        document.getElementById("managerList").innerHTML = response;
        
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}
