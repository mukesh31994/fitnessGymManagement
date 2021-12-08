function viewCallBack(pData) {

//    console.log('pData' + pData);
}
function OnLoad() {

    var action = dataParam.getData('action');
    if (action && action === 'view') {
        view();
        dataParam.setData('action', '');
    }
}

function formatDate(viewCallBack) {
    var lCallBackResponse = viewCallBack;
    if (lCallBackResponse.BirthDate) {
        if (lCallBackResponse.BirthDate.search('-') === -1) {
            var lConvertedBDay = lCallBackResponse.BirthDate;       //Dec 12
            var lbday = lConvertedBDay.split(' ');
            var lMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var d = new Date();
            var m, bdate;
            if (lbday.length > 2) {
                m = '' + (lMonths.indexOf(lbday[1]) + 1);
                if (m.length < 2)
                    m = '0' + m;
                bdate = lbday[2] + '-' + m + '-' + lbday[0];
            } else {
                m = '' + (lMonths.indexOf(lbday[0]) + 1);
                if (m.length < 2)
                    m = '0' + m;
                bdate = d.getFullYear() + '-' + m + '-' + lbday[1];
            }
            lCallBackResponse.BirthDate = bdate;
            document.getElementById('BirthDate').value = bdate;
        }
    }
    if (lCallBackResponse.AnvirsaryDate) {           //!== 'NA' && lParsedJsonData.AnvirsaryDate !== 'na'
        if (lCallBackResponse.AnvirsaryDate.search('-') === -1) {
            var lConvertedAnnDay = lCallBackResponse.AnvirsaryDate;       //Dec 12
            var lAnnday = lConvertedAnnDay.split(' ');
            var lMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var d = new Date();
            if (lAnnday.length > 2) {
                var m = '' + (lMonths.indexOf(lAnnday[1]) + 1);
                if (m.length < 2)
                    m = '0' + m;
                var lAnniversarydate = lAnnday[2] + '-' + m + '-' + lAnnday[0];
            } else {
                var m = '' + (lMonths.indexOf(lAnnday[0]) + 1);
                if (m.length < 2)
                    m = '0' + m;
                var lAnniversarydate = d.getFullYear() + '-' + m + '-' + lAnnday[1];
            }
            lCallBackResponse.AnvirsaryDate = lAnniversarydate;
            document.getElementById('AnvirsaryDate').value = lAnniversarydate;

        }
    }
    if (lCallBackResponse.gender === 'Male' || lCallBackResponse.gender === 'male') {
        $('#genderMale').attr('checked', true);
    }
    if (lCallBackResponse.gender === 'Female' || lCallBackResponse.gender === 'female') {
        $('#genderFemale').attr('checked', true);
    }
}
function setTextAreaData(viewCallBack) {
    var lCallBackResponse = viewCallBack;
    document.getElementById('Remark').value = lCallBackResponse.Remark;
}

function view() {
//    debugger;
    var action = dataParam.getData('action');
    var id = dataParam.getData('id');
    console.log('action ' + action + 'id:' + id);
    form.view(id, function (viewCallBack) {
        formatDate(viewCallBack);
        setTextAreaData(viewCallBack);
    });
}
jQuery.validator.addMethod(
        "dateITA",
        function (value, element) {
            var check = false;
            var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

            if (re.test(value)) {
// Modified code start
                try {
                    var d = $.datepicker.parseDate('dd/mm/yy', value);
//    alert(d);
                    check = true;
                } catch (e) {
// alert(e);
                    check = false;
                }

            } else
                check = false;
            return this.optional(element) || check;
        },
        "Please enter a correct date"
        );


$("#btnSave").on('click');
pageSetUp();
$("#FirstName").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $customerUpdateForm = $("#updateCustomerform").validate({
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
        },
        LastName: {
            required: true
        },
        MobileNo: {
            required: true,
            minlength: 10,
            maxlength: 10,
            digits: true,
            mobileNo: true
        },
        date: {
            date: true
        },
        gender: {
            required: true
        }

    },
    messages: {
        FirstName: {
            required: 'Please enter first name',
            alphabets: 'Alphabets only'
        },
        LastName: {
            required: 'Please enter last name',
            alphabets: 'Alphabets only'
        },
        MobileNo: {
            required: 'Please enter mobile number',
            digits: 'Digits only',
            mobileNo: 'Enter valid mobile number'
        },
        date: {
            date: 'Enter valid date'
        },
        gender: {
            required: 'Please select your gender'
        }
    },
//Ajax form submition
    submitHandler: function (form) {
        saveCustomerDetails();
    },
// Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function saveCustomerDetails() {

    if ($customerUpdateForm.valid()) {
        var lMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var lJSON = {};
        var action = dataParam.getData('action');
        if (action && action === 'view') {
            lJSON = form.getJSON();
            var getData = sessionStorage.getItem("USER");
            lUserData = JSON.parse(getData);

            if (lUserData.userType === 'MANAGER')
            {
                lJSON.MAKERID = lUserData.addedBy;
            } else
            {
                lJSON.MAKERID = lUserData.userId;
            }
            if (form.getFieldById('gender').getValue() === "") {
                lJSON.gender = "Female";
            }
        } else {
            lJSON = form.getJSON();
            var radios = document.querySelectorAll('input[type="radio"]:checked');
            lJSON.gender = radios.length > 0 ? radios[0].value : null;

            var lBday = lJSON.BirthDate;
            if (lBday !== "") {
                var bdayarr = lBday.split("-");
                lJSON.BirthDate = bdayarr[2] + ' ' + lMonths[Number(bdayarr[1]) - 1] + ' ' + bdayarr[0];
            } else {
                lJSON.BirthDate = '';
            }
            var anvday = lJSON.AnvirsaryDate;
            if (anvday != "") {
                var anvdayarr = anvday.split("-");
                lJSON.AnvirsaryDate = anvdayarr[2] + ' ' + lMonths[Number(anvdayarr[1]) - 1] + ' ' + anvdayarr[0];
            } else {
                lJSON.AnvirsaryDate = '';
            }
            var ltextAreaData = document.getElementById('Remark').value;
            lJSON.Remark = ltextAreaData;
            var getData = sessionStorage.getItem("USER");
            lUserData = JSON.parse(getData);

            if (lUserData.userType === 'MANAGER')
            {
                lJSON.MAKERID = lUserData.addedBy;
            } else
            {
                lJSON.MAKERID = lUserData.userId;
            }
        }
        form.update(lJSON, function () {

            smallAlert("Updated successfully", function () {
                window.location = '#ui/common/list/CustomerListMerchant.html';
                location.reload();
            }, 2000);
        });
    } else {
        console.log('Form validation error');
    }
}
