var mob = getParameter("mobileNo", location.href);
$("#MobileNo").val(mob);
var UserRemaining = localStorage.getItem('NoOfCustomerRemaiming');

if (UserRemaining == 0) {
    $.SmartMessageBox({
        title: "Can not add customer !!! Plz Contact Support Team ",
        template: '<center></center>',
        buttons: '[OK]'
    }, function (ButtonPressed) {
        if (ButtonPressed === "OK") {
            window.location.href = 'index.html#ui/common/dashboard/dashboard.html';
            location.reload();
        }
    });
} else
{
    var mobileNo = sessionStorage.getItem('custMobileNo');
    var lStoreData = localStorage.getItem('storeDetails');
    var lStore = JSON.parse(lStoreData);
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/";
    var prevURL = sessionStorage.getItem("currURL");
    if (prevURL) {
        if (prevURL.search('EarnBurn') !== -1) {
            if (mobileNo) {
                document.getElementById('MobileNo').value = mobileNo;
                sessionStorage.setItem("currURL", '');
                sessionStorage.setItem('custMobileNo', '');
            }
        }
    }

    /*     Start Code For Validation    -- Smart Admin Template  */

    pageSetUp();
    $("#FirstName").focus();
    var errorClass = 'invalid';
    var errorElement = 'em';
    var $customerForm = $("#addCustomerForm").validate({
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
            FirstName: {
                required: true
//            alphabets: true
            },
            LastName: {
                required: true
//            alphabets: true
            },
            MobileNo: {
                required: true

            },
            gender: {
                required: true
            },

            Email: {
//            required: true
            }
        },
        messages: {
            FirstName: {
                required: 'Please enter your First name',
                alphabets: 'Alphabets only'
            },
            LastName: {
                required: 'Please enter your Last Name',
                alphabets: 'Alphabets only'
            },
            MobileNo: {
                required: 'Please enter your phone number',
                digits: 'Digits only'
            },
            gender: {
                required: 'Please select your gender',
            },
            Email: {
//            required: 'Please enter your email',

            }
        },
        //Ajax form submition
        submitHandler: function (form) {
            saveData();
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    /*      End of Code Validation       */
    function saveData() {
        form.getFieldById("StoreId").setValue(lStore.StroreId);
        if ($customerForm.valid()) {
            /* Code for searching if customer already exist     */
            mobileNumber = form.getFieldById('MobileNo').getValue();
            var lurl = url + 'getCustomerByMobile?data=';
            var lData = {"StoreId": lStore.StroreId, "MobileNo": mobileNumber};
            var json = JSON.stringify(lData);
            lurl = lurl + json;
            var lAjax = new Ajax();
            lAjax.setUrl(lurl);
            lAjax.setType('get');
            lAjax.addEventListener('success', function (response) {
                var res = JSON.parse(response);
                if (res.customerDetails.custId === 0) {
                    addCustomer();
                } else if (res.customerDetails.custId > 0) {
                    $.SmartMessageBox({
                        title: "Number already Registered. Kindly enter different contact number.",
                        buttons: '[OK]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            $("#MobileNo").focus();
                        }
                    });

                } else {
                    smallAlertFailure("Search failed", function () {}, 2000);
                }
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log("Error : " + textStatus + "" + errorThrown);
            });
            lAjax.execute();
        } else {
            console.log('Form validation error');
        }
    }

    function addCustomer() {
        var lurl = url + 'addCustomer?data=';
        var lData = form.getJSON();
        var lMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var lBday = lData.BirthDate;
        if (lBday !== "") {
            var bdayarr = lBday.split("-");
            lData.BirthDate =bdayarr[2] + ' '  +  lMonths[Number(bdayarr[1]) - 1] + ' ' + bdayarr[0];
        } else {
            lData.BirthDate = '';
        }
        var anvday = lData.AnvirsaryDate;
        if (anvday !== "") {
            var anvdayarr = anvday.split("-");
            lData.AnvirsaryDate = anvdayarr[2] + ' '  + lMonths[Number(anvdayarr[1]) - 1] + ' ' + anvdayarr[0];
        } else {
            lData.AnvirsaryDate = '';
        }
        if (form.getFieldById('gender').getValue() === "") {
            lData.gender = 'Female';
        }
        lData.Remark = document.getElementById('Remark').value;
        var json = JSON.stringify(lData);
        lurl = lurl + json;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setData(json);
        lAjax.setType('get');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.flag === true)
            {
                smallAlert("Saved successfully", function () {
                }, 2000);
                $('#addCustomerForm')[0].reset();
                sessionStorage.setItem('custMobileNo', mobileNumber);
                window.location.assign('index.html#ui/common/forms/EarnBurn.html');
//            window.location.reload();
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
}



