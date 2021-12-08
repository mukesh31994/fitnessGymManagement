/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function saveData() {

    var rolename = document.getElementById("RoleName").value;
    var permission = document.getElementById("Permision").value;
    document.getElementById("EntryDate").value = currentDate();
    if (rolename !== "" && permission !== "")
    {
        document.getElementById("btnAdd").style.visibility = 'hidden';
        form.save();
    } else
    {
        alert("Please enter valid deatails.");
    }

}
;


function getSelectedOptions(sel) {
    var data = "";
    var ids = "";
    var opts = [],
            opt;
    var len = len = sel.options.length;
    var j = 1;
    for (var i = 0; i < len; i++) {
        opt = sel.options[i];
        if (opt.selected) {
            opts.push(opt);
            data = data + j + ") " + opt.text + "<br>";
            if (i == 0)
            {
                ids = opt.value;
            } else
            {
                ids = ids + "," + opt.value;
            }

            j++;
        }
    }
    document.getElementById("Permision").value = ids;
    document.getElementById("selectedPermission").innerHTML = data;
    return opts;
}

function getAllPermissions()
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetAllPermissions"});
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
        var obj = JSON.parse(response);
        var x = document.getElementById("Permision1");
        for (var i in obj) {
            console.log(obj[i].RoleName);
            var option = document.createElement("option");
            option.text = obj[i].PermissionName + " [" + obj[i].Description + "] ";
            option.value = obj[i].PermissionId;
            x.add(option);
        }
        ;
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}


