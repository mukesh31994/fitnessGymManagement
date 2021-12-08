
/*     Start Code For Validation    -- Smart Admin Template  */

function isSpacebar(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode === 32)) {
        return false;
    } else {
        return true;
    }
}

pageSetUp();
$("#OldPassword").focus();

var errorClass = 'invalid';
var errorElement = 'em';
var pincode;
$(document).ready(function () {

    getPincode();
    var $changePassword = $("#changePassword").validate({

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
            currentPassword: {
                required: true
            },
            NewPassword1: {
                required: true
            },
            NewPassword2: {
                required: true
            }
        },

        messages: {
            currentPassword: {
                required: 'Please enter current pin'
            },
            NewPassword1: {
                required: 'Please enter new pin'
            },
            NewPassword2: {
                required: 'Please enter confirm new pin'
            }
        },

        submitHandler: function (form) {
//            
            changedPassword();
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });



    /*      End of Code Validation       */
    function getPincode()
    {

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
            pincode = lData.transactionPin;
            var value = lData.transactionPinAllow;
            if (value === "Yes")
            {
                $("#pinAllowed").prop("checked", true);
                $("#OldPassword").prop('disabled', false);
                $("#pinLink").show();

            } else {
                $("#pinAllowed").prop("checked", false);
                $("#OldPassword").prop('disabled', true);
                $("#pinLink").hide();
            }

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + " - " + errorThrown);
        });
        lAjax.execute();

    }



    function changedPassword()
    {

        if ($changePassword.valid()) {
//            document.getElementById("img").style.visibility = "visible";
            var OldPassword = $("#OldPassword").val();
            var NewPassword1 = $("#NewPassword1").val();
            var NewPassword2 = $("#NewPassword2").val();

            if (NewPassword2 !== NewPassword1)
            {
//                document.getElementById("img").style.visibility = "hidden";
                $("#errorMsg").text("New Pin and confirm new pin must be same.");
            } else if (NewPassword1 == OldPassword)
            {
//                document.getElementById("img").style.visibility = "hidden";
                $("#errorMsg").text("Current pin and New pin should not same.");
            } else {
                var datal = {"NewPin": parseInt($("#NewPassword1").val()), "StroreId": parseInt(localStorage.storeId)};
                var json = JSON.stringify(datal);
                var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/updateTransactionPin";
                var lAjax = new Ajax();
                lAjax.setUrl(url);
//                 var lData = {"StroreId": 20};
                lAjax.setData(json);
                lAjax.setSync(true);
                lAjax.setType('post');
                lAjax.addEventListener('success', function (response) {

                    var lStore = JSON.parse(response);
//            console.log(lStore);
                    if (lStore.flag === true)
                    {
                        smallAlert("Pin Updated successfully", function () {}, 2000);
                        location.reload();

                    } else {
                        smallAlert("Operation Failed", function () {}, 2000);
                        window.location.href = 'index.html#ui/common/forms/changePin.html';
                    }

                });
                lAjax.addEventListener('error', function (textStatus, errorThrown) {
                    console.log("Error : " + textStatus + " - " + errorThrown);
                });
                lAjax.execute();
            }
        }
    }
});
$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(".toggle-password1").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
$(".toggle-password2").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

function changedStatus()
{
debugger;
    var value;
    if ($("#pinAllowed").is(":checked"))
    {
        value = "Yes";
    } else
    {
        value = "No";
    }
//     $("#pinAllowed").prop("checked", false);
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/updatePinPermission";
    var datal = {transactionPinAllow: value, StroreId: parseInt(localStorage.storeId)};
    var json = JSON.stringify(datal);
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {


        var lStore = JSON.parse(response);
        var lData = JSON.parse(lStore.data);
        if (lData.transactionPinAllow === "Yes")
        {
            $("#OldPassword").prop('disabled', false);
            $("#pinLink").show();


        } else {
            $("#OldPassword").prop('disabled', true);
            $("#pinLink").hide();

        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}

function validateConfirmPin()
{

    $("#confirmPinAlert").text("");
    $("#NewPassword1").prop('disabled', true);
    $("#NewPassword2").prop('disabled', true);
    if ($("#OldPassword").val().length !== 0) {
        if ($("#OldPassword").val().length >= 4) {
            if (parseInt($("#OldPassword").val()) !== pincode)
            {
                $("#confirmPinAlert").text("Invalid pin");
                $("#NewPassword1").prop('disabled', true);
                $("#NewPassword2").prop('disabled', true);


            } else {
                $("#NewPassword1").prop('disabled', false);
                $("#NewPassword2").prop('disabled', false);

            }
        }

    }


}

function genratePin() {
    debugger;
    $("#pinLink").addClass("disabled");
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/GenrateTransactionPin";
    var datal = {StroreId: parseInt(localStorage.storeId)};
    var json = JSON.stringify(datal);
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        debugger;

        var lStore = JSON.parse(response);
        var lData = JSON.parse(lStore.data);
        pincode = lData;
         if (lStore.flag === true)
                    {
                        smallAlert("Pin Sent successfully", function () {}, 2000);
//                        location.reload();
window.location.href = 'index.html#ui/common/forms/changePin.html';

                    } else {
                        smallAlert("Operation Failed", function () {}, 2000);
                        window.location.href = 'index.html#ui/common/forms/changePin.html';
                    }
//         if(lData.transactionPinAllow === "Yes")
//         {
//               $("#pinAllowed").prop("checked", true);
//             
//         }else{
//    $("#pinAllowed").prop("checked", false);
//         }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();

}
