
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
$(document).ready(function () {

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
            newPassword: {
                required: true
            },
            retypePassword: {
                required: true
            }
        },

        messages: {
            currentPassword: {
                required: 'Please enter current password'
            },
            newPassword: {
                required: 'Please enter new password'
            },
            retypePassword: {
                required: 'Please enter confirm new password'
            }
        },

        submitHandler: function (form) {
//            debugger;
            changedPassword();
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });

    /*      End of Code Validation       */


    function changedPassword()
    {
        
        if ($changePassword.valid()) {
            document.getElementById("img").style.visibility = "visible";
            var OldPassword = document.getElementById("OldPassword").value;
            var NewPassword1 = document.getElementById("NewPassword1").value;
            var NewPassword2 = document.getElementById("NewPassword2").value;

            if (NewPassword2 !== NewPassword1)
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("errorMsg").innerHTML = "<font color='red'><b>New password and confirm new password must be same.</b></font>";
                return false;
            }else if(NewPassword1 == OldPassword)
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("errorMsg").innerHTML = "<font color='red'><b>Current password and New password should not same.</b></font>";
                return false;
            }
            else{
                var username = sessionStorage.getItem("UsernameMW");
                var url = localStorage.getItem("url") + "PanelUtilities";
                var lAjax = new FormAjax();
                lAjax.setUrl(url);
                lAjax.setData({reqType: "ChangePassword", username: username, oldPwd: OldPassword, newPwd: NewPassword1});
                lAjax.addEventListener('success', function (response) {
                    console.log(response);
                    var res = response.substr(0, 3);
                    document.getElementById("img").style.visibility = "hidden";

                    if (res == "200") {
                        smallAlert("Password Changed successfully", function () {}, 3000);
                        window.location.assign('index.html#ui/common/dashboard/dashboard.html');
                    } else {
                        document.getElementById("errorMsg").innerHTML = response;
                        $("#OldPassword").focus();
                    }
                });
                lAjax.addEventListener('error', function (textStatus, errorThrown) {
                    document.getElementById("img").style.visibility = "hidden";
                    console.log("Error : " + textStatus + " - " + errorThrown);
                    document.getElementById("errorMsg").innerHTML = "Error : " + textStatus + " - " + errorThrown;
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
////starting of validating spaces in textfeild//////
//function nospaces(data) {
//    if (data.value.match(/\s/g)) {
//        alert('Sorry, you are not allowed to enter any spaces');
//        data.value = data.value.replace(/\s/g, '');
//    }
//}
///////////////////end of validating spaces in textfeild//////