//debugger;
//$('#BirthDate').datepicker();
var mobileNo = sessionStorage.getItem('custMobileNo');
var lStoreData = localStorage.getItem('storeDetails');
var lStore = JSON.parse(lStoreData);
var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/";

/*     Start Code For Validation    -- Smart Admin Template  */

pageSetUp();
$("#FirstName").focus();

var errorClass = 'invalid';
var errorElement = 'em';

var frmConfigureSMS = $("#frmConfigureSMS").validate({
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
        message: {
            required: true
        }
    },

    messages: {
        message: {
            required: 'Please enter your phone number'
        }
    },
    //Ajax form submition
    submitHandler: function () {
        
    },
    // Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});


$('#btnSubmit').on('click', function () {
        submitBtn();
    });

/*      End of Code Validation       */

function submitBtn() {
    debugger;
    var lurl = url + 'addSMSTemplate';
    var lFormData = form.getJSON();
    var lData = {};
    lFormData.merchantId = lStore.UserId;
    lFormData.storeId = lStore.StroreId;
    lFormData.messageType = form.getFieldById("messageType").getValue();
    lFormData.message = document.getElementById("message").value;
    lData = {data : lFormData};
    var json = JSON.stringify(lData);
//    lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            smallAlert("Saved successfully", function () {}, 2000);
            window.location.assign('index.html#ui/common/dashboard/dashboard.html');
        } else
        {
            smallAlert("Save operation failed", function () {}, 2000);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}
