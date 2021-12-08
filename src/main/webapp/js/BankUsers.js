/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function validateEmailId() {
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("USERNAME").value = "";
    var email = document.getElementById("EMAILID").value;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        document.getElementById("emailError").innerHTML = "<font color='red'><b>Invalid Email Id </b></font>";
    } else
    {
        var url1 = localStorage.getItem("url") + "PanelUtilities";
        var lAjax1 = new FormAjax();
        lAjax1.setUrl(url1);
        lAjax1.setData({reqType: "ValidateBankUsername", EMAILID: email});
        lAjax1.addEventListener('success', function (response) {
            console.log("Res " + response);
            if (response.indexOf("Found") > -1)
            {
                document.getElementById("emailError").innerHTML = "<font color='red'><b>Email Id already exist</b></font>";
            } else
            {
                document.getElementById("emailError").innerHTML = "";
                document.getElementById("USERNAME").value = email;
            }
        });
        lAjax1.addEventListener('error', function (textStatus, errorThrown) {
            console.log(textStatus + " ; " + errorThrown);
        });
        lAjax1.execute();
    }
}



function validateForm()
{
    var name = document.getElementById("NAME").value;
    var email = document.getElementById("EMAILID").value;
    var phone = document.getElementById("CONTACTNO").value;

    if (!validateName(name))
        return false;
    else if (!validateEmail(email))
        return false;
    else if (!validateMobileNo(phone))
        return false;
    else
        return true;
}

function saveData() {

    if (validateForm())
    {
        document.getElementById("btnAdd").style.visibility = 'hidden';
        var feildRole = document.getElementById("ROLE1");
        var role = feildRole.options[feildRole.selectedIndex].value;
        form.getFieldById("ROLENAME").setValue(role);
        document.getElementById("ACTIVESTATUS").value = "ACTIVE";
        form.save();
    } else
    {

    }

}
;


function viewData(id) {
    form.view(id, "", hideButtons);
}
;




function getRoles()
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetAllRoles"});
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
        var obj = JSON.parse(response);
        var x = document.getElementById("ROLE1");
        for (var i in obj) {
            console.log(obj[i].RoleName);
            var option = document.createElement("option");
            option.text = obj[i].RoleName;
            option.value = obj[i].RoleId;
            x.add(option);
        }
        ;
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}


function hideButtons()
{
    getRoles();
    var status = document.getElementById("ACTIVESTATUS").value;
    if (status === 'DELETED')
    {
        document.getElementById("CITY").setAttribute("readonly", "true");
        document.getElementById("NAME").setAttribute("readonly", "true");
        document.getElementById("EMAILID").setAttribute("readonly", "true");
        document.getElementById("CONTACTNO").setAttribute("readonly", "true");
        document.getElementById("btnUpdate").style.visibility = 'hidden';
        document.getElementById("btnDelete").style.visibility = 'hidden';
    }
}


function updateData() {

    if (validateForm())
    {
        var feildRole = document.getElementById("ROLE1");
        var role = feildRole.options[feildRole.selectedIndex].value;
        form.getFieldById("ROLENAME").setValue(role);
        form.update();
    } else
    {

    }
}
;


function deleteData() {

    form.delete();
}



