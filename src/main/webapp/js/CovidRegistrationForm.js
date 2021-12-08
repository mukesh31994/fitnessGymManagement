/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "https://konpay.blooom.ooo/LoyaltyService/";
//                var url = "https://dev.pladatechnologies.com/LoyaltyService/";
//var url = "http://localhost:9090/LoyaltyProgram/";
//        var url = "http://localhost:8080/LoyaltyProgram/";
//    var url = "https://backend.merchantworld.in/LoyaltyService/";

$(document).ready(function () {
    getYears();
    getAllDistrict();
    $("#thankDiv").hide();
    $("#district").select2();
    $("#bYear").select2();
});
function addetails()
{
//    debugger;
    var name = document.getElementById("enquiryName").value;
    var number = document.getElementById("phoneNumber").value;
    var email = document.getElementById("emailAddress").value;
    var year = document.getElementById("bYear").value;
    var district = document.getElementById("district").value;
//    var name = $("#merchantMobileNo").val();
//    var name = $("#merchantMobileNo").val();
    var customerDetail = {};
    customerDetail.userName = name;
    customerDetail.mobileNumber = number;
    customerDetail.emailId = email;
    customerDetail.yearOfBirth = year;
    customerDetail.district = district;
    customerDetail.ouptedOut = "No";
    var ldata = {"data": customerDetail};
//        customerDetail.lng = lng.toFixed(8);
    var json = JSON.stringify(ldata);
    var lurl = url + "webresources/LoyaltyWebservices/addVaccinationUser";

    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setType('post');
//    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {
//        debugger;
        var res = JSON.parse(response);
        if (res.flag === true) {
            swal("Registration completed successfully!!");
            $("#enquiryName").val("");
            $("#phoneNumber").val("");
            $("#emailAddress").val("");
            $("#emailAddress").val("");
            $("#district").val("");
            $("#thankDiv").show();
            $("#formDiv").hide();
        } else {
            swal("OOPS!!Registration Failed.");
        }
    });
    lAjax.execute();

}

function getAllDistrict()
{
    var lurl = url + "webresources/LoyaltyWebservices/getDistrictList";
    $("#district").html("");
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true) {
            var districtArr = JSON.parse(res.data);
            if (districtArr !== null) {
                for (i = 0; i < districtArr.length; i++)
                {
                    if (districtArr[i].districtId == "395") {
                        $("#district").append($('<option id=id_' + districtArr[i].districtId + ' value="' + districtArr[i].districtId + '" selected>' + districtArr[i].districtName + '</option>'));
                    } else {
                        $("#district").append($('<option id=id_' + districtArr[i].districtId + ' value="' + districtArr[i].districtId + '">' + districtArr[i].districtName + '</option>'));
                    }
                }
            } else {
                $("#district").append($('<option id="zero" value="">District Not found!</option>'));
            }
        } else {
            swal("District List Failed to fetched.");
        }
    });
    lAjax.execute();
}

function rederdata(value, btn)
{
    var f = document.forms[value].elements;
    var cansubmit = true;
    var length = f.length;
    var ids = ['enquiryName', 'phoneNumber', 'emailAddress', 'bYear', 'district'];
    for (var i = 0; i < length; i++) {
        if (ids.includes(f[i].id)) {
            if (f[i].value.length === 0) {
                cansubmit = false;
            }
        }
    }
    if (validateEmailId($("#emailAddress").val()) === false) {
        cansubmit = false;
    } else if ($("#phoneNumber").val().length < 10) {
        cansubmit = false;
    }

    if (cansubmit) {
        document.getElementById(btn).disabled = false;
    } else {
        document.getElementById(btn).disabled = true;
    }
}
function getYears() {
    var currentYear = (new Date()).getFullYear();
    //Loop and add the Year values to DropDownList.
    for (var i = 1880; i <= currentYear; i++) {
        if (i === currentYear - 20) {
            $("#bYear").append($('<option id="y_' + i + '" value=' + i + ' selected>' + i + '</option>'));
        } else {
            $("#bYear").append($('<option id="y_' + i + '" value=' + i + '>' + i + '</option>'));
        }
    }
}

function validateEmailId(email) {

    if (email !== "")
    {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        document.getElementById("giveEnq").disabled = false;
        $("#lEmailErrorMessage").hide();
//        rederdata("login_form", "giveEnq");
        if (reg.test(email) === false)
        {
            $("#lEmailErrorMessage").show();
            document.getElementById("lEmailErrorMessage").innerHTML = "Invalid Email-Id!";
            $("#emailAddress").focus();
            document.getElementById("giveEnq").disabled = true;
            return false;
        }

        document.getElementById("lEmailErrorMessage").innerHTML = "";

        return true;
    } else
    {
        $("#lEmailErrorMessage").hide();
        document.getElementById("lEmailErrorMessage").innerHTML = "";
        document.getElementById("giveEnq").disabled = false;
//        rederdata("login_form", "giveEnq");
        return true;
    }

}

function isNumberKey(event) {
    var mobile = document.getElementById("phoneNumber").value;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (mobile !== "") {
        if (mobile.length < 10) {
            return true;
        } else {
            var pattern = /^[6-9][0-9]{9}$/;
            if (pattern.test(mobile)) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        var charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 55 || charCode > 57)) {
            return false;
        } else {
            return true;
        }
    }
}
function sendLink(id) {
    var url = "https://vaccineslot.plada.tech/LoyaltyService/CovidRegistrationForm.html";
    var text = "Enroll%20for%20open%20Vaccine%20Slot%20Notification%20";
    if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent))) {
//        $("#whatsapp").attr('href', 'whatsapp://send?text=' + text + '.%20click%20on%20link%20to%20preview%20' + url);
        $("#" + id).attr('href', 'https://wa.me/?text=' + text + '.%20Click%20on%20the%20link%20' + url);
    } else {
        $("#" + id).attr('href', 'https://web.whatsapp.com/send?text=' + text + '.%20Click%20on%20the%20link%20' + url);
    }

}

function validateReg()
{
    var lurl = url + "webresources/LoyaltyWebservices/checkVaccinationValidation";
    var ldata = {"emailId": $("#emailAddress").val(), "districtId": $("#district").val()}
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(JSON.stringify(ldata));
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true) {
            var dflag = res.data;
            if (dflag == "true") {
                $("#lEmailErrorMessage").show();
                document.getElementById("lEmailErrorMessage").innerHTML = "Email-Id already registered for the selected district!";
                $("#emailAddress").focus();
                document.getElementById("giveEnq").disabled = true;
            } else {
                $("#lEmailErrorMessage").hide();
                document.getElementById("lEmailErrorMessage").innerHTML = "";
                document.getElementById("giveEnq").disabled = false;
                rederdata("login_form", "giveEnq");
            }
        } else {
        }
    });
    lAjax.execute();
}

function nameValidation(event) {
    
    var name = document.getElementById("enquiryName").value;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (name === "") {
        if (charCode === 32) {
            return false;
        } else {
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32) {
            return true;
        } else {
            return false;
        }
    }
}