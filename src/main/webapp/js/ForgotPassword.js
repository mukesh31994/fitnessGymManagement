/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function forgotPasswordBankUser()
{
    document.getElementById("btnlogin").style.visibility = "hidden";
    var email = document.getElementById("txtEmailId").value;
    var errorMsg = document.getElementById("errorMsg");
    if (email === null || email === "null")
    {
        errorMsg.innerHTML = "Email Id can not be null.";
    } else {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            errorMsg.innerHTML = "Please enter valid email Id";
        } else
        {
             var url = localStorage.getItem("url") + "UpdatePassword";
            var lAjax = new FormAjax();
            lAjax.setUrl(url);
            lAjax.setData({emailId: email, user: "bankUser"});
            lAjax.addEventListener('success', function (response) {
                console.log(response);
                errorMsg.innerHTML = response;
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log("Error : " + textStatus + " - " + errorThrown);
                errorMsg.innerHTML = "Error : " + textStatus + " - " + errorThrown;
            });
            lAjax.execute();
        }
    }
}

function forgotPasswordAdminPanelUser()
{
    document.getElementById("img").style.visibility = "visible";

    var email = document.getElementById("txtEmailId").value;
    var errorMsg = document.getElementById("errorMsg");
    if (email === null || email === "null")
    {
        errorMsg.innerHTML = "Email Id can not be null.";
    } else {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
            errorMsg.innerHTML = "Please enter valid email Id";
        } else
        {
            var url = localStorage.getItem("url") + "UpdatePassword";
            var lAjax = new Ajax();
            lAjax.setUrl(url);
            lAjax.setData({emailId: email, user: "adminPanelUser"});
            lAjax.addEventListener('success', function (response) {
                document.getElementById("img").style.visibility = "hidden";
                errorMsg.innerHTML = response;
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                document.getElementById("img").style.visibility = "hidden";
                console.log("Error : " + textStatus + " - " + errorThrown);
                errorMsg.innerHTML = "Error : " + textStatus + " - " + errorThrown;
            });
            lAjax.execute();
        }
    }
}

function changedPasswordBankUser()
{
    document.getElementById("img").style.visibility = "visible";
    var OldPassword = document.getElementById("OldPassword").value;
    var NewPassword1 = document.getElementById("NewPassword1").value;
    var NewPassword2 = document.getElementById("NewPassword2").value;
    
    if (NewPassword2 !== NewPassword1)
    {
        document.getElementById("img").style.visibility = "hidden";
        document.getElementById("errorMsg").innerHTML = "<font color='red'><b>New Password & Retype Password must be same.</b></font>";
        document.getElementById("NewPassword1").value = "";
        document.getElementById("NewPassword12").value = "";
    } else {
        var username = sessionStorage.getItem("UsernameMW");
        var url = localStorage.getItem("url") + "PanelUtilities";
        var lAjax = new FormAjax();
        lAjax.setUrl(url);
        lAjax.setData({reqType: "ChangePassword", username: username, oldPwd: OldPassword, newPwd: NewPassword1});
        lAjax.addEventListener('success', function (response) {
            console.log(response);
            document.getElementById("img").style.visibility = "hidden";
            document.getElementById("errorMsg").innerHTML = response;
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            document.getElementById("img").style.visibility = "hidden";
            console.log("Error : " + textStatus + " - " + errorThrown);
            document.getElementById("errorMsg").innerHTML = "Error : " + textStatus + " - " + errorThrown;
        });
        lAjax.execute();
    }
}