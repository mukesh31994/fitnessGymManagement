/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.Lead_Date
 */
//$("#btnUpdate").on('click', UpdateShopDetails);

function viewCallBack(pData)
{
    console.log('pData' + pData);
}

function OnLoad()
{
    var action = dataParam.getData('action');
    if (action && action === 'view')
    {
        view();
        dataParam.setData('action', '');
    }
    getLinkAllowedValue();
}

function view()
{

    var action = dataParam.getData('action');
    var id = dataParam.getData('id');
    console.log('action ' + action + 'id:' + id);
    form.view(id, viewCallBack);
}

function checkLength(el) {
    if (el.value.length === 6)
    {
        pinCode(el.value);
    }
}

function pinCode(pin)
{
    var lLoyaltyURL = localStorage.getItem('url') + "webresources/LoyaltyWebservices/";
    var lurl = lLoyaltyURL + 'getAddressDetailsByPIN?data=';
    var lData = {"PINCODE": pin};
    var json = JSON.stringify(lData);
    lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        var result = res[0];
        document.getElementById("Locality").value = result.OFFICENAME + ", " + result.TALUKA;
        document.getElementById("City").value = result.DISTRICT;
        document.getElementById("State").value = result.STATE;
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}
pageSetUp();
$("#DBAName").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $updateShopDetailsForm = $("#updateShopDetailsForm").validate({
    errorClass: errorClass,
    errorElement: errorElement,
    highlight: function (element) {
        $(element).parent().removeClass('state-success').addClass("state-error");
        $(element).removeClass('valid');
    },
    unhighlight: function (element) {
        $(element).parent().removeClass("state-error").addClass('state-success');
        $(element).addClass('valid');
    },
    // Rules for form validation
    rules: {
        DBAName: {
            required: true
        },
        LegalName: {
            required: true
        },
        Industry: {
            required: true

        },
        Pincode: {
            required: true
        },
        StoreContactPerson: {
            required: true

        },
        StoreContactNo: {
            required: true

        },
        transactionPin: {
            required: true
        }
    },
    messages: {
        DBAName: {
            required: ' Enter  shop name',
            alphabets: 'Alphabets only'
        },
        LegalName: {
            required: ' Enter legal name',
            alphabets: 'Alphabets only'
        },
        Industry: {
            required: ' Enter industry'

        },
        Pincode: {
            required: ' Enter Pincode'
        },
        StoreContactPerson: {
            required: ' Enter contact Name'

        },
        StoreContactNo: {
            required: ' Enter contact Number'

        },
        transactionPin: {
            required: ' Enter transaction pin'

        }
    },
    //Ajax form submition
    submitHandler: function (form) {
        UpdateShopDetails();
    },
    // Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function UpdateShopDetails()

{
     debugger;
        var lJSON = {};
        lJSON.mdtId = 36;
         lJSON.tmId = 1;
           lJSON.storeName = $("#DBAName").val();
            lJSON.merchantName = $("#LegalName").val();
             lJSON.address = $("#StoreContactPerson").val();
             lJSON.emailId =$("#StoreContactNo").val();
             lJSON.mobileNo =$("#StoreContactPerson").val();
          
          
        var json = JSON.stringify(lJSON);
        var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/addTemplateData";
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setData(json);
        lAjax.setSync(true);
        lAjax.setType('post');
        lAjax.setContentType('Application/json');
        lAjax.addEventListener('success', function (response) {
            debugger;
            var res = JSON.parse(response);
             var data = JSON.parse(res.data);
             $("#tempReder").append(data.home);
             $("#editDemo").show();

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();


}

function changedStatus()
{
    debugger;
    var value;
    if ($("#linkAllowed").is(":checked"))
    {
        value = "Yes";
    } else
    {
        value = "No";
    }
//     $("#pinAllowed").prop("checked", false);
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/updateLinkPermission";
    var datal = {linkAllowed: value, StroreId: parseInt(localStorage.storeId)};
    var json = JSON.stringify(datal);
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {


        var lStore = JSON.parse(response);
        var lData = JSON.parse(lStore.data);
//        if (lData.transactionPinAllow === "Yes")
//        {
//            $("#OldPassword").prop('disabled', false);
//            $("#pinLink").show();
//
//
//        } else {
//            $("#OldPassword").prop('disabled', true);
//            $("#pinLink").hide();
//
//        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}

function getLinkAllowedValue()
{
    debugger;
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getStoreDetailsByPK";
//           var lData1 = {};
        var lData = {"StroreId": parseInt(localStorage.storeId)};
//         var lData = {"data": {"CustomerID": custDetails.custId}};
        var json = JSON.stringify(lData);
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setData(json);
        lAjax.setSync(true);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {

//           
            var lStore = JSON.parse(response);
            var lData = JSON.parse(lStore.data);
//            pincode = lData.transactionPin;
            var value = lData.linkAllowed;
            if (value === "Yes")
            {
                $("#linkAllowed").prop("checked", true);

            } else {
                $("#linkAllowed").prop("checked", false);
            }

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + " - " + errorThrown);
        });
        lAjax.execute();

}
