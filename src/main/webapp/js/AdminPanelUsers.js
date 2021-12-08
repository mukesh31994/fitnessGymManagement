/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function saveData() {
    var feildRole = document.getElementById("ROLE1");
    var role = feildRole.options[feildRole.selectedIndex].value;
    form.getFieldById("ROLENAME").setValue(role);
    form.save();
}
;


function validateEmail() {
    var email = document.getElementById("EMAILID").value;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        document.getElementById("emailError").innerHTML = "<font color='red'><b>Invalid Email Id </b></font>";
    } else
    {
        var url1 = localStorage.getItem("url") + "PanelUtilities";
        var lAjax1 = new FormAjax();
        lAjax1.setUrl(url1);
        lAjax1.setData({reqType: "ValidateAdminUsername", EMAILID: email});
        lAjax1.addEventListener('success', function (response) {
            if (response === "Found")
            {
                document.getElementById("emailError").innerHTML = "<font color='red'><b>Email Id already exist</b></font>";
            } else
            {
                document.getElementById("USERNAME").value = email;
            }

        });
        lAjax1.addEventListener('error', function (textStatus, errorThrown) {
            console.log(textStatus + " ; " + errorThrown);
        });
        lAjax1.execute();
    }
}

function viewData(id) {

    form.view(id);
}
;

function deleteData() {

    form.delete();
}
;

function updateData() {

    form.update();
}
;


